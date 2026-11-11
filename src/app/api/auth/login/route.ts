import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { comparePassword, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Identifiant et mot de passe requis." },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { username: username.trim() },
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Identifiants invalides." },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Identifiants invalides." },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: admin.id,
      username: admin.username,
    });

    const response = NextResponse.json({
      success: true,
      message: "Connexion réussie.",
      admin: {
        id: admin.id,
        username: admin.username,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set("molsac_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de la connexion." },
      { status: 500 }
    );
  }
}

