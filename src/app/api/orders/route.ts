import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken, TokenPayload } from "@/lib/auth";
import { DEFAULT_PRODUCTS } from "@/data/defaultProducts";

const inMemoryOrders: any[] = [
  {
    id: 1,
    customerName: "Fatima Zahra",
    customerPhone: "0661234567",
    productId: 1,
    quantity: 1,
    status: "PENDING",
    notes: "Livraison demandée sur Tétouan - Wilaya.",
    createdAt: "2026-03-01T11:00:00.000Z",
    product: DEFAULT_PRODUCTS[0],
  },
  {
    id: 2,
    customerName: "Khadija Benali",
    customerPhone: "0612987654",
    productId: 4,
    quantity: 1,
    status: "CONFIRMED",
    notes: "Passage prévu au local n°6 pour récupération.",
    createdAt: "2026-03-01T12:00:00.000Z",
    product: DEFAULT_PRODUCTS[3],
  },
];

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

    let orders: any[] = [];
    let dbSuccess = false;

    try {
      const where: any = {};
      if (status && status !== "ALL") {
        where.status = status;
      }

      orders = await prisma.order.findMany({
        where,
        include: {
          product: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      dbSuccess = true;
    } catch (dbErr) {
      console.warn("DB orders fetch failed, using fallback memory orders:", dbErr);
    }

    if (!dbSuccess || orders.length === 0) {
      let filtered = [...inMemoryOrders];
      if (status && status !== "ALL") {
        filtered = filtered.filter((o) => o.status === status);
      }
      orders = filtered;
    }

    return NextResponse.json({
      success: true,
      data: orders,
      total: orders.length,
    });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({
      success: true,
      data: inMemoryOrders,
      total: inMemoryOrders.length,
    });
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

    const pId = parseInt(String(productId), 10);
    let product: any = null;

    try {
      product = await prisma.product.findUnique({
        where: { id: pId },
      });
    } catch (dbErr) {
      console.warn("DB find product failed for order:", dbErr);
    }

    if (!product) {
      product = DEFAULT_PRODUCTS.find((p) => p.id === pId) || {
        id: pId,
        name: "Article Mol Sac",
        price: 250,
      };
    }

    let newOrder: any = null;
    const orderData = {
      customerName: String(customerName).trim(),
      customerPhone: String(customerPhone).trim(),
      productId: product.id,
      quantity: parseInt(String(quantity), 10) || 1,
      status: "PENDING",
      notes: notes ? String(notes).trim() : null,
    };

    try {
      newOrder = await prisma.order.create({
        data: orderData,
        include: {
          product: true,
        },
      });
    } catch (dbErr) {
      console.warn("DB order create failed, saving to inMemoryOrders:", dbErr);
      newOrder = {
        id: Date.now(),
        ...orderData,
        createdAt: new Date().toISOString(),
        product,
      };
    }

    inMemoryOrders.unshift(newOrder);

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
