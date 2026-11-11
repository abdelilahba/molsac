import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken, TokenPayload } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/products/[id]
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: "ID de produit invalide." }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ success: false, error: "Produit introuvable." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Erreur serveur." }, { status: 500 });
  }
}

// PUT /api/products/[id] (Protected)
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const token = req.cookies.get("molsac_token")?.value;
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    const activeToken = token || authHeader;

    if (!activeToken || !verifyToken<TokenPayload>(activeToken)) {
      return NextResponse.json({ success: false, error: "Non autorisé." }, { status: 401 });
    }

    const { id } = await params;
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: "ID invalide." }, { status: 400 });
    }

    const body = await req.json();
    const updateData: any = {};

    if (body.name !== undefined) updateData.name = String(body.name).trim();
    if (body.nameAr !== undefined) updateData.nameAr = String(body.nameAr).trim();
    if (body.description !== undefined) updateData.description = String(body.description).trim();
    if (body.descriptionAr !== undefined) updateData.descriptionAr = String(body.descriptionAr).trim();
    if (body.price !== undefined) updateData.price = parseFloat(String(body.price));
    if (body.category !== undefined) updateData.category = String(body.category).toUpperCase();
    if (body.inStock !== undefined) updateData.inStock = Boolean(body.inStock);
    if (body.featured !== undefined) updateData.featured = Boolean(body.featured);

    if (body.images !== undefined) {
      if (typeof body.images === "string") {
        updateData.images = body.images.startsWith("[") ? body.images : JSON.stringify([body.images]);
      } else if (Array.isArray(body.images)) {
        updateData.images = JSON.stringify(body.images);
      }
    }

    const updated = await prisma.product.update({
      where: { id: productId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Produit mis à jour.",
      data: updated,
    });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json({ success: false, error: "Erreur lors de la modification." }, { status: 500 });
  }
}

// DELETE /api/products/[id] (Protected)
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const token = req.cookies.get("molsac_token")?.value;
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    const activeToken = token || authHeader;

    if (!activeToken || !verifyToken<TokenPayload>(activeToken)) {
      return NextResponse.json({ success: false, error: "Non autorisé." }, { status: 401 });
    }

    const { id } = await params;
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: "ID invalide." }, { status: 400 });
    }

    // Delete associated orders first or rely on cascade
    await prisma.order.deleteMany({
      where: { productId },
    });

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({
      success: true,
      message: "Produit supprimé avec succès.",
    });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ success: false, error: "Erreur lors de la suppression." }, { status: 500 });
  }
}

