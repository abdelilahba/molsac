"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, MapPin, ShoppingBag, PhoneCall, Award, ShieldCheck, Truck, ChevronRight, MessageCircle, Clock, Check } from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface HeroProps {
  lang: Language;
}

const HERO_SPOTLIGHTS = [
  {
    id: "sp1",
    nameFr: "Sac Bandoulière Matelassé Noir",
    nameAr: "حقيبة سوداء ملكية مطرزة",
    categoryFr: "Maroquinerie d'Exception",
    categoryAr: "حقائب راقية",
    price: "420",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
    tagFr: "Coup de Cœur 2026",
    tagAr: "الأكثر طلباً 2026",
    waFr: "Salam, je souhaite réserver le Sac Bandoulière Matelassé Noir (420 DH) vu en une du site Mol Sac.",
    waAr: "السلام عليكم، أرغب في حجز الحقيبة السوداء الملكية (420 درهم) المعروضة في الصفحة الرئيسية.",
  },
  {
    id: "sp2",
    nameFr: "Escarpins Vernis Soirée 9cm",
    nameAr: "حذاء سهرة أسود كعب عالي",
    categoryFr: "Souliers de Prestige",
    categoryAr: "أحذية ومناسبات",
    price: "360",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85",
    tagFr: "Édition Soirée",
    tagAr: "سهرات وحفلات",
    waFr: "Salam, je souhaite réserver les Escarpins Vernis Soirée (360 DH) vus en une du site Mol Sac.",
    waAr: "السلام عليكم، أرغب في حجز حذاء السهرة الأسود (360 درهم) المعروض في الصفحة الرئيسية.",
  },
  {
    id: "sp3",
    nameFr: "Grand Cabas Cuir Caramel",
    nameAr: "حقيبة يد كاباس كاراميل فاخرة",
    categoryFr: "Chic Quotidien & Bureau",
    categoryAr: "حقيبة يومية راقية",
    price: "490",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85",
    tagFr: "Best-Seller",
    tagAr: "الأعلى تقييماً",
    waFr: "Salam, je souhaite réserver le Grand Cabas Caramel (490 DH) vu en une du site Mol Sac.",
    waAr: "السلام عليكم، أرغب في حجز حقيبة الكاباس الكاراميل (490 درهم) المعروضة في الصفحة الرئيسية.",
  },
];

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang];
  const [activeSpotlight, setActiveSpotlight] = useState(0);

  // Auto rotate spotlight every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSpotlight((prev) => (prev + 1) % HERO_SPOTLIGHTS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_SPOTLIGHTS[activeSpotlight];

  return (
    <section className="relative overflow-hidden bg-[#0d0a08] text-[#f6f3ee] pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 border-b border-[#d4af37]/20">
      {/* Ambient luxury light halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#d4af37]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-[#c5a880]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Moroccan luxury pattern background */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none luxury-noise" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Editorial Text Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start">
            {/* Live Boutique Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1612]/90 border border-[#d4af37]/40 text-[#d4af37] text-xs font-medium mb-6 shadow-[0_0_25px_rgba(212,175,55,0.18)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="tracking-[0.15em] uppercase font-semibold text-white">
                {lang === "fr" ? "Boutique Ouverte • Kissaria Al Hamama N°6" : "المحل يستقبلكم الآن • قيسارية الحمامة 6"}
              </span>
              <span className="text-[#d4af37]/40 hidden sm:inline">•</span>
              <span className="text-[#d4af37] font-semibold hidden sm:inline">
                Tétouan 🇲🇦
              </span>
            </div>

            {/* Giant Editorial Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
              <span className="block font-serif-luxury text-gold-gradient tracking-wide">
                L&apos;ÉLÉGANCE
              </span>
              <span className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#fbf8f3] tracking-wide mt-1 block">
                {lang === "fr" ? "À la Tétouanaise" : "الأناقة بروح تطوانية راقية"}
              </span>
              <span className="text-base sm:text-xl font-arabic-luxury text-[#c5a880] mt-2 block tracking-wider">
                {lang === "fr" ? "Sacs d'exception • Souliers • Haute Fantaisie" : "حقائب راقية • أحذية فاخرة • أكسيسوارات ملكية"}
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-base text-[#e8e0d5]/85 max-w-xl mb-8 leading-relaxed font-light tracking-wide">
              {lang === "fr"
                ? "Découvrez une maroquinerie d'excellence et des collections raffinées sélectionnées avec passion dans notre boutique à Kissaria Al Hamama."
                : "اكتشفوا تشكيلة فريدة تم انتقاؤها بعناية من أجود الحقائب والأحذية والإكسسوارات الفاخرة في قلب تطوان."}
            </p>

            {/* Luxury Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 w-full sm:w-auto">
              <a
                href="#catalog"
                className="flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-[0.15em] bg-gold-metallic text-[#0d0a08] shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_35px_rgba(212,175,55,0.45)] hover:scale-105 transition-all duration-300 cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                <span>{t.viewCollection}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <a
                href="https://wa.me/212712128124?text=Salam%2C%20je%20souhaite%20d%C3%A9couvrir%20vos%20nouveaut%C3%A9s%20chez%20Mol%20Sac%20T%C3%A9touan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_10px_25px_rgba(16,185,129,0.3)] hover:scale-105 transition-all cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{lang === "fr" ? "WhatsApp VIP : 0712-128124" : "واتساب المباشر"}</span>
              </a>

              <a
                href="#location"
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-full text-xs font-medium text-[#e8e0d5] hover:text-[#d4af37] bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>{t.findStore}</span>
              </a>
            </div>

            {/* Trust Pillars */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-10 pt-8 border-t border-[#d4af37]/20 w-full text-center">
              <div className="p-3 sm:p-4 rounded-2xl glass-luxury">
                <Award className="w-5 h-5 text-[#d4af37] mx-auto mb-1.5" />
                <span className="text-xs sm:text-sm font-bold text-[#fbf8f3] block tracking-wide">
                  {lang === "fr" ? "Maroquinerie" : "جودة استثنائية"}
                </span>
                <span className="text-[10px] text-[#c5a880]/80 tracking-wider uppercase block mt-0.5">
                  Finitions Soignées
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl glass-luxury">
                <MapPin className="w-5 h-5 text-[#d4af37] mx-auto mb-1.5" />
                <span className="text-xs sm:text-sm font-bold text-[#fbf8f3] block tracking-wide">
                  {lang === "fr" ? "Local N° 6" : "محل رقم 6"}
                </span>
                <span className="text-[10px] text-[#c5a880]/80 tracking-wider uppercase block mt-0.5">
                  Kissaria Al Hamama
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl glass-luxury">
                <Truck className="w-5 h-5 text-[#d4af37] mx-auto mb-1.5" />
                <span className="text-xs sm:text-sm font-bold text-[#fbf8f3] block tracking-wide">
                  {lang === "fr" ? "Livraison" : "توصيل سريع"}
                </span>
                <span className="text-[10px] text-[#c5a880]/80 tracking-wider uppercase block mt-0.5">
                  Partout au Maroc 🇲🇦
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Haute Couture Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Golden Aura Frame */}
              <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-tr from-[#d4af37] via-[#aa820a]/40 to-transparent blur-xl opacity-60 pointer-events-none" />

              <div className="relative rounded-[32px] bg-[#17120e] p-6 sm:p-7 border border-[#d4af37]/40 shadow-2xl overflow-hidden card-modern-luxury">
                {/* Product Showcase Image */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#0d0a08] mb-5 border border-[#d4af37]/20">
                  <Image
                    src={current.image}
                    alt={lang === "ar" ? current.nameAr : current.nameFr}
                    fill
                    className="object-cover transition-all duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gold-metallic text-[#0d0a08] shadow-lg">
                      {lang === "ar" ? current.tagAr : current.tagFr}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/70 text-white border border-white/20 backdrop-blur-md">
                      {lang === "ar" ? current.categoryAr : current.categoryFr}
                    </span>
                  </div>

                  {/* Floating Price Pill */}
                  <div className="absolute bottom-3 left-3 flex items-baseline gap-1 px-3.5 py-1.5 rounded-xl bg-black/85 border border-[#d4af37]/50 backdrop-blur-md">
                    <span className="font-serif-luxury font-extrabold text-2xl text-gold-gradient">
                      {current.price}
                    </span>
                    <span className="text-xs font-bold text-[#d4af37]">DH</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1 mb-4">
                  <h3 className="text-lg font-serif-luxury font-bold text-white line-clamp-1">
                    {lang === "ar" ? current.nameAr : current.nameFr}
                  </h3>
                  <p className="text-xs text-[#c5a880] font-light">
                    {lang === "fr" ? "Disponible immédiatement à Kissaria Al Hamama N°6" : "متوفر فوراً في قيسارية الحمامة محل 6"}
                  </p>
                </div>

                {/* Spotlight Switcher Dots */}
                <div className="flex items-center justify-between pt-3 border-t border-[#d4af37]/20">
                  <div className="flex items-center gap-2">
                    {HERO_SPOTLIGHTS.map((sp, idx) => (
                      <button
                        key={sp.id}
                        onClick={() => setActiveSpotlight(idx)}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          idx === activeSpotlight
                            ? "w-8 bg-[#d4af37]"
                            : "w-2.5 bg-white/20 hover:bg-white/40"
                        }`}
                        title={sp.nameFr}
                      />
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/212712128124?text=${encodeURIComponent(
                      lang === "ar" ? current.waAr : current.waFr
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>{lang === "fr" ? "Réserver" : "حجز"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
