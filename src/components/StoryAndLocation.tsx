"use client";

import { MapPin, Clock, Phone, MessageCircle, Navigation, Sparkles, Compass, ShieldCheck } from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface StoryAndLocationProps {
  lang: Language;
}

export default function StoryAndLocation({ lang }: StoryAndLocationProps) {
  const t = translations[lang];

  // Google Maps URLs for Kissaria Al Hamama Tétouan
  const mapsSearchUrl = "https://www.google.com/maps/search/?api=1&query=Kissariat+Al+Hamama+Tetouan";
  const mapsEmbedUrl = "https://maps.google.com/maps?q=Kissariat%20Al%20Hamama,%20Tetouan&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="location" className="py-20 sm:py-28 bg-[#120e0b] text-[#f6f3ee] border-t border-[#d4af37]/20 relative overflow-hidden">
      {/* Background radial gold aura */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-[#1c1612] text-[#d4af37] border border-[#d4af37]/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{lang === "fr" ? "Notre Adresse à Tétouan" : "عنوان المحل بتطوان"}</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#fbf8f3] font-serif-luxury tracking-tight">
            {t.aboutTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#e8e0d5]/80 mt-3 font-light leading-relaxed">
            {t.aboutText}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Information & Concierge Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            {/* Main Address Card */}
            <div className="bg-[#17120e] rounded-[30px] p-6 sm:p-7 border border-[#d4af37]/30 shadow-2xl relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center flex-shrink-0 border border-[#d4af37]/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-bold block mb-1">
                    {lang === "fr" ? "Boutique Physique" : "المقر الرئيسي"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#fbf8f3] font-serif-luxury">
                    قيسارية الحمامة، محل رقم 6
                  </h3>
                  <p className="text-sm text-[#e8e0d5]/80 mt-1 font-light">
                    Kissariat Al Hamama, Magasin N° 6, Tétouan 🇲🇦
                  </p>
                  <p className="text-xs text-[#c5a880]/70 mt-1">
                    Au cœur de la médina commerçante de Tétouan
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#d4af37]/15 flex items-center gap-3">
                    <a
                      href={mapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:text-[#fff2cc] transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>{t.directionsButton} →</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours & Welcoming Card */}
            <div className="bg-[#17120e] rounded-[30px] p-6 sm:p-7 border border-[#d4af37]/30 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center flex-shrink-0 border border-[#d4af37]/30">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-bold block mb-1">
                    {lang === "fr" ? "Horaires d'Ouverture" : "أوقات الاستقبال"}
                  </span>
                  <h3 className="text-lg font-bold text-[#fbf8f3]">
                    {t.hours}
                  </h3>
                  <p className="text-xs text-[#c5a880] mt-1 font-light">
                    {lang === "fr" ? "Ouvert 7 jours sur 7 • Accueil chaleureux garanti" : "نستقبلكم بكل ترحيب طيلة أيام الأسبوع"}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Instant Contact CTAs */}
            <div className="grid grid-cols-2 gap-3.5 pt-1">
              <a
                href="https://wa.me/212712128124"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+212712128124"
                className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-gold-metallic text-[#0d0a08] shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>0712-128124</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-7 h-96 lg:h-auto rounded-[32px] overflow-hidden border-2 border-[#d4af37]/35 shadow-2xl relative bg-[#0f0b08] group">
            <iframe
              src={mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mol Sac Boutique Kissaria Al Hamama Tetouan"
              className="w-full h-full filter invert-[0.9] hue-rotate-180 contrast-125"
            />

            {/* Floating Location Stamp */}
            <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-[#0d0a08]/90 backdrop-blur-xl px-5 py-3 rounded-2xl border border-[#d4af37]/40 shadow-2xl text-xs text-[#f6f3ee] flex items-center justify-between sm:justify-start gap-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-[#d4af37] font-serif-luxury">
                  Mol Sac • محل رقم 6
                </span>
              </div>
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] uppercase tracking-wider text-[#d4af37] underline font-bold"
              >
                {lang === "fr" ? "Ouvrir l'Itinéraire" : "فتح الخريطة"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
