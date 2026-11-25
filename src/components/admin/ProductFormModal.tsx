"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Camera, Loader2, Sparkles, AlertCircle, Zap, CheckCircle2, Plus } from "lucide-react";
import { Product, ProductCategory } from "@/types";
import { getProductImage } from "@/lib/images";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  onSaved: () => void;
}

const QUICK_PRESETS: Record<ProductCategory, Array<{ fr: string; ar: string }>> = {
  SAC: [
    { fr: "Sac à Main Cuir Chic", ar: "حقيبة يد جلدية فاخرة" },
    { fr: "Cabas Élégance", ar: "حقيبة كاباس عصرية" },
    { fr: "Sac Bandoulière Luxe", ar: "حقيبة كتف راقية" },
    { fr: "Pochette de Soirée", ar: "حقيبة سهرات ومناسبات" },
    { fr: "Mini Sac Tendance", ar: "حقيبة يد صغيرة أنيقة" },
    { fr: "Sac Matelassé Chaîne Or", ar: "حقيبة مبطنة بسلسلة ذهبية" },
  ],
  CHAUSSURE: [
    { fr: "Escarpins Soirée Stiletto", ar: "حذاء كعب عالي سهرة" },
    { fr: "Sandales à Talons Bloc", ar: "صندل صيفي أنيق بكعب" },
    { fr: "Sneakers Mode Chic", ar: "حذاء سنيكرز عصري" },
    { fr: "Mules Cuir Élégantes", ar: "حذاء مفتوح راقي" },
    { fr: "Souliers Vernis Noirs", ar: "حذاء رسمي أسود لامع" },
  ],
  ACCESSOIRE: [
    { fr: "Parure Collier & Boucles", ar: "طقم عقد وأقراط راقي" },
    { fr: "Portefeuille Cuir", ar: "محفظة جلدية فاخرة" },
    { fr: "Ceinture Cuir Boucle Or", ar: "حزام جلدي بإبزيم ذهبي" },
    { fr: "Bracelet Gourmette Or", ar: "سوار ذهبي راقي" },
  ],
};

const QUICK_PRICES = ["180", "220", "250", "280", "320", "380", "450", "550"];

