import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Politique de Confidentialité | Mol Sac Tétouan",
  description: "Politique de confidentialité et protection des données personnelles de la boutique Mol Sac à Tétouan.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0d0a08] text-[#f7f2ea] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#e8b25c] hover:text-[#f3cc8a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>Retour à l&apos;accueil / العودة للرئيسية</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-[#2a221b] pb-8 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-8 h-8 text-[#e8b25c]" />
            <h1 className="text-3xl font-serif font-bold text-[#f7f2ea]">
              Politique de Confidentialité
            </h1>
          </div>
          <p className="text-sm text-[#baa998]">
            سياسة الخصوصية وحماية المعطيات ذات الطابع الشخصي — Derniere mise à jour : Novembre 2026
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-8 text-sm leading-relaxed text-[#dfd4c5]">
          {/* Section 1: Introduction */}
          <section className="bg-[#17120e] p-6 rounded-2xl border border-[#2a221b]">
            <h2 className="text-lg font-serif font-semibold text-[#f7f2ea] mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#e8b25c]" />
              1. Engagement de confidentialité / التزام الخصوصية
            </h2>
            <p className="mb-3">
              La boutique <strong>Mol Sac (مول الصاك)</strong>, située à Kissaria Al Hamama N°6, Tétouan, Maroc, s&apos;engage à protéger la vie privée de ses clients et des utilisateurs de son site web et de son application mobile.
            </p>
            <p dir="rtl" className="text-right text-[#baa998] font-arabic">
              تلتزم بوتيك <strong>مول الصاك</strong> بحماية خصوصية زبائنها ومستخدمي موقعها وتطبيقها الهاتفي، واحترام المعطيات الشخصية وفقاً لأعلى معايير الأمان والشفافية.
            </p>
          </section>

          {/* Section 2: Données collectées */}
          <section className="bg-[#17120e] p-6 rounded-2xl border border-[#2a221b]">
            <h2 className="text-lg font-serif font-semibold text-[#f7f2ea] mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#e8b25c]" />
              2. Données collectées / المعطيات المجمعة
            </h2>
            <p className="mb-3">
              Nous collectons uniquement les informations strictement nécessaires pour honorer vos réservations et vous offrir une expérience d&apos;achat sur-mesure :
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 text-[#baa998]">
              <li><strong>Nom et prénom</strong> (pour identifier votre réservation)</li>
              <li><strong>Numéro de téléphone / WhatsApp</strong> (pour confirmer la disponibilité et convenir du retrait ou de la livraison)</li>
              <li><strong>Adresse de livraison approximative ou ville</strong> (si livraison demandée)</li>
            </ul>
            <p className="text-xs text-[#e8b25c] bg-[#221a14] p-3 rounded-lg border border-[#e8b25c]/20">
              💳 <strong>Aucune donnée bancaire :</strong> Notre application ne collecte et ne stocke aucun numéro de carte bancaire. Les règlements s&apos;effectuent en espèces ou par virement lors du retrait en boutique ou à la livraison.
            </p>
          </section>

          {/* Section 3: Autorisations de l'application mobile */}
          <section className="bg-[#17120e] p-6 rounded-2xl border border-[#2a221b]">
            <h2 className="text-lg font-serif font-semibold text-[#f7f2ea] mb-3">
              3. Autorisations de l&apos;application mobile (App Store & Google Play)
            </h2>
            <p className="mb-3">
              L&apos;application mobile Mol Sac peut demander les accès suivants :
            </p>
            <ul className="list-disc list-inside space-y-1 text-[#baa998]">
              <li><strong>Localisation (GPS) :</strong> Optionnelle, uniquement pour vous guider via Google Maps jusqu&apos;à notre boutique à Kissaria Al Hamama, Tétouan.</li>
              <li><strong>Appareil photo / Galerie photos :</strong> Utilisée exclusivement par l&apos;équipe de la boutique pour photographier et publier les nouveautés sacs et chaussures en vitrine.</li>
            </ul>
          </section>

          {/* Section 4: Partage des données */}
          <section className="bg-[#17120e] p-6 rounded-2xl border border-[#2a221b]">
            <h2 className="text-lg font-serif font-semibold text-[#f7f2ea] mb-3">
              4. Partage et protection des données / عدم مشاركة البيانات
            </h2>
            <p className="mb-3">
              Vos informations personnelles <strong>ne sont jamais vendues, louées ou cédées</strong> à des tiers à des fins commerciales ou publicitaires. Elles sont stockées de façon sécurisée (Supabase PostgreSQL chiffré) et accessibles uniquement par la direction de Mol Sac.
            </p>
            <p dir="rtl" className="text-right text-[#baa998] font-arabic">
              لا نقوم أبداً ببيع أو مشاركة أو تأجير بياناتكم الشخصية مع أي طرف ثالث لأغراض تسويقية أو تجارية.
            </p>
          </section>

          {/* Section 5: Vos droits et Contact */}
          <section className="bg-[#17120e] p-6 rounded-2xl border border-[#2a221b]">
            <h2 className="text-lg font-serif font-semibold text-[#f7f2ea] mb-3 flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#e8b25c]" />
              5. Vos droits et contact / اتصل بنا
            </h2>
            <p className="mb-3">
              Conformément à la législation relative à la protection des données (loi marocaine 09-08), vous disposez à tout moment d&apos;un droit d&apos;accès, de rectification et de suppression de vos données personnelles.
            </p>
            <div className="space-y-2 mt-4 pt-4 border-t border-[#2a221b] text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#e8b25c]" />
                <span>Kissaria Al Hamama N°6, Tétouan, Maroc</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#e8b25c]" />
                <span>WhatsApp : +212 7 12 12 81 24</span>
              </div>
              <div>
                <span>Instagram : </span>
                <a
                  href="https://instagram.com/mol_sac44"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e8b25c] hover:underline"
                >
                  @mol_sac44
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-[#baa998] border-t border-[#2a221b] pt-6">
          <p>© {new Date().getFullYear()} Mol Sac (مول الصاك) — Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
}
