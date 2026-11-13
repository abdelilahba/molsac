"use client";

import Image from "next/image";
import { X, MessageCircle, ShoppingBag, Sparkles, Check, MapPin, Truck, ShieldCheck, Heart } from "lucide-react";
import { Product } from "@/types";
import { Language, translations } from "@/lib/translations";
import { getProductImage } from "@/lib/images";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  onReserve: (product: Product) => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  lang,
  onClose,
  onReserve,
}: QuickViewModalProps) {
  if (!isOpen || !product) return null;

  const t = translations[lang];
  const imageUrl = getProductImage(product.images);
  const displayName = lang === "ar" && product.nameAr ? product.nameAr : product.name;
  const secondaryName = lang === "ar" ? product.name : product.nameAr;
  const description = lang === "ar" && product.descriptionAr ? product.descriptionAr : product.description;

  const waTextFr = `Salam, je souhaite acheter cet article vu sur le site Mol Sac :\n• Modèle : ${product.name}\n• Prix : ${product.price} DH\nEst-il disponible pour retrait ou livraison ?`;
  const waTextAr = `السلام عليكم، أرغب في شراء هذا المنتج من موقع مول الصاك:\n• الموديل : ${product.nameAr || product.name}\n• الثمن : ${product.price} درهم\nهل هو متوفر للاستلام أو التوصيل ؟`;
  const waUrl = `https://wa.me/212712128124?text=${encodeURIComponent(lang === "ar" ? waTextAr : waTextFr)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#140f0c] border border-[#d4af37]/35 rounded-[32px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] my-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-[#f6f3ee] hover:text-[#d4af37] border border-white/10 flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Column */}
          <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[460px] bg-[#0d0a08] overflow-hidden flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={displayName}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c]/60 via-transparent to-transparent md:hidden pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-4 start-4 flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0d0a08]/85 text-[#d4af37] border border-[#d4af37]/40 backdrop-blur-md">
                {product.category}
              </span>
              {product.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gold-metallic text-[#0d0a08] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  <Sparkles className="w-3 h-3 fill-[#0d0a08]" />
                  <span>{lang === "fr" ? "Édition Limitée" : "موديل حصري"}</span>
                </span>
              )}
            </div>

            {/* In stock status pill */}
            <div className="absolute bottom-4 start-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{lang === "fr" ? "Disponible au Magasin (Kissaria N°6)" : "متوفر في قيسارية الحمامة"}</span>
              </span>
            </div>
          </div>

          {/* Product Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-[#c5a880] uppercase tracking-[0.2em] font-semibold block mb-1">
                  Maison Mol Sac Tétouan
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#fbf8f3] leading-tight">
                  {displayName}
                </h3>
                {secondaryName && (
                  <p className="text-sm text-[#d4af37] font-arabic-luxury mt-1">
                    {secondaryName}
                  </p>
                )}
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline gap-2 pt-1 pb-3 border-b border-[#d4af37]/15">
                <span className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-gold-gradient">
                  {product.price}
                </span>
                <span className="text-base font-bold text-[#d4af37]">DH</span>
                <span className="text-xs text-[#e8e0d5]/60 ml-2">
                  {lang === "fr" ? "(Prix garanti boutique)" : "(سعر المحل المباشر)"}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#e8e0d5]/85 leading-relaxed font-light">
                {description || (lang === "fr" ? "Pièce d'exception sélectionnée pour son élégance intemporelle et ses finitions soignées." : "قطعة راقية تم اختيارها بعناية لتضفي لمسة من الفخامة والجمال على إطلالتك.")}
              </p>

              {/* Trust highlights */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <Truck className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <span className="text-[11px] text-[#e8e0d5]/80">
                    {lang === "fr" ? "Livraison Maroc 24/48h" : "توصيل لكافة المدن"}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <span className="text-[11px] text-[#e8e0d5]/80">
                    {lang === "fr" ? "Retrait Tétouan Kissaria 6" : "استلام فوري بتطوان"}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-[#d4af37]/15">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t.orderWhatsApp}</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onReserve(product);
                }}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#1c1612] hover:bg-[#28201a] text-[#f6f3ee] hover:text-[#d4af37] border border-[#d4af37]/35 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                <span>{t.reserveOnline}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

