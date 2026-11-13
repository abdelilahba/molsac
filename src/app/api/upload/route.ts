import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "c0tbmpml",
  api_key: process.env.CLOUDINARY_API_KEY || "847881296782246",
  api_secret: process.env.CLOUDINARY_API_SECRET || "7P0tj1mrmN4qWbD_Jkb9UhIpNj4",
  secure: true,
});

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
    const base64Data = buffer.toString("base64");
    const fileUri = `data:${mimeType};base64,${base64Data}`;

    // 1. Primary: Upload to Cloudinary with automatic WebP compression & CDN distribution
    try {
      const uploadResult = await cloudinary.uploader.upload(fileUri, {
        folder: "molsac_products",
        transformation: [
          { quality: "auto", fetch_format: "auto" },
        ],
      });

      if (uploadResult && uploadResult.secure_url) {
        return NextResponse.json({
          success: true,
          url: uploadResult.secure_url,
          message: "Photo téléchargée et optimisée sur Cloudinary avec succès !",
        });
      }
    } catch (cloudErr) {
      console.warn("Cloudinary upload failed, falling back to base64 data URI:", cloudErr);
    }

    // 2. Resilient Fallback: Base64 Data URI if network or cloud is temporarily unavailable
    return NextResponse.json({
      success: true,
      url: fileUri,
      message: "Photo enregistrée avec succès !",
    });
  } catch (error: any) {
    console.error("Upload critical error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors du téléchargement de l'image." },
      { status: 500 }
    );
  }
}