export default function ProductFormModal({
  isOpen,
  onClose,
  productToEdit,
  onSaved,
}: ProductFormModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Mode: "express" for lightning 5-sec add, "detailed" for full edit
  const [formMode, setFormMode] = useState<"express" | "detailed">("express");

  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [category, setCategory] = useState<ProductCategory>("SAC");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successToast, setSuccessToast] = useState("");

  const isEditing = Boolean(productToEdit);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || "");
      setNameAr(productToEdit.nameAr || "");
      setCategory((productToEdit.category as ProductCategory) || "SAC");
      setPrice(String(productToEdit.price || ""));
      setDescription(productToEdit.description || "");
      setDescriptionAr(productToEdit.descriptionAr || "");
      setImageUrl(getProductImage(productToEdit.images));
      setInStock(productToEdit.inStock ?? true);
      setFeatured(productToEdit.featured ?? false);
      setFormMode("detailed");
    } else {
      setName("");
      setNameAr("");
      setCategory("SAC");
      setPrice("");
      setDescription("");
      setDescriptionAr("");
      setImageUrl("");
      setInStock(true);
      setFeatured(false);
      setFormMode("express");
    }
    setErrorMsg("");
    setSuccessToast("");
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  // Handle direct iPhone camera / photo file upload to /api/upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg("");
    setSuccessToast("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur de téléchargement");
      }

      setImageUrl(data.url);
    } catch (err: any) {
      setErrorMsg(err.message || "Impossible de télécharger la photo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleApplyPreset = (preset: { fr: string; ar: string }) => {
    setName(preset.fr);
    setNameAr(preset.ar);
  };

  const handleSaveProduct = async (keepOpenForNext: boolean = false) => {
    setErrorMsg("");
    setSuccessToast("");

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMsg("Veuillez indiquer un prix valide (ex: 280 DH).");
      return;
    }

    if (!imageUrl && !isEditing) {
      setErrorMsg("Veuillez prendre ou sélectionner la photo du produit.");
      return;
    }

    // Auto-generate name if empty in express mode
    const finalName = name.trim() || (category === "SAC" ? "Sac de Luxe Mol Sac" : category === "CHAUSSURE" ? "Soulier Élégant Mol Sac" : "Accessoire de Prestige");
    const finalNameAr = nameAr.trim() || (category === "SAC" ? "حقيبة فاخرة مول الصاك" : category === "CHAUSSURE" ? "حذاء أنيق مول الصاك" : "إكسسوار راقي مول الصاك");

    setIsSubmitting(true);
    try {
      const payload = {
        name: finalName,
        nameAr: finalNameAr,
        category,
        price: parsedPrice,
        description: description.trim() || (category === "SAC" ? "Sac de luxe disponible à Kissaria Al Hamama, Tétouan. Finition soignée." : ""),
        descriptionAr: descriptionAr.trim() || (category === "SAC" ? "حقيبة راقية متوفرة في قيسارية الحمامة، تطوان." : ""),
        images: imageUrl ? [imageUrl] : ["/images/logo.png"],
        inStock,
        featured,
      };

      const url = isEditing ? `/api/products/${productToEdit?.id}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Impossible d'enregistrer le produit");
      }

      onSaved();

      if (keepOpenForNext) {
        setSuccessToast(`✅ Article "${finalName}" publié avec succès !`);
        // Reset for next rapid entry
        setImageUrl("");
        setPrice("");
        setName("");
        setNameAr("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Erreur lors de l'enregistrement");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#17120e] border-t sm:border border-[#d4af37]/40 rounded-t-[32px] sm:rounded-[32px] shadow-[0_0_50px_rgba(212,175,55,0.25)] overflow-hidden text-[#f6f3ee] max-h-[94vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#120e0b] text-[#f6f3ee] px-5 py-4 flex items-center justify-between border-b border-[#d4af37]/25">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-bold text-base sm:text-lg font-serif-luxury text-[#fbf8f3] tracking-wide">
              {isEditing ? "Modifier l'article" : "Ajouter un article"}
            </h3>
          </div>

          {/* Mode Switcher Tabs */}
          {!isEditing && (
            <div className="flex items-center gap-1 bg-[#1c1510] p-1 rounded-full border border-[#d4af37]/30">
              <button
                type="button"
                onClick={() => setFormMode("express")}
                className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  formMode === "express"
                    ? "bg-gold-metallic text-[#0d0a08] shadow-sm"
                    : "text-[#c5a880] hover:text-white"
                }`}
              >
                <Zap className="w-3 h-3 fill-current" />
                <span>Express ⚡</span>
              </button>
              <button
                type="button"
                onClick={() => setFormMode("detailed")}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  formMode === "detailed"
                    ? "bg-gold-metallic text-[#0d0a08] shadow-sm"
                    : "text-[#c5a880] hover:text-white"
                }`}
              >
                <span>Détaillé</span>
              </button>
            </div>
          )}

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#c5a880] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Form */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* Notification Messages */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successToast && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-semibold">{successToast}</span>
            </div>
          )}

          {/* Hidden File Input for iPhone camera & Gallery */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* STEP 1: PHOTO CAPTURE (GÉANTE & ULTRA RAPIDE) */}
          <div className="bg-[#120e0b] p-3.5 rounded-2xl border border-[#d4af37]/25">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                <Camera className="w-4 h-4" />
                <span>1. Photo du produit <span className="text-rose-400">*</span></span>
              </label>
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] text-[#e8b25c] hover:underline font-bold"
                >
                  Reprendre la photo
                </button>
              )}
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative w-full h-44 sm:h-52 rounded-2xl border-2 border-dashed border-[#d4af37]/45 bg-[#0a0705] overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-[#d4af37] transition-all group"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  className="object-contain p-2 group-hover:opacity-85 transition-opacity"
                />
              ) : (
                <div className="text-center p-4">
                  <div className="w-14 h-14 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <Camera className="w-7 h-7 text-[#d4af37]" />
                  </div>
                  <span className="text-sm font-bold text-[#fbf8f3] block">
                    Prendre la photo avec l&apos;iPhone
                  </span>
                  <span className="text-[11px] text-[#c5a880]/80 block mt-0.5">
                    ou choisir depuis la galerie
                  </span>
                </div>
              )}

              {isUploading && (
                <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-8 h-8 animate-spin text-[#d4af37]" />
                  <span className="text-xs font-bold text-[#d4af37]">Téléchargement & compression WebP...</span>
                </div>
              )}
            </div>
          </div>

          {/* STEP 2: CATEGORY SELECTOR (3 GROS BOUTONS TACTILES) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2">
              2. Catégorie
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: "SAC", label: "👜 Sacs", ar: "حقائب" },
                  { id: "CHAUSSURE", label: "👠 Chaussures", ar: "أحذية" },
                  { id: "ACCESSOIRE", label: "💍 Bijoux", ar: "إكسسوار" },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`py-2.5 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                    category === cat.id
                      ? "bg-gold-metallic text-[#0d0a08] font-bold border-[#d4af37] shadow-md scale-[1.02]"
                      : "bg-[#120e0b] border-[#d4af37]/25 text-[#f6f3ee] hover:bg-white/5"
                  }`}
                >
                  <span className="block text-xs sm:text-sm font-bold">{cat.label}</span>
                  <span className="block text-[10px] opacity-80">{cat.ar}</span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: PRICE WITH RAPID BUTTONS */}
          <div className="bg-[#120e0b] p-3.5 rounded-2xl border border-[#d4af37]/25">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1.5">
              3. Prix (DH) <span className="text-rose-400">*</span>
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="number"
                step="any"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: 280"
                className="flex-1 px-4 py-3 bg-[#0a0705] rounded-xl border border-[#d4af37]/35 text-xl font-bold font-serif-luxury text-gold-gradient placeholder-[#e8e0d5]/30 focus:outline-none focus:border-[#d4af37]"
              />
              <span className="text-sm font-bold text-[#d4af37] px-3 py-2 bg-[#1c1510] rounded-xl border border-[#d4af37]/30">
                DH
              </span>
            </div>

            {/* Quick Price Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {QUICK_PRICES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPrice(p)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    price === p
                      ? "bg-gold-metallic text-[#0d0a08] shadow-sm"
                      : "bg-[#1c1510] text-[#c5a880] border border-[#d4af37]/20 hover:border-[#d4af37]/60"
                  }`}
                >
                  {p} DH
                </button>
              ))}
            </div>
          </div>

          {/* STEP 4: QUICK MODEL PRESETS */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1.5">
              4. Modèle (Choisir ou personnaliser)
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {QUICK_PRESETS[category].map((preset) => (
                <button
                  key={preset.fr}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                    name === preset.fr
                      ? "bg-[#d4af37] text-black font-bold"
                      : "bg-[#16110d] text-[#c5a880] border border-[#d4af37]/25 hover:border-[#d4af37]"
                  }`}
                >
                  {preset.fr}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom du sac (ex: Sac Cuir Chic)"
                className="w-full px-3.5 py-2.5 bg-[#0d0a08] rounded-xl border border-[#d4af37]/30 text-xs text-[#f6f3ee] placeholder-[#e8e0d5]/30 focus:outline-none focus:border-[#d4af37]"
              />
              <input
                type="text"
                dir="rtl"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="الاسم بالعربية (اختياري)"
                className="w-full px-3.5 py-2.5 bg-[#0d0a08] rounded-xl border border-[#d4af37]/30 text-xs text-[#f6f3ee] placeholder-[#e8e0d5]/30 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          {/* DETAILED MODE FIELDS (Shown only when detailed mode active) */}
          {formMode === "detailed" && (
            <div className="space-y-3 pt-2 border-t border-[#d4af37]/15">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1">
                  Description détaillée
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Détails du sac, matière cuir, bandoulière, taille..."
                  className="w-full px-3.5 py-2 bg-[#0d0a08] rounded-xl border border-[#d4af37]/30 text-xs text-[#f6f3ee] placeholder-[#e8e0d5]/30 focus:outline-none focus:border-[#d4af37] resize-none"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0d0a08] border border-[#d4af37]/25">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#f6f3ee]">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="w-4 h-4 accent-[#d4af37]"
                  />
                  <span>En stock boutique</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#d4af37]">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 accent-[#d4af37]"
                  />
                  <span>⭐ Coup de cœur</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Bar (Fixed at bottom for easy thumb-tap on mobile) */}
        <div className="bg-[#120e0b] p-3.5 sm:p-4 border-t border-[#d4af37]/25 flex flex-col sm:flex-row gap-2">
          {!isEditing && (
            <button
              type="button"
              disabled={isSubmitting || isUploading}
              onClick={() => handleSaveProduct(true)}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-40"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Enregistrer & Suivant ⚡</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            disabled={isSubmitting || isUploading}
            onClick={() => handleSaveProduct(false)}
            className="flex-1 py-3 px-4 rounded-xl bg-gold-metallic text-[#0d0a08] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:opacity-95 transition-all cursor-pointer active:scale-95 disabled:opacity-40"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>{isEditing ? "Enregistrer les modifications" : "Publier & Fermer"}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
