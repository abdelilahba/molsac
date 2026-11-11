"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, MapPin, Globe, Shield, Sparkles } from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Header({ lang, onLanguageChange }: HeaderProps) {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-50 text-[#f6f3ee]">
      {/* Top Luxury Ticker Marquee */}
      <div className="bg-[#080605] border-b border-[#d4af37]/15 py-1.5 px-4 overflow-hidden relative">
        <div className="flex items-center justify-between max-w-7xl mx-auto text-[11px] tracking-widest text-[#d4af37]/90 uppercase font-light">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#f6f3ee]/80 font-medium tracking-wider">
              {lang === "fr" ? "Boutique ouverte • Kissaria Al Hamama N°6, Tétouan" : "المحل مفتوح لاستقبالكم • قيسارية الحمامة محل 6 تطوان"}
            </span>
          </div>

          <div className="mx-auto sm:mx-0 flex items-center gap-3 text-[10px] sm:text-[11px] text-[#e8e0d5]/75">
            <span className="text-[#d4af37] font-semibold">✦ HAUTE MAROQUINERIE</span>
            <span className="text-white/20">•</span>
            <span>LIVRAISON PARTOUT AU MAROC 🇲🇦</span>
            <span className="text-white/20">•</span>
            <span className="text-[#d4af37]">0712-128124</span>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <div className="bg-[#120e0b]/85 backdrop-blur-xl border-b border-[#d4af37]/20 shadow-2xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Logo & Luxury Brand Title */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#d4af37]/80 shadow-[0_0_20px_rgba(212,175,55,0.25)] bg-[#1c1612] flex-shrink-0 group-hover:border-[#d4af37] group-hover:scale-105 transition-all duration-300">
              <Image
                src="/images/logo.png"
                alt="Mol Sac Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-[0.2em] font-serif-luxury text-[#fbf8f3] group-hover:text-[#d4af37] transition-colors">
                  MOL SAC
                </span>
                <span className="text-base sm:text-lg font-bold text-[#d4af37] font-arabic-luxury tracking-normal">
                  مول الصاك
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#c5a880] tracking-[0.25em] uppercase font-light">
                {lang === "fr" ? "Tétouan • Kissaria Al Hamama N°6" : "تطوان • قيسارية الحمامة محل 6"}
              </span>
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-[0.15em] uppercase text-[#e8e0d5]/80">
            <a href="#catalog" className="hover:text-[#d4af37] transition-colors py-1 relative group">
              <span>{lang === "fr" ? "Collection" : "المجموعات"}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#catalog" className="hover:text-[#d4af37] transition-colors py-1 relative group">
              <span>{lang === "fr" ? "Sacs d'Exception" : "حقائب فاخرة"}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#location" className="hover:text-[#d4af37] transition-colors py-1 relative group">
              <span>{lang === "fr" ? "La Boutique" : "المحل"}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#instagram" className="hover:text-[#d4af37] transition-colors py-1 relative group">
              <span>@mol_sac44</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          {/* Right Action Icons: Language, WhatsApp Concierge, Admin */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Language Switcher Button */}
            <button
              onClick={() => onLanguageChange(lang === "fr" ? "ar" : "fr")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1c1612] hover:bg-[#28201a] text-[#d4af37] border border-[#d4af37]/30 transition-all shadow-sm cursor-pointer active:scale-95"
              title="Changer de langue / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="tracking-wider">{lang === "fr" ? "العربية" : "FR"}</span>
            </button>

            {/* Direct WhatsApp Concierge Button */}
            <a
              href="https://wa.me/212712128124?text=Salam%2C%20je%20vous%20contacte%20depuis%20le%20site%20officiel%20Mol%20Sac%20T%C3%A9touan"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer group active:scale-95"
            >
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <MessageCircle className="w-4 h-4 fill-white flex-shrink-0" />
              <span className="hidden sm:inline font-medium tracking-wide">
                {lang === "fr" ? "WhatsApp 0712-128124" : "واتساب المحل"}
              </span>
              <span className="sm:hidden font-medium">WhatsApp</span>
            </a>

            {/* Discreet Admin Portal Link */}
            <Link
              href="/admin"
              className="p-2 sm:p-2.5 rounded-full text-[#c5a880]/70 hover:text-[#d4af37] bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
              title={t.adminAccess}
            >
              <Shield className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
