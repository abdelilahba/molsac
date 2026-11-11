import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken, TokenPayload } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PATCH /api/orders/[id] (Protected)
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const token = req.cookies.get("molsac_token")?.value;
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    const activeToken = token || authHeader;

    if (!activeToken || !verifyToken<TokenPayload>(activeToken)) {
      return NextResponse.json({ success: false, error: "Non autorisé." }, { status: 401 });
    }

    const { id } = await params;
    const orderId = parseInt(id, 10);
    if (isNaN(orderId)) {
      return NextResponse.json({ success: false, error: "ID invalide." }, { status: 400 });
    }

    const body = await req.json();
    const updateData: any = {};

    if (body.status !== undefined) {
      updateData.status = String(body.status).toUpperCase();
    }
    if (body.notes !== undefined) {
      updateData.notes = String(body.notes);
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: { product: true },
    });

    return NextResponse.json({
      success: true,
      message: "Commande mise à jour.",
      data: updated,
    });
  } catch (error: any) {
    console.error("Error updating order:", error);
    return NextResponse.json({ success: false, error: "Erreur lors de la mise à jour." }, { status: 500 });
  }
}

// DELETE /api/orders/[id] (Protected)
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const token = req.cookies.get("molsac_token")?.value;
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    const activeToken = token || authHeader;

    if (!activeToken || !verifyToken<TokenPayload>(activeToken)) {
      return NextResponse.json({ success: false, error: "Non autorisé." }, { status: 401 });
    }

    const { id } = await params;
    const orderId = parseInt(id, 10);
    if (isNaN(orderId)) {
      return NextResponse.json({ success: false, error: "ID invalide." }, { status: 400 });
    }

    await prisma.order.delete({
      where: { id: orderId },
    });

    return NextResponse.json({
      success: true,
      message: "Commande supprimée.",
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Erreur lors de la suppression." }, { status: 500 });
  }
}

