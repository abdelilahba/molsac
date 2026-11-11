"use client";

import Image from "next/image";
import { Sparkles, MapPin, ShoppingBag, ArrowDown, PhoneCall, Award, ShieldCheck, Truck, ChevronRight } from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#120e0b] via-[#0d0a08] to-[#120e0b] text-[#f6f3ee] pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 border-b border-[#d4af37]/20">
      {/* Ambient luxury light halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 right-10 w-[350px] h-[350px] bg-[#c5a880]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Moroccan luxury pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Editorial Text Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Elite Boutique Label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1612]/90 border border-[#d4af37]/40 text-[#d4af37] text-xs font-medium mb-6 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
              <span className="tracking-[0.15em] uppercase font-semibold">
                {lang === "fr" ? "Maison Fondée à Tétouan" : "دار الموضة والأناقة بتطوان"}
              </span>
              <span className="text-[#d4af37]/40">•</span>
              <span className="text-[#e8e0d5]/80 font-light">
                {lang === "fr" ? "Kissaria Al Hamama N°6" : "قيسارية الحمامة محل 6"}
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
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <a
                href="#catalog"
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-[0.15em] bg-gold-metallic text-[#0d0a08] shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_35px_rgba(212,175,55,0.45)] hover:scale-105 transition-all duration-300 cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                <span>{t.viewCollection}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#location"
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#1c1612] hover:bg-[#28201a] text-[#e8e0d5] border border-[#d4af37]/40 hover:border-[#d4af37] transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>{t.findStore}</span>
              </a>

              <a
                href="https://wa.me/212712128124"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-full text-xs font-medium text-[#d4af37] hover:text-[#fff2cc] bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp : 0712-128124</span>
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

              <div className="relative rounded-[32px] bg-[#17120e] p-6 sm:p-8 border border-[#d4af37]/40 shadow-2xl overflow-hidden">
                {/* Background ambient badge */}
                <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-[#d4af37]/5 blur-2xl pointer-events-none" />

                {/* Logo Centered with Prestige Circle */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full overflow-hidden border-2 border-[#d4af37] shadow-[0_0_35px_rgba(212,175,55,0.3)] bg-[#0d0a08] mb-6 group-hover:scale-105 transition-transform">
                  <Image
                    src="/images/logo.png"
                    alt="Mol Sac Logo Officiel"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="text-center space-y-1 mb-5">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold block">
                    Boutique Officielle • Tétouan
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#fbf8f3] tracking-wider">
                    MOL SAC
                  </h3>
                  <p className="text-sm font-arabic-luxury text-[#c5a880]">
                    مول الصاك • حقائب وأحذية راقية
                  </p>
                </div>

                {/* Address Box */}
                <div className="bg-[#0f0b08]/90 rounded-2xl p-4 border border-[#d4af37]/25 text-center space-y-1 mb-5">
                  <p className="font-bold text-sm text-[#fbf8f3] flex items-center justify-center gap-1.5 font-serif-luxury">
                    <MapPin className="w-4 h-4 text-[#d4af37]" />
                    <span>قيسارية الحمامة، محل رقم 6، تطوان</span>
                  </p>
                  <p className="text-[11px] text-[#e8e0d5]/70">
                    Kissariat Al Hamama, Magasin N° 6, Tétouan
                  </p>
                </div>

                {/* Live Status Indicator */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold text-emerald-200">
                      {lang === "fr" ? "Magasin Ouvert Aujourd'hui" : "المحل يستقبلكم الآن"}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#c5a880] font-mono">10h00 - 21h30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
