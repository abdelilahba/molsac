import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Aucun fichier reçu." },
        { status: 400 }
      );
    }

    // Validate mime type
    const mimeType = file.type || "image/jpeg";
    if (!mimeType.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Le fichier doit être une image (JPG, PNG, WEBP, etc.)." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Try saving to filesystem (works locally or in persistent environments)
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });

      const ext = path.extname(file.name) || ".jpg";
      const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "");
      const uniqueName = `molsac_${Date.now()}_${baseName || "photo"}${ext}`;
      const filePath = path.join(uploadsDir, uniqueName);

      await writeFile(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${uniqueName}`,
        message: "Photo téléchargée avec succès !",
      });
    } catch (fsError) {
      console.warn("Filesystem upload failed (e.g. Vercel read-only), using base64 data URL fallback:", fsError);

      // Robust fallback for Vercel serverless: Data URI
      const base64Data = buffer.toString("base64");
      const dataUri = `data:${mimeType};base64,${base64Data}`;

      return NextResponse.json({
        success: true,
        url: dataUri,
        message: "Photo enregistrée avec succès !",
      });
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors du téléchargement de l'image." },
      { status: 500 }
    );
  }
}
