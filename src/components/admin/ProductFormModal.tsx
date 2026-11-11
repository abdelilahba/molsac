"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Camera, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Product, ProductCategory } from "@/types";
import { getProductImage } from "@/lib/images";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  onSaved: () => void;
}

export default function ProductFormModal({
  isOpen,
  onClose,
  productToEdit,
  onSaved,
}: ProductFormModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    }
    setErrorMsg("");
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  // Handle direct iPhone camera / photo file upload to /api/upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMsg("Veuillez indiquer un prix valide en DH.");
      return;
    }

    if (!name.trim()) {
      setErrorMsg("Le nom du produit en français est obligatoire.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        nameAr: nameAr.trim() || name.trim(),
        category,
        price: parsedPrice,
        description: description.trim() || "",
        descriptionAr: descriptionAr.trim() || "",
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
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Erreur lors de l'enregistrement");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#17120e] border-t sm:border border-[#d4af37]/40 rounded-t-[32px] sm:rounded-[32px] shadow-[0_0_50px_rgba(212,175,55,0.25)] overflow-hidden text-[#f6f3ee] max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#120e0b] text-[#f6f3ee] p-5 sm:p-6 flex items-center justify-between border-b border-[#d4af37]/25">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-bold text-lg font-serif-luxury text-[#fbf8f3] tracking-wide">
              {isEditing ? "Modifier l'article" : "Ajouter un nouvel article"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#c5a880] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Form */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Photo Upload Area - iPhone camera ready */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-2">
                Photo du produit 📸 (Appareil photo iPhone ou Galerie)
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="flex items-center gap-4">
                {/* Image Preview Box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-28 h-28 rounded-2xl border-2 border-dashed border-[#d4af37]/50 bg-[#0d0a08] overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-[#d4af37] transition-all group"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover group-hover:opacity-75 transition-opacity"
                    />
                  ) : (
                    <div className="text-center p-2">
                      <Camera className="w-8 h-8 text-[#d4af37] mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] text-[#c5a880] font-bold block">
                        Prendre photo
                      </span>
                    </div>
                  )}

                  {isUploading && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-[#d4af37]" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-[#d4af37]/35 text-xs font-bold text-[#d4af37] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{isUploading ? "Téléchargement..." : "Ouvrir l'appareil photo"}</span>
                  </button>

                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Ou coller l'URL de l'image..."
                    className="w-full px-3 py-2 bg-[#0d0a08] rounded-xl border border-[#d4af37]/25 text-xs text-[#f6f3ee] placeholder-[#e8e0d5]/30 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            </div>

            {/* Product Name (FR & AR) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1.5">
                  Nom en français <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Sac Cuir Chic Tétouan"
                  className="w-full px-4 py-3 bg-[#0d0a08] rounded-2xl border border-[#d4af37]/30 text-sm text-[#f6f3ee] placeholder-[#e8e0d5]/30 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1.5" dir="rtl">
                  الاسم بالعربية
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  placeholder="مثال: حقيبة جلدية فاخرة"
                  className="w-full px-4 py-3 bg-[#0d0a08] rounded-2xl border border-[#d4af37]/30 text-sm text-[#f6f3ee] placeholder-[#e8e0d5]/30 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1.5">
                  Catégorie <span className="text-rose-400">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full px-4 py-3 bg-[#0d0a08] rounded-2xl border border-[#d4af37]/30 text-xs sm:text-sm font-bold text-[#f6f3ee] focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="SAC">👜 Sacs</option>
                  <option value="CHAUSSURE">👠 Chaussures</option>
                  <option value="ACCESSOIRE">💍 Accessoires</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1.5">
                  Prix (DH) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="250"
                  className="w-full px-4 py-3 bg-[#0d0a08] rounded-2xl border border-[#d4af37]/30 text-sm text-[#f6f3ee] font-serif-luxury font-bold placeholder-[#e8e0d5]/30 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1.5">
                Description (facultatif)
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Détails du sac, matière, fermoirs, taille..."
                className="w-full px-4 py-3 bg-[#0d0a08] rounded-2xl border border-[#d4af37]/30 text-xs text-[#f6f3ee] placeholder-[#e8e0d5]/30 focus:outline-none focus:border-[#d4af37] resize-none"
              />
            </div>

            {/* Toggles */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0d0a08] border border-[#d4af37]/25">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#f6f3ee]">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 accent-[#d4af37]"
                />
                <span>Article en stock</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#d4af37]">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-[#d4af37]"
                />
                <span>Mettre en avant ✨</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="w-full py-4 px-6 rounded-full bg-gold-metallic text-[#0d0a08] font-bold text-xs uppercase tracking-wider shadow-[0_5px_25px_rgba(212,175,55,0.3)] hover:opacity-95 transition-all cursor-pointer disabled:opacity-40"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Enregistrement en cours...</span>
                  </span>
                ) : (
                  <span>{isEditing ? "Enregistrer les modifications" : "Publier l'article sur la boutique"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
