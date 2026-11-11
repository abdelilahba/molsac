"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, X, ChevronLeft, ChevronRight, MessageCircle, MapPin, Eye } from "lucide-react";
import { Language } from "@/lib/translations";

interface StoryItem {
  id: string;
  titleFr: string;
  titleAr: string;
  tagFr: string;
  tagAr: string;
  thumbnail: string;
  image: string;
  captionFr: string;
  captionAr: string;
  price?: string;
  waTextFr: string;
  waTextAr: string;
}

const STORIES: StoryItem[] = [
  {
    id: "s1",
    titleFr: "Nouveautés Sacs",
    titleAr: "حقائب جديدة",
    tagFr: "Arrivage Semaine",
    tagAr: "وصل حديثاً",
    thumbnail: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
    captionFr: "Nouveau sac bandoulière matelassé avec chaîne dorée gourmette. Édition limitée disponible en boutique !",
    captionAr: "حقيبة كتف مبطنة بلمسة ذهبية ملكية راقية. كمية محدودة متوفرة الآن في المحل !",
    price: "420 DH",
    waTextFr: "Salam, j'ai vu la story du sac bandoulière matelassé (420 DH). Est-il disponible ?",
    waTextAr: "السلام عليكم، شفت ستوري الحقيبة المبطنة (420 درهم). هل ما زالت متوفرة ؟",
  },
  {
    id: "s2",
    titleFr: "Escarpins Soirée",
    titleAr: "أحذية سهرة",
    tagFr: "Tendance 2026",
    tagAr: "موضة 2026",
    thumbnail: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85",
    captionFr: "Escarpins vernis noir talon aiguille 9cm. Confortables et splendides pour toutes vos fêtes et mariages.",
    captionAr: "حذاء كعب عالي أسود لامع، أناقة مطلقة وراحة لقدميك في كافة المناسبات والأعراس.",
    price: "360 DH",
    waTextFr: "Salam, je souhaite commander les escarpins vernis noirs (360 DH) vus en story.",
    waTextAr: "السلام عليكم، بغيت نسول على حذاء السهرة الأسود (360 درهم) اللي في الستوري.",
  },
  {
    id: "s3",
    titleFr: "Cabas Élégance",
    titleAr: "حقائب كاباس",
    tagFr: "Best Seller",
    tagAr: "الأكثر طلباً",
    thumbnail: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85",
    captionFr: "Grand cabas cuir caramel rigide avec pochettes intérieures et finitions couture. Le sac parfait de tous les jours.",
    captionAr: "حقيبة يد كاباس كبيرة من الجلد الكاراميل الفاخر، واسعة ومثالية للاستخدام اليومي والعمل.",
    price: "490 DH",
    waTextFr: "Salam, est-ce que le grand cabas caramel (490 DH) est en stock ?",
    waTextAr: "السلام عليكم، هل حقيبة الكاباس الكبيرة (490 درهم) متوفرة بالمحل ؟",
  },
  {
    id: "s4",
    titleFr: "Haute Fantaisie",
    titleAr: "مجوهرات وإكسسوار",
    tagFr: "Finitions Or",
    tagAr: "طلاء ذهبي",
    thumbnail: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
    captionFr: "Parure collier et pendentif maillons or 18k plaqué avec incrustations. L'éclat qui sublime n'importe quelle tenue.",
    captionAr: "طقم عقد وأساور مطلي بماء الذهب عالي الجودة ومقاوم للماء، يمنحك بريقاً فريداً.",
    price: "240 DH",
    waTextFr: "Salam, je suis intéressée par la parure collier en story (240 DH).",
    waTextAr: "السلام عليكم، عجبني طقم الإكسسوار اللي في الستوري (240 درهم).",
  },
  {
    id: "s5",
    titleFr: "La Boutique",
    titleAr: "المحل بتطوان",
    tagFr: "Kissaria Al Hamama",
    tagAr: "قيسارية الحمامة",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85",
    captionFr: "Bienvenue chez Mol Sac ! Kissaria Al Hamama, Magasin N°6 à Tétouan. Ouvert 7j/7 de 10h à 21h30.",
    captionAr: "مرحباً بكم في محلكم مول الصاك ! قيسارية الحمامة، محل رقم 6 بتطوان. مفتوح يومياً من 10:00 إلى 21:30.",
    waTextFr: "Salam, je prévois de passer au magasin à Kissaria Al Hamama aujourd'hui.",
    waTextAr: "السلام عليكم، غادي نجي للمحل في قيسارية الحمامة اليوم إن شاء الله.",
  },
];

interface StoryBarProps {
  lang: Language;
}

