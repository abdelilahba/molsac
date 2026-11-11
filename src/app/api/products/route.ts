import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken, TokenPayload } from "@/lib/auth";
import { DEFAULT_PRODUCTS } from "@/data/defaultProducts";

// In-memory fallback list to retain runtime created/updated products if DB write fails
const inMemoryProducts: any[] = [...DEFAULT_PRODUCTS];

// GET /api/products
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    let products: any[] = [];
    let dbSuccess = false;

    try {
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

      products = await prisma.product.findMany({
        where,
        orderBy: [
          { featured: "desc" },
          { createdAt: "desc" },
        ],
      });
      dbSuccess = true;
    } catch (dbError) {
      console.warn("Prisma products fetch failed, using fallback catalogue:", dbError);
    }

    // If database returned empty or failed, use in-memory/static fallback
    if (!dbSuccess || products.length === 0) {
      let filtered = [...inMemoryProducts];

      if (category && category !== "ALL") {
        filtered = filtered.filter((p) => p.category === category.toUpperCase());
      }
      if (featured === "true") {
        filtered = filtered.filter((p) => p.featured === true);
      }
      if (search && search.trim() !== "") {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(
          (p) =>
            (p.name && p.name.toLowerCase().includes(q)) ||
            (p.nameAr && p.nameAr.includes(q)) ||
            (p.description && p.description.toLowerCase().includes(q)) ||
            (p.descriptionAr && p.descriptionAr.includes(q))
        );
      }
      products = filtered;
    }

    return NextResponse.json({
      success: true,
      data: products,
      total: products.length,
    });
  } catch (error: any) {
    console.error("Critical error fetching products, serving default products:", error);
    return NextResponse.json({
      success: true,
      data: DEFAULT_PRODUCTS,
      total: DEFAULT_PRODUCTS.length,
    });
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

    const productPayload = {
      name: String(name).trim(),
      nameAr: nameAr ? String(nameAr).trim() : String(name).trim(),
      description: description ? String(description).trim() : "",
      descriptionAr: descriptionAr ? String(descriptionAr).trim() : (description ? String(description).trim() : ""),
      price: parseFloat(String(price)),
      category: String(category).toUpperCase(),
      images: imagesString,
      inStock: Boolean(inStock),
      featured: Boolean(featured),
    };

    let newProduct: any = null;

    try {
      newProduct = await prisma.product.create({
        data: productPayload,
      });
    } catch (dbError) {
      console.warn("DB creation failed, storing in memory fallback:", dbError);
      newProduct = {
        id: Date.now(),
        ...productPayload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    // Keep in memory fallback
    inMemoryProducts.unshift(newProduct);

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
