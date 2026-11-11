import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken, TokenPayload } from "@/lib/auth";

// GET /api/orders (Protected)
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("molsac_token")?.value;
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    const activeToken = token || authHeader;

    if (!activeToken || !verifyToken<TokenPayload>(activeToken)) {
      return NextResponse.json(
        { success: false, error: "Non autorisé. Veuillez vous connecter." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: orders,
      total: orders.length,
    });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des commandes." },
      { status: 500 }
    );
  }
}

// POST /api/orders (Public: used by customer from OrderModal)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerPhone, productId, quantity = 1, notes } = body;

    if (!customerName || !customerPhone || !productId) {
      return NextResponse.json(
        { success: false, error: "Nom, téléphone et produit requis." },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: parseInt(String(productId), 10) },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Produit sélectionné introuvable." },
        { status: 404 }
      );
    }

    const newOrder = await prisma.order.create({
      data: {
        customerName: String(customerName).trim(),
        customerPhone: String(customerPhone).trim(),
        productId: product.id,
        quantity: parseInt(String(quantity), 10) || 1,
        status: "PENDING",
        notes: notes ? String(notes).trim() : null,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Commande enregistrée avec succès !",
        data: newOrder,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Impossible d'enregistrer la commande." },
      { status: 500 }
    );
  }
}

