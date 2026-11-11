"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, MessageCircle, Shield, Sparkles, Heart } from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];

  return (
    <footer className="bg-[#080605] text-[#e8e0d5] border-t border-[#d4af37]/20 pt-16 pb-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        {/* Brand Identity */}
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#d4af37] bg-[#17120e] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Image src="/images/logo.png" alt="Mol Sac Logo" fill className="object-cover" />
            </div>
            <div>
              <span className="text-2xl font-bold font-serif-luxury tracking-[0.2em] text-[#fbf8f3] block">
                MOL SAC
              </span>
              <span className="text-sm text-[#d4af37] font-arabic-luxury font-bold">
                مول الصاك • تطوان
              </span>
            </div>
          </div>

          <p className="text-xs text-[#e8e0d5]/75 max-w-sm leading-relaxed font-light">
            {lang === "fr"
              ? "Maison de maroquinerie d'exception, souliers de prestige et accessoires de haute fantaisie. Située au cœur historique de Tétouan à Kissaria Al Hamama."
              : "دار متخصصة في بيع أجود الحقائب النسائية الفاخرة، الأحذية الراقية والإكسسوارات الملكية في قيسارية الحمامة بمدينة تطوان."}
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#d4af37]/30 text-[11px] text-[#d4af37]">
            <MapPin className="w-3.5 h-3.5" />
            <span>قيسارية الحمامة، محل رقم 6، تطوان 🇲🇦</span>
          </div>
        </div>

        {/* Contact & Hours */}
        <div className="md:col-span-4 space-y-3.5">
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
            {lang === "fr" ? "Contact & Visite" : "التواصل والموقع"}
          </h4>
          <ul className="space-y-2.5 text-xs text-[#e8e0d5]/80 font-light">
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
              <span>Kissariat Al Hamama, Magasin N° 6, Tétouan</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
              <a href="tel:+212712128124" className="hover:text-[#d4af37] transition-colors">
                0712-128124 (+212 712 128124)
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <a
                href="https://wa.me/212712128124"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300 font-medium transition-colors"
              >
                WhatsApp Direct : 0712-128124
              </a>
            </li>
            <li className="pt-1 text-[#d4af37] font-medium">
              {t.hours}
            </li>
          </ul>
        </div>

        {/* Quick Links & Admin */}
        <div className="md:col-span-3 space-y-3.5">
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
            {lang === "fr" ? "Navigation" : "روابط سريعة"}
          </h4>
          <ul className="space-y-2 text-xs font-light">
            <li>
              <a href="#catalog" className="hover:text-[#d4af37] transition-colors">
                {t.viewCollection}
              </a>
            </li>
            <li>
              <a href="#location" className="hover:text-[#d4af37] transition-colors">
                {t.findStore}
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/mol_sac44"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d4af37] transition-colors"
              >
                Instagram : @mol_sac44
              </a>
            </li>
            <li className="pt-3 border-t border-[#d4af37]/20">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 text-xs text-[#d4af37] hover:text-[#fff2cc] font-semibold transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{t.adminAccess} (Gérance)</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[#d4af37]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#e8e0d5]/50 gap-4">
        <p className="tracking-wider">© 2026 MOL SAC TÉTOUAN • TOUS DROITS RÉSERVÉS</p>
        <p className="flex items-center gap-1.5 text-[#c5a880]/80">
          <span>Créé avec élégance pour Kissaria Al Hamama N°6</span>
        </p>
      </div>
    </footer>
  );
}
