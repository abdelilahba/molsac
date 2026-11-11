"use client";

import { Star, Sparkles, Quote, CheckCircle2 } from "lucide-react";
import { Language } from "@/lib/translations";

interface TestimonialsProps {
  lang: Language;
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const reviews = [
    {
      name: "Salma B.",
      city: lang === "fr" ? "Tanger" : "طنجة",
      stars: 5,
      date: "Il y a 3 jours",
      dateAr: "منذ 3 أيام",
      textFr:
        "Sac reçu en 24h à Tanger ! Le cuir est sublime, identique aux photos et vidéos envoyées par le frère sur WhatsApp. Service au top !",
      textAr:
        "توصلت بالحقيبة في 24 ساعة فقط في طنجة ! الجلد رائع وبنفس الجودة اللي شفتها في الفيديو على الواتساب. تعامل راقي جداً !",
      itemFr: "Sac Matelassé Noir",
      itemAr: "حقيبة سوداء ملكية",
    },
    {
      name: "Nadia T.",
      city: lang === "fr" ? "Tétouan" : "تطوان",
      stars: 5,
      date: "Il y a 1 semaine",
      dateAr: "منذ أسبوع",
      textFr:
        "Cliente fidèle de la boutique à Kissaria Al Hamama. Toujours les plus beaux modèles de Tétouan et un accueil irréprochable.",
      textAr:
        "زبونة دائمة لمحل مول الصاك بقيسارية الحمامة. دائماً أفضل تشكيلات الحقائب في تطوان واستقبال في غاية اللطف.",
      itemFr: "Cabas Cuir Caramel",
      itemAr: "حقيبة كاباس كاراميل",
    },
    {
      name: "Houda M.",
      city: lang === "fr" ? "Casablanca" : "الدار البيضاء",
      stars: 5,
      date: "Il y a 2 semaines",
      dateAr: "منذ أسبوعين",
      textFr:
        "Livraison rapide sur Casa, emballage très soigné et paiement à la livraison en toute sécurité. Les finitions dorées sont magnifiques.",
      textAr:
        "توصيل سريع للدار البيضاء، تغليف فاخر وأنيق والدفع عند الاستلام بكل ثقة. اللمسات الذهبية في الحقيبة ممتازة.",
      itemFr: "Sac Bandoulière Crème",
      itemAr: "حقيبة كتف عاجية",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0a0705] border-t border-b border-[#d4af37]/15 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1c1612] border border-[#d4af37]/35 text-[#d4af37] text-xs font-semibold mb-3 tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{lang === "fr" ? "Témoignages & Avis Vérifiés" : "شهادات زبوناتنا"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-[#fbf8f3] tracking-tight">
            {lang === "fr" ? "La Confiance de Nos Clientes" : "ثقة تتجدد مع كل إطلالة"}
          </h2>
          <p className="text-xs sm:text-sm text-[#e8e0d5]/75 mt-2 font-light">
            {lang === "fr"
              ? "Rejoignez des centaines de clientes satisfaites à Tétouan et dans tout le Royaume."
              : "انضموا إلى مئات الزبونات الوفيات بتطوان وكافة المدن المغربية."}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="p-7 sm:p-8 rounded-[28px] bg-[#140f0c] border border-[#d4af37]/25 shadow-xl flex flex-col justify-between card-modern-luxury relative"
            >
              <div className="space-y-4">
                {/* Top Quote & Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.stars)].map((_, s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 text-[#d4af37] fill-[#d4af37]"
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#d4af37]/30" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#e8e0d5]/90 font-light leading-relaxed italic">
                  &ldquo;{lang === "ar" ? rev.textAr : rev.textFr}&rdquo;
                </p>

                {/* Purchased Item Tag */}
                <div className="pt-2">
                  <span className="inline-block text-[10px] font-semibold tracking-wider text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-2.5 py-0.5 rounded-full">
                    {lang === "ar" ? rev.itemAr : rev.itemFr}
                  </span>
                </div>
              </div>

              {/* Author & Location */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-[#fbf8f3]">
                      {rev.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-[11px] text-[#c5a880]/80">
                    {rev.city} • {lang === "fr" ? "Achat vérifié" : "طلب مؤكد"}
                  </span>
                </div>

                <span className="text-[10px] text-[#e8e0d5]/50">
                  {lang === "ar" ? rev.dateAr : rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

