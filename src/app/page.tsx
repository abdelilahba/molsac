"use client";

import { useState } from "react";
import { MessageCircle, Sparkles, MapPin } from "lucide-react";
import { Language } from "@/lib/translations";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCatalog from "@/components/ProductCatalog";
import StoryAndLocation from "@/components/StoryAndLocation";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [lang, setLang] = useState<Language>("fr");

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#0d0a08] text-[#f6f3ee] selection:bg-[#d4af37] selection:text-[#0d0a08] relative"
    >
      {/* Sticky Luxury Navbar */}
      <Header lang={lang} onLanguageChange={setLang} />

      {/* Editorial Hero Section */}
      <Hero lang={lang} />

      {/* Live Collection Catalog */}
      <ProductCatalog lang={lang} />

      {/* Historic Boutique & Google Maps Location */}
      <StoryAndLocation lang={lang} />

      {/* Instagram Spotlight */}
      <InstagramSection lang={lang} />

      {/* Prestige Footer */}
      <Footer lang={lang} />

      {/* Floating Luxury WhatsApp Concierge Pill */}
      <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Subtle Tooltip for desktop */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#17120e]/95 border border-[#d4af37]/40 shadow-2xl backdrop-blur-md text-xs text-[#fbf8f3] pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-serif-luxury font-bold text-[#d4af37]">Mol Sac Concierge</span>
          <span className="text-[#e8e0d5]/60">• 0712-128124</span>
        </div>

        {/* Pulsing Button */}
        <a
          href="https://wa.me/212712128124?text=Salam%2C%20je%20vous%20contacte%20depuis%20le%20site%20officiel%20Mol%20Sac%20T%C3%A9touan"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center border-2 border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          title="Contacter sur WhatsApp"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
          <MessageCircle className="w-7 h-7 fill-white" />
        </a>
      </aside>
    </div>
  );
}
