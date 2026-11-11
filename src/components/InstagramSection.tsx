"use client";

import Image from "next/image";
import { Sparkles, ExternalLink } from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface InstagramSectionProps {
  lang: Language;
}

function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function InstagramSection({ lang }: InstagramSectionProps) {
  const t = translations[lang];

  // Curated editorial tiles linking to Instagram
  const instagramFeed = [
    {
      img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
      tag: "#SacDeLuxe",
    },
    {
      img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80",
      tag: "#EscarpinsSoirée",
    },
    {
      img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
      tag: "#HauteJoaillerie",
    },
    {
      img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&auto=format&fit=crop&q=80",
      tag: "#PochetteChic",
    },
  ];

  return (
    <section id="instagram" className="py-20 bg-[#0d0a08] text-[#f6f3ee] border-t border-[#d4af37]/20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Banner Card */}
        <div className="rounded-[36px] bg-gradient-to-r from-[#17120e] via-[#1f1712] to-[#17120e] border border-[#d4af37]/35 p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5 shadow-[0_0_25px_rgba(244,63,94,0.3)] flex-shrink-0">
                <div className="w-full h-full bg-[#0d0a08] rounded-[14px] flex items-center justify-center text-white">
                  <InstagramIcon className="w-8 h-8" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#fbf8f3]">
                    {t.instagramFollow}
                  </h3>
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                </div>
                <p className="text-base text-[#d4af37] font-serif-luxury font-bold tracking-wider mt-0.5">
                  @mol_sac44
                </p>
                <p className="text-xs text-[#e8e0d5]/75 mt-1 max-w-lg font-light">
                  {t.instagramSubtitle}
                </p>
              </div>
            </div>

            <a
              href="https://instagram.com/mol_sac44"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:opacity-90 text-white shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all cursor-pointer active:scale-95"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>{t.viewInstagram}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {instagramFeed.map((item, idx) => (
            <a
              key={idx}
              href="https://instagram.com/mol_sac44"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden border border-[#d4af37]/25 shadow-lg bg-[#17120e]"
            >
              <Image
                src={item.img}
                alt={item.tag}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-[#0d0a08]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                <InstagramIcon className="w-7 h-7 text-[#d4af37] mb-2" />
                <span className="text-xs font-bold text-[#fbf8f3] tracking-wide">
                  {item.tag}
                </span>
                <span className="text-[10px] text-[#c5a880] mt-1">@mol_sac44</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
