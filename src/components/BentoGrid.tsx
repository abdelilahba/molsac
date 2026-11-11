"use client";

import Image from "next/image";
import { Sparkles, MessageCircle, Truck, MapPin, ChevronRight, ShoppingBag, ShieldCheck, Heart, ArrowUpRight } from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface BentoGridProps {
  lang: Language;
}

export default function BentoGrid({ lang }: BentoGridProps) {
  const t = translations[lang];

  return (
    <section className="py-16 sm:py-24 bg-[#0d0a08] relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-[#d4af37]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#c5a880]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1c1612] border border-[#d4af37]/35 text-[#d4af37] text-xs font-semibold mb-3 tracking-[0.2em] uppercase">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span>{lang === "fr" ? "Curations & Savoir-Faire" : "مختارات حصرية"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif-luxury text-[#fbf8f3] tracking-tight">
              {lang === "fr" ? "L'Expérience Mol Sac" : "عالم مول الصاك الفاخر"}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#e8e0d5]/70 max-w-md font-light leading-relaxed">
            {lang === "fr"
              ? "Plus qu'une boutique, une signature de style tétouanaise alliant matières nobles, service attentionné et élégance moderne."
              : "أكثر من مجرد محل، عنوان للأناقة والذوق الرفيع بتطوان يجمع بين جودة المواد والخدمة الشخصية المميزة."}
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Bento Item 1: Large Featured Masterpiece (7 cols) */}
          <div className="lg:col-span-7 group relative min-h-[420px] sm:min-h-[500px] rounded-[32px] overflow-hidden border border-[#d4af37]/25 shadow-2xl flex flex-col justify-end p-6 sm:p-10 card-modern-luxury">
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85"
              alt="Pièce Maîtresse Mol Sac"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08] via-[#0d0a08]/40 to-black/20" />

            {/* Top Floating Badge */}
            <div className="absolute top-6 start-6 end-6 flex items-center justify-between z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gold-metallic text-[#0d0a08] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <Sparkles className="w-3.5 h-3.5 fill-[#0d0a08]" />
                <span>{lang === "fr" ? "Pièce Maîtresse 2026" : "تحفة الموسم 2026"}</span>
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-white/90 border border-white/20 backdrop-blur-md">
                {lang === "fr" ? "Kissaria Al Hamama N°6" : "قيسارية الحمامة رقم 6"}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                  {lang === "fr" ? "Haute Maroquinerie" : "حقائب فاخرة"}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-4xl font-extrabold text-[#fbf8f3] leading-tight">
                  {lang === "fr" ? "Sac Bandoulière Matelassé Noir & Or" : "حقيبة سوداء ملكية بسلسلة ذهبية"}
                </h3>
                <p className="text-xs sm:text-sm text-[#e8e0d5]/85 font-light line-clamp-2 max-w-xl">
                  {lang === "fr"
                    ? "Cuir grainé ultra résistant, fermoir bijou doré à l'or fin, bandoulière réglable. La pièce iconique qui sublime chaque tenue de jour comme de soirée."
                    : "جلد فائق الجودة، قفل مجوهر مطلي بلون الذهب اللامع، وسلسلة كتف قابلة للتعديل تناسب إطلالتك اليومية والرسمية."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-baseline gap-1.5 px-4 py-2 rounded-2xl bg-black/70 border border-[#d4af37]/40 backdrop-blur-md">
                  <span className="font-serif-luxury font-extrabold text-2xl sm:text-3xl text-gold-gradient">
                    420
                  </span>
                  <span className="text-xs font-bold text-[#d4af37]">DH</span>
                </div>

                <a
                  href={`https://wa.me/212712128124?text=${encodeURIComponent(
                    lang === "ar"
                      ? "السلام عليكم، أرغب في حجز الحقيبة السوداء الملكية (420 درهم) المعروضة في الصفحة الرئيسية."
                      : "Salam, je souhaite réserver le Sac Bandoulière Matelassé Noir & Or (420 DH) vu en une du site."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{lang === "fr" ? "Commander sur WhatsApp" : "طلب فوري واتساب"}</span>
                </a>

                <a
                  href="#catalog"
                  className="flex items-center gap-1.5 text-xs text-[#e8e0d5] hover:text-[#d4af37] transition-colors py-2"
                >
                  <span>{lang === "fr" ? "Explorer le catalogue" : "تصفح باقي الموديلات"}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
                </a>
              </div>
            </div>
          </div>

          {/* Bento Item 2: VIP WhatsApp Concierge (5 cols) */}
          <div className="lg:col-span-5 rounded-[32px] overflow-hidden border border-[#d4af37]/25 p-7 sm:p-8 flex flex-col justify-between card-modern-luxury relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1612] border border-[#d4af37]/30 text-[11px] text-[#d4af37]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{lang === "fr" ? "En ligne • Réponse en 5 min" : "متصل الآن • رد خلال 5 دقائق"}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-[#c5a880] uppercase tracking-[0.2em] font-semibold block mb-1">
                  {lang === "fr" ? "Service Privilège" : "خدمة خاصة"}
                </span>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#fbf8f3]">
                  {lang === "fr" ? "Concierge WhatsApp en Direct" : "استشارة مباشرة عبر واتساب"}
                </h3>
                <p className="text-xs sm:text-sm text-[#e8e0d5]/80 font-light mt-2 leading-relaxed">
                  {lang === "fr"
                    ? "Besoin d'une photo sous un autre angle, d'une courte vidéo de l'article en boutique ou d'un conseil ? Notre équipe à Kissaria Al Hamama vous répond immédiatement."
                    : "هل تريدين رؤية تفاصيل إضافية أو فيديو مباشر من داخل المحل؟ فريقنا في قيسارية الحمامة في خدمتكم طيلة اليوم."}
                </p>
              </div>

              {/* Quick Prompt Pills */}
              <div className="space-y-2 pt-2">
                <a
                  href={`https://wa.me/212712128124?text=${encodeURIComponent(
                    lang === "ar"
                      ? "السلام عليكم، هل يمكنكم إرسال فيديو للحقائب المتوفرة حالياً بالمحل ؟"
                      : "Salam, pouvez-vous m'envoyer une courte vidéo des sacs disponibles en boutique ?"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#e8e0d5] hover:text-[#d4af37] transition-all cursor-pointer"
                >
                  <span>{lang === "fr" ? "📹 Demander une vidéo en direct du magasin" : "📹 طلب فيديو مباشر من المحل"}</span>
                  <ChevronRight className="w-4 h-4 text-[#d4af37]" />
                </a>

                <a
                  href={`https://wa.me/212712128124?text=${encodeURIComponent(
                    lang === "ar"
                      ? "السلام عليكم، هل تقدمون التوصيل لمدينتي ؟"
                      : "Salam, livrez-vous dans ma ville et quels sont les délais ?"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#e8e0d5] hover:text-[#d4af37] transition-all cursor-pointer"
                >
                  <span>{lang === "fr" ? "📦 Vérifier la livraison dans ma ville" : "📦 الاستفسار عن التوصيل لمدينتي"}</span>
                  <ChevronRight className="w-4 h-4 text-[#d4af37]" />
                </a>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="https://wa.me/212712128124"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-2xl bg-gold-metallic text-[#0d0a08] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(212,175,55,0.25)] hover:scale-[1.02] active:scale-98 transition-all"
              >
                <span>WhatsApp : 0712-128124</span>
              </a>
            </div>
          </div>

          {/* Bento Item 3: Fast Delivery Morocco (4 cols) */}
          <div className="lg:col-span-4 rounded-[32px] overflow-hidden border border-[#d4af37]/25 p-7 sm:p-8 flex flex-col justify-between card-modern-luxury">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#fbf8f3]">
                {lang === "fr" ? "Livraison Express 58 Villes" : "توصيل سريع لـ 58 مدينة"}
              </h3>
              <p className="text-xs text-[#e8e0d5]/80 font-light leading-relaxed">
                {lang === "fr"
                  ? "Tanger, Tétouan, Rabat, Casablanca, Fès, Marrakech... Expédition soignée dans un emballage de prestige."
                  : "طنجة، تطوان، الرباط، الدار البيضاء، فاس، مراكش... تغليف فاخر وتوصيل سريع وموثوق."}
              </p>
            </div>

            <div className="pt-6 border-t border-[#d4af37]/15 flex items-center justify-between text-xs text-[#d4af37]">
              <span className="font-semibold">{lang === "fr" ? "Paiement à la livraison 🇲🇦" : "الدفع عند الاستلام 🇲🇦"}</span>
              <span className="text-[10px] text-[#e8e0d5]/60">24h - 48h</span>
            </div>
          </div>

          {/* Bento Item 4: Shoes & Heels Spotlight (4 cols) */}
          <div className="lg:col-span-4 group relative min-h-[260px] rounded-[32px] overflow-hidden border border-[#d4af37]/25 p-7 flex flex-col justify-end card-modern-luxury">
            <Image
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
              alt="Chaussures de Fêtes"
              fill
              className="object-cover group-hover:scale-108 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08] via-[#0d0a08]/60 to-black/30" />

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
                {lang === "fr" ? "Souliers & Escarpins" : "أحذية وسهرات"}
              </span>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                {lang === "fr" ? "Élégance & Confort" : "الأناقة والراحة المطلقة"}
              </h3>
              <a
                href="#catalog"
                className="inline-flex items-center gap-1.5 text-xs text-[#e8e0d5] hover:text-[#d4af37] font-semibold pt-1"
              >
                <span>{lang === "fr" ? "Voir les chaussures" : "عرض الأحذية"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Bento Item 5: In-Store Experience (4 cols) */}
          <div className="lg:col-span-4 rounded-[32px] overflow-hidden border border-[#d4af37]/25 p-7 sm:p-8 flex flex-col justify-between card-modern-luxury">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880]">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#fbf8f3]">
                {lang === "fr" ? "Boutique Kissaria Al Hamama" : "محل قيسارية الحمامة"}
              </h3>
              <p className="text-xs text-[#e8e0d5]/80 font-light leading-relaxed">
                {lang === "fr"
                  ? "Magasin N°6, au cœur de la Médina de Tétouan. Venez essayer nos pièces et profiter d'un accueil chaleureux."
                  : "محل رقم 6 في قلب تطوان. تفضلوا بزيارتنا لتجربة الموديلات والاستمتاع بحسن الاستقبال."}
              </p>
            </div>

            <div className="pt-6 border-t border-[#d4af37]/15 flex items-center justify-between text-xs text-[#c5a880]">
              <span className="font-semibold">{lang === "fr" ? "Ouvert 7j/7" : "مفتوح 7 أيام / 7"}</span>
              <span className="text-[10px] text-[#e8e0d5]/60">10h00 - 21h30</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