export default function StoryBar({ lang }: StoryBarProps) {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  const activeStory = activeStoryIndex !== null ? STORIES[activeStoryIndex] : null;

  const handleNext = () => {
    if (activeStoryIndex !== null) {
      if (activeStoryIndex < STORIES.length - 1) {
        setActiveStoryIndex(activeStoryIndex + 1);
      } else {
        setActiveStoryIndex(null);
      }
    }
  };

  const handlePrev = () => {
    if (activeStoryIndex !== null) {
      if (activeStoryIndex > 0) {
        setActiveStoryIndex(activeStoryIndex - 1);
      } else {
        setActiveStoryIndex(null);
      }
    }
  };

  return (
    <div className="py-6 bg-[#080605] border-b border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto px-4">
        {/* Story Bar Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4af37]" />
            </span>
            <span className="text-xs uppercase font-serif-luxury font-bold tracking-[0.2em] text-[#d4af37]">
              {lang === "fr" ? "En Direct de la Boutique" : "مباشرة من المحل"}
            </span>
            <span className="text-[10px] text-[#e8e0d5]/60 tracking-wider">
              {lang === "fr" ? "• Stories & Nouveautés" : "• ستوريات وجديد الأسبوع"}
            </span>
          </div>

          <span className="text-[11px] text-[#c5a880]/80 hidden sm:inline-block tracking-wider">
            {lang === "fr" ? "Cliquez pour voir en plein écran" : "اضغط لمشاهدة الستوري"}
          </span>
        </div>

        {/* Stories Horizontal Reel */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
          {STORIES.map((story, index) => {
            const title = lang === "ar" ? story.titleAr : story.titleFr;
            const tag = lang === "ar" ? story.tagAr : story.tagFr;

            return (
              <button
                key={story.id}
                onClick={() => setActiveStoryIndex(index)}
                className="flex flex-col items-center gap-2 group flex-shrink-0 cursor-pointer focus:outline-none transition-transform active:scale-95 text-left"
              >
                {/* Glowing Animated Ring */}
                <div className="story-ring p-[2.5px] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:shadow-[0_0_22px_rgba(212,175,55,0.45)]">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-[#1c1612] border-2 border-[#0d0a08]">
                    <Image
                      src={story.thumbnail}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-115 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-1 inset-x-0 flex justify-center">
                      <Sparkles className="w-3 h-3 text-[#d4af37] opacity-80" />
                    </div>
                  </div>
                </div>

                {/* Story Label */}
                <div className="text-center max-w-[85px]">
                  <span className="block text-xs font-semibold text-[#f6f3ee] group-hover:text-[#d4af37] transition-colors truncate">
                    {title}
                  </span>
                  <span className="block text-[9px] text-[#c5a880]/80 tracking-wide uppercase truncate">
                    {tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Story Viewer Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300">
          <div className="relative w-full max-w-md h-[85vh] sm:h-[680px] bg-[#120e0b] rounded-3xl overflow-hidden border border-[#d4af37]/40 shadow-[0_0_60px_rgba(212,175,55,0.25)] flex flex-col justify-between">
            {/* Top Progress Bar */}
            <div className="absolute top-3 inset-x-3 z-30 flex gap-1.5">
              {STORIES.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden"
                >
                  <div
                    className={`h-full bg-[#d4af37] transition-all duration-300 ${
                      i === activeStoryIndex
                        ? "w-full animate-shimmer"
                        : i < (activeStoryIndex ?? 0)
                        ? "w-full"
                        : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Top Story Header */}
            <div className="relative z-20 pt-7 px-4 pb-3 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#d4af37]">
                  <Image
                    src="/images/logo.png"
                    alt="Mol Sac"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif-luxury text-sm font-bold text-white">
                      MOL SAC
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
                      Tétouan
                    </span>
                  </div>
                  <span className="text-[10px] text-[#e8e0d5]/80 block">
                    {lang === "ar" ? activeStory.titleAr : activeStory.titleFr}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveStoryIndex(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Story Visual Background */}
            <div className="absolute inset-0 z-0">
              <Image
                src={activeStory.image}
                alt="Story View"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
            </div>

            {/* Nav Touch zones (Left / Right) */}
            <button
              onClick={handlePrev}
              disabled={activeStoryIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white flex items-center justify-center disabled:opacity-0 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white flex items-center justify-center transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom Caption & WhatsApp Order Button */}
            <div className="relative z-20 p-5 bg-gradient-to-t from-black via-black/90 to-transparent space-y-3">
              {activeStory.price && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37] text-[#0d0a08] font-extrabold text-sm shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  <span>{activeStory.price}</span>
                  <span className="text-[10px] font-normal uppercase">
                    {lang === "fr" ? "Prix Boutique" : "ثمن المحل"}
                  </span>
                </div>
              )}

              <p className="text-sm text-white font-medium leading-relaxed drop-shadow-md">
                {lang === "ar" ? activeStory.captionAr : activeStory.captionFr}
              </p>

              <div className="pt-2 flex items-center gap-2">
                <a
                  href={`https://wa.me/212712128124?text=${encodeURIComponent(
                    lang === "ar" ? activeStory.waTextAr : activeStory.waTextFr
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>
                    {lang === "fr" ? "Commander sur WhatsApp" : "طلب هذا الموديل واتساب"}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

