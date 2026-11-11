"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  MapPin,
  Globe,
  Shield,
  Menu,
  X,
  Phone,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Header({ lang, onLanguageChange }: HeaderProps) {
  const t = translations[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "#catalog", labelFr: "Collection", labelAr: "المجموعات" },
    { href: "#catalog", labelFr: "Pièces Phares", labelAr: "المميز" },
    { href: "#location", labelFr: "La Boutique", labelAr: "المحل" },
    { href: "#instagram", labelFr: "Instagram", labelAr: "إنستغرام" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Sleek, Single Luxury Glass Navbar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          scrolled
            ? "bg-[#0d0a08]/95 backdrop-blur-2xl border-[#d4af37]/25 shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            : "bg-[#0d0a08]/85 backdrop-blur-xl border-[#d4af37]/15 shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* 1. Left: Brand Identity (Original Logo + Typography) */}
          <Link href="/" className="flex items-center gap-3.5 group flex-shrink-0">
            {/* Original Store Logo */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#d4af37]/80 shadow-[0_0_20px_rgba(212,175,55,0.25)] bg-[#1c1612] flex-shrink-0 group-hover:border-[#d4af37] group-hover:scale-105 transition-all duration-300">
              <Image
                src="/images/logo.png"
                alt="Mol Sac Logo"
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </div>

            {/* Typography */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-[0.2em] font-serif-luxury text-[#fbf8f3] group-hover:text-[#d4af37] transition-colors leading-none">
                  MOL SAC
                </span>
                <span className="text-sm sm:text-base font-bold text-[#d4af37] font-arabic-luxury leading-none">
                  مول الصاك
                </span>
              </div>
              <span className="text-[10px] text-[#c5a880]/80 tracking-[0.25em] uppercase font-light mt-1 hidden sm:block">
                {lang === "fr" ? "Haute Maroquinerie • Tétouan" : "حقائب فاخرة • تطوان"}
              </span>
            </div>
          </Link>

          {/* 2. Center: Editorial Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-[0.2em] uppercase text-[#e8e0d5]/85">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-[#d4af37] transition-colors py-1 relative group"
              >
                <span>{lang === "ar" ? link.labelAr : link.labelFr}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#d4af37] to-[#aa820a] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* 3. Right: Luxury Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Language Switcher Button */}
            <button
              onClick={() => onLanguageChange(lang === "fr" ? "ar" : "fr")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#17120e] hover:bg-[#221a14] text-[#d4af37] border border-[#d4af37]/35 transition-all shadow-sm cursor-pointer active:scale-95"
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
              className="relative inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer active:scale-95"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <MessageCircle className="w-4 h-4 fill-white flex-shrink-0" />
              <span className="hidden sm:inline tracking-wider font-semibold">
                {lang === "fr" ? "0712-128124" : "واتساب"}
              </span>
            </a>

            {/* Discreet Admin Portal Link (Desktop) */}
            <Link
              href="/admin"
              className="hidden sm:flex p-2.5 rounded-full text-[#c5a880]/70 hover:text-[#d4af37] hover:bg-white/5 border border-white/5 hover:border-[#d4af37]/35 transition-all"
              title={t.adminAccess}
            >
              <Shield className="w-4 h-4" />
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-xl text-[#e8e0d5] hover:text-[#d4af37] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] sm:top-[80px] bottom-0 bg-[#0d0a08]/98 backdrop-blur-2xl border-t border-[#d4af37]/25 z-40 overflow-y-auto animate-in slide-in-from-top duration-300 flex flex-col justify-between p-6">
          <div className="space-y-6">
            {/* Boutique Location Card inside menu */}
            <div className="p-4 rounded-2xl bg-[#17120e] border border-[#d4af37]/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 flex items-center justify-center text-[#d4af37]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#fbf8f3] font-serif-luxury">
                  Kissaria Al Hamama, Magasin N°6
                </p>
                <p className="text-[11px] text-[#c5a880]">
                  Tétouan 🇲🇦 • Ouvert 7j/7 (10h - 21h30)
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              {[
                { href: "#catalog", labelFr: "Collection Complète", labelAr: "كامل المعروضات", icon: "✨" },
                { href: "#catalog", labelFr: "Sacs à Main", labelAr: "حقائب راقية", icon: "👜" },
                { href: "#catalog", labelFr: "Souliers & Escarpins", labelAr: "أحذية وسهرات", icon: "👠" },
                { href: "#location", labelFr: "Adresse & Horaires", labelAr: "الموقع ومواعيد العمل", icon: "📍" },
                { href: "#instagram", labelFr: "Instagram @mol_sac44", labelAr: "إنستغرام المحل", icon: "📸" },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl text-sm font-semibold text-[#f6f3ee] hover:text-[#d4af37] hover:bg-white/5 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-base">{link.icon}</span>
                    <span>{lang === "ar" ? link.labelAr : link.labelFr}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#d4af37]/50" />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Actions inside Mobile Drawer */}
          <div className="pt-6 border-t border-[#d4af37]/20 space-y-3">
            {/* Big WhatsApp CTA */}
            <a
              href="https://wa.me/212712128124?text=Salam%2C%20je%20souhaite%20commander%20chez%20Mol%20Sac%20T%C3%A9touan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/50"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Commander sur WhatsApp (0712-128124)</span>
            </a>

            {/* Direct Phone & Admin */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:+212712128124"
                className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-[#f6f3ee] flex items-center justify-center gap-2 hover:bg-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>0712-128124</span>
              </a>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 rounded-xl bg-[#1c1612] border border-[#d4af37]/35 text-xs font-semibold text-[#d4af37] flex items-center justify-center gap-2 hover:bg-[#28201a]"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{lang === "fr" ? "Admin iPhone" : "الإدارة"}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
