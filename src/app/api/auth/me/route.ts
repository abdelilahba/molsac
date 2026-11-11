import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken, TokenPayload } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("molsac_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Non authentifié." },
        { status: 401 }
      );
    }

    const decoded = verifyToken<TokenPayload>(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { success: false, error: "Session invalide ou expirée." },
        { status: 401 }
      );
    }

    let admin: { id: number; username: string; createdAt: Date } | null = null;
    try {
      admin = await prisma.admin.findUnique({
        where: { id: decoded.id },
        select: { id: true, username: true, createdAt: true },
      });
    } catch (err) {
      console.warn("DB findUnique failed, using token payload fallback:", err);
    }

    if (!admin && decoded.username === "admin") {
      admin = {
        id: decoded.id || 1,
        username: "admin",
        createdAt: new Date(),
      };
    }

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Compte introuvable." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      admin,
    });
  } catch (error: any) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur d'authentification." },
      { status: 500 }
    );
  }
}
