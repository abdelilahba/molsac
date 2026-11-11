"use client";

import { useState } from "react";
import Image from "next/image";
import { X, CheckCircle, MessageCircle, ShoppingBag, Loader2, Phone, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { Language, translations } from "@/lib/translations";
import { getProductImage } from "@/lib/images";

interface OrderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function OrderModal({ product, isOpen, onClose, lang }: OrderModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !product) return null;

  const t = translations[lang];
  const productName = lang === "ar" && product.nameAr ? product.nameAr : product.name;
  const imageUrl = getProductImage(product.images);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMsg(lang === "fr" ? "Veuillez renseigner votre nom et numéro de téléphone." : "يرجى كتابة الاسم ورقم الهاتف.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          productId: product.id,
          quantity: 1,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur lors de la réservation");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || (lang === "fr" ? "Impossible d'enregistrer la réservation. Contactez-nous par WhatsApp." : "تعذر تسجيل الحجز، تواصل معنا عبر واتساب"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setErrorMsg("");
    setCustomerName("");
    setCustomerPhone("");
    setNotes("");
    onClose();
  };

  const getWhatsAppConfirmationUrl = () => {
    const textFr = `Salam, je viens de réserver l'article "${product.name}" (${product.price} DH) chez Mol Sac Tétouan.\n• Nom : ${customerName}\n• Tél : ${customerPhone}${notes ? `\n• Remarque : ${notes}` : ""}\nPouvez-vous me confirmer sa mise de côté à Kissaria Al Hamama ?`;
    const textAr = `السلام عليكم، لقد حجزت للتو "${product.nameAr || product.name}" (${product.price} درهم) في محل مول الصاك بتطوان.\n• الاسم: ${customerName}\n• الهاتف: ${customerPhone}${notes ? `\n• ملاحظة: ${notes}` : ""}\nهل يمكنكم تأكيد تجهيزه بقيسارية الحمامة ؟`;
    const message = lang === "ar" ? textAr : textFr;
    return `https://wa.me/212712128124?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#17120e] border border-[#d4af37]/40 rounded-[32px] shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden text-[#f6f3ee] max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#120e0b] text-[#f6f3ee] p-5 sm:p-6 flex items-center justify-between border-b border-[#d4af37]/25">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/15 flex items-center justify-center text-[#d4af37]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-serif-luxury text-[#fbf8f3] tracking-wide">
                {isSuccess ? t.reservationSuccessTitle : t.orderModalTitle}
              </h3>
              <p className="text-[11px] text-[#c5a880] tracking-wider uppercase font-light">
                Mol Sac • Kissaria Al Hamama N°6
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-full text-[#c5a880] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-5">
          {isSuccess ? (
            <div className="text-center py-4 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-bold font-serif-luxury text-[#fbf8f3] mb-2">
                  {lang === "fr" ? "Réservation Enregistrée !" : "تم تسجيل حجزك بنجاح !"}
                </h4>
                <p className="text-sm text-[#e8e0d5]/80 leading-relaxed max-w-md mx-auto font-light">
                  {t.reservationSuccessDesc}
                </p>
              </div>

              {/* Product summary card */}
              <div className="bg-[#120e0b] border border-[#d4af37]/30 rounded-2xl p-4 flex items-center gap-4 text-left">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#d4af37]/40 flex-shrink-0 bg-black">
                  <Image src={imageUrl} alt={productName} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-sm text-[#fbf8f3] truncate font-serif-luxury">{productName}</h5>
                  <p className="text-xs text-[#d4af37] font-bold mt-0.5">{product.price} {t.dh}</p>
                  <p className="text-[11px] text-[#e8e0d5]/60 mt-0.5 truncate">
                    Client: {customerName} ({customerPhone})
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 space-y-3">
                <a
                  href={getWhatsAppConfirmationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{t.whatsappConfirmButton}</span>
                </a>

                <button
                  onClick={resetAndClose}
                  className="w-full px-4 py-2.5 rounded-full text-xs font-semibold text-[#c5a880] hover:text-white transition-colors cursor-pointer"
                >
                  {t.close}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product mini preview banner */}
              <div className="bg-[#120e0b] border border-[#d4af37]/30 rounded-2xl p-4 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#d4af37]/40 flex-shrink-0 bg-black">
                  <Image src={imageUrl} alt={productName} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                    {product.category}
                  </span>
                  <h5 className="font-bold text-sm text-[#fbf8f3] truncate font-serif-luxury">{productName}</h5>
                  <span className="text-base font-bold font-serif-luxury text-gold-gradient">
                    {product.price} {t.dh}
                  </span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-xs text-rose-200">
                  {errorMsg}
                </div>
              )}

              {/* Form inputs */}
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1.5">
                    {t.yourName} <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={lang === "fr" ? "Ex: Fatima Zahra" : "مثال: فاطمة الزهراء"}
                    className="w-full px-4 py-3 rounded-2xl border border-[#d4af37]/30 bg-[#0d0a08] text-sm text-[#f6f3ee] placeholder-[#e8e0d5]/30 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{t.yourPhone}</span>
                    <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="06 XX XX XX XX / 07 XX XX XX XX"
                    className="w-full px-4 py-3 rounded-2xl border border-[#d4af37]/30 bg-[#0d0a08] text-sm text-[#f6f3ee] placeholder-[#e8e0d5]/30 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1.5">
                    {t.notes}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={lang === "fr" ? "Couleur souhaitée, passage demain au magasin..." : "اللون، موعد الحضور للمحل..."}
                    className="w-full px-4 py-3 rounded-2xl border border-[#d4af37]/30 bg-[#0d0a08] text-sm text-[#f6f3ee] placeholder-[#e8e0d5]/30 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-gold-metallic text-[#0d0a08] shadow-[0_5px_20px_rgba(212,175,55,0.3)] hover:opacity-95 transition-all cursor-pointer disabled:opacity-40"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.submitting}</span>
                    </>
                  ) : (
                    <span>{t.submitReservation}</span>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#e8e0d5]/50">
                  {lang === "fr" ? "Paiement sur place à Kissaria Al Hamama N°6 ou à la livraison." : "الدفع عند الاستلام بالمحل بقيسارية الحمامة أو مع التوصيل."}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
