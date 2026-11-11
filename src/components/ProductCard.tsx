"use client";

import Image from "next/image";
import { MessageCircle, ShoppingBag, Sparkles, Check, AlertCircle, ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import { Language, translations } from "@/lib/translations";
import { getProductImage } from "@/lib/images";

interface ProductCardProps {
  product: Product;
  lang: Language;
  onReserve: (product: Product) => void;
}

export default function ProductCard({ product, lang, onReserve }: ProductCardProps) {
  const t = translations[lang];
  const imageUrl = getProductImage(product.images);

  const displayName = lang === "ar" && product.nameAr ? product.nameAr : product.name;
  const secondaryName = lang === "ar" ? product.name : product.nameAr;
  const description = lang === "ar" && product.descriptionAr ? product.descriptionAr : product.description;

  const categoryLabels: Record<string, { fr: string; ar: string; icon: string }> = {
    SAC: { fr: "Sac de Luxe", ar: "حقيبة راقية", icon: "👜" },
    CHAUSSURE: { fr: "Soulier & Escarpin", ar: "حذاء أنيق", icon: "👠" },
    ACCESSOIRE: { fr: "Haute Joaillerie", ar: "إكسسوار راقي", icon: "💍" },
  };

  const catMeta = categoryLabels[product.category] || {
    fr: product.category,
    ar: product.category,
    icon: "✨",
  };

  // Pre-filled WhatsApp Concierge Message
  const waTextFr = `Salam, je souhaite commander cet article chez Mol Sac Tétouan :\n• Modèle : ${product.name}\n• Prix : ${product.price} DH\nEst-il disponible en boutique (Kissaria Al Hamama) ou pour livraison ?`;
  const waTextAr = `السلام عليكم، أرغب في حجز هذا المنتج من محل مول الصاك بتطوان:\n• الموديل : ${product.nameAr || product.name}\n• الثمن : ${product.price} درهم\nهل هو متوفر حالياً في قيسارية الحمامة ؟`;
  const waUrl = `https://wa.me/212712128124?text=${encodeURIComponent(lang === "ar" ? waTextAr : waTextFr)}`;

  return (
    <div className="group relative bg-[#17120e] rounded-[28px] overflow-hidden border border-[#d4af37]/25 shadow-xl hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] hover:border-[#d4af37]/60 transition-all duration-500 flex flex-col justify-between transform hover:-translate-y-1.5">
      {/* Top Image Showcase Area */}
      <div className="relative aspect-[4/4] sm:aspect-[4/4] w-full overflow-hidden bg-[#0d0a08]">
        <Image
          src={imageUrl}
          alt={displayName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Subtle dark gradient overlay at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#17120e] via-transparent to-black/20 opacity-80 pointer-events-none" />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          {/* Category Tag */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#0d0a08]/85 text-[#d4af37] border border-[#d4af37]/40 backdrop-blur-md shadow-md">
            <span>{catMeta.icon}</span>
            <span>{lang === "ar" ? catMeta.ar : catMeta.fr}</span>
          </span>

          {/* Featured / Coup de cœur Badge */}
          {product.featured && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-gold-metallic text-[#0d0a08] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <Sparkles className="w-3 h-3 fill-[#0d0a08]" />
              <span>{lang === "fr" ? "Édition Limitée" : "حصري"}</span>
            </span>
          )}
        </div>

        {/* Boutique Availability Pill */}
        <div className="absolute bottom-3 left-3">
          {product.inStock ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.inStock}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-rose-950/80 text-rose-300 border border-rose-500/40 backdrop-blur-md">
              <AlertCircle className="w-3 h-3" />
              <span>{t.outOfStock}</span>
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Main Title */}
          <h3 className="font-serif-luxury font-bold text-base sm:text-lg text-[#fbf8f3] group-hover:text-[#d4af37] transition-colors duration-300 line-clamp-1">
            {displayName}
          </h3>

          {/* Bilingual Subtitle */}
          {secondaryName && (
            <p className="text-xs text-[#c5a880]/70 font-arabic-luxury line-clamp-1 mt-1">
              {secondaryName}
            </p>
          )}

          {/* Description */}
          {description && (
            <p className="text-xs text-[#e8e0d5]/70 line-clamp-2 mt-2.5 leading-relaxed font-light">
              {description}
            </p>
          )}
        </div>

        {/* Pricing & CTA Section */}
        <div className="mt-5 pt-4 border-t border-[#d4af37]/20 space-y-3.5">
          {/* Price Bar */}
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880]/70 font-semibold">
              {lang === "fr" ? "Prix Boutique Tétouan" : "الثمن بالمحل"}
            </span>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-gold-gradient">
                {product.price}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#d4af37] ml-1.5">
                {t.dh}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {/* WhatsApp Direct Order */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_4px_15px_rgba(16,185,129,0.25)] transition-all cursor-pointer active:scale-95"
              title="Commander sur WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white flex-shrink-0" />
              <span className="truncate">WhatsApp</span>
            </a>

            {/* Online Reservation Modal trigger */}
            <button
              onClick={() => onReserve(product)}
              disabled={!product.inStock}
              className="flex items-center justify-center gap-2 px-3 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gold-metallic hover:opacity-95 text-[#0d0a08] shadow-[0_4px_15px_rgba(212,175,55,0.2)] transition-all cursor-pointer active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
              title="Réserver l'article en ligne"
            >
              <ShoppingBag className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{lang === "fr" ? "Réserver" : "حجز بالمحل"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
