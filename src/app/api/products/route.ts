import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken, TokenPayload } from "@/lib/auth";

// GET /api/products
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const where: any = {};

    if (category && category !== "ALL") {
      where.category = category.toUpperCase();
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (search && search.trim() !== "") {
      const q = search.trim();
      where.OR = [
        { name: { contains: q } },
        { nameAr: { contains: q } },
        { description: { contains: q } },
        { descriptionAr: { contains: q } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({
      success: true,
      data: products,
      total: products.length,
    });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des produits." },
      { status: 500 }
    );
  }
}

// POST /api/products (Protected)
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("molsac_token")?.value;
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    const activeToken = token || authHeader;

    if (!activeToken || !verifyToken<TokenPayload>(activeToken)) {
      return NextResponse.json(
        { success: false, error: "Action non autorisée. Veuillez vous connecter." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      name,
      nameAr,
      description,
      descriptionAr,
      price,
      category,
      images,
      inStock = true,
      featured = false,
    } = body;

    if (!name || price === undefined || !category) {
      return NextResponse.json(
        { success: false, error: "Le nom, la catégorie et le prix sont obligatoires." },
        { status: 400 }
      );
    }

    // Ensure images are formatted as stringified JSON array
    let imagesString = "[]";
    if (typeof images === "string") {
      imagesString = images.startsWith("[") ? images : JSON.stringify([images]);
    } else if (Array.isArray(images)) {
      imagesString = JSON.stringify(images);
    }

    const newProduct = await prisma.product.create({
      data: {
        name: String(name).trim(),
        nameAr: nameAr ? String(nameAr).trim() : String(name).trim(),
        description: description ? String(description).trim() : "",
        descriptionAr: descriptionAr ? String(descriptionAr).trim() : (description ? String(description).trim() : ""),
        price: parseFloat(String(price)),
        category: String(category).toUpperCase(),
        images: imagesString,
        inStock: Boolean(inStock),
        featured: Boolean(featured),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Produit ajouté avec succès.",
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Erreur lors de la création du produit." },
      { status: 500 }
    );
  }
}

