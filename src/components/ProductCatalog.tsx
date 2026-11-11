"use client";

import { useState, useEffect } from "react";
import { Search, Sparkles, RefreshCw, ShoppingBag, MessageCircle, X } from "lucide-react";
import { Product } from "@/types";
import { Language, translations } from "@/lib/translations";
import ProductCard from "./ProductCard";
import OrderModal from "./OrderModal";

interface ProductCatalogProps {
  lang: Language;
}

export default function ProductCatalog({ lang }: ProductCatalogProps) {
  const t = translations[lang];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Modal reservation state
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Erreur de chargement");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProducts(json.data);
      } else {
        setProducts([]);
      }
    } catch (err: any) {
      setError(err.message || "Impossible de charger les produits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    { key: "ALL", labelFr: "Tous les Articles", labelAr: "جميع المعروضات", icon: "✨" },
    { key: "SAC", labelFr: "Sacs à Main", labelAr: "حقائب راقية", icon: "👜" },
    { key: "CHAUSSURE", labelFr: "Souliers & Escarpins", labelAr: "أحذية وسهرات", icon: "👠" },
    { key: "ACCESSOIRE", labelFr: "Accessoires & Parures", labelAr: "إكسسوارات ومجوهرات", icon: "💍" },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "ALL" || p.category === selectedCategory;
    const matchesFeatured = !showFeaturedOnly || p.featured;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.nameAr && p.nameAr.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesFeatured && matchesSearch;
  });

  const handleOpenReserve = (product: Product) => {
    setSelectedProductForOrder(product);
    setIsOrderModalOpen(true);
  };

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-[#0d0a08] text-[#f6f3ee] px-4 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1612] border border-[#d4af37]/35 text-[#d4af37] text-xs font-semibold mb-4 tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{lang === "fr" ? "Collection Exclusive 2026" : "تشكيلة 2026 الحصرية"}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#fbf8f3] tracking-tight">
            {lang === "fr" ? "L'Art de la Maroquinerie" : "أرقى تشكيلات الحقائب والأحذية"}
          </h2>
          <p className="text-sm sm:text-base text-[#e8e0d5]/75 mt-3 max-w-xl mx-auto font-light leading-relaxed">
            {lang === "fr"
              ? "Chaque pièce est méticuleusement sélectionnée pour vous offrir raffinement, durabilité et prestance."
              : "كل قطعة تم انتقاؤها بعناية لتمنحكم تميزاً وفخامة تليق بإطلالتكم في كل مناسبة."}
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="space-y-5 mb-10 sm:mb-12">
          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-3 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              const label = lang === "ar" ? cat.labelAr : cat.labelFr;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-95 ${
                    isActive
                      ? "bg-gold-metallic text-[#0d0a08] shadow-[0_0_25px_rgba(212,175,55,0.35)] font-bold"
                      : "bg-[#17120e] text-[#e8e0d5]/80 border border-[#d4af37]/25 hover:border-[#d4af37]/60 hover:text-[#fbf8f3]"
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar & Quick Toggles */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-[#d4af37] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-11 pr-10 py-3.5 bg-[#17120e] rounded-full border border-[#d4af37]/30 text-xs sm:text-sm text-[#f6f3ee] placeholder-[#e8e0d5]/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#e8e0d5]/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Featured Only Pill */}
            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                showFeaturedOnly
                  ? "bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37]"
                  : "bg-[#17120e] border border-white/10 text-[#e8e0d5]/70 hover:border-[#d4af37]/40"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{lang === "fr" ? "Éditions Rares" : "المميز فقط"}</span>
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#c5a880]/70 mb-6 px-2">
          <span>
            {filteredProducts.length} {lang === "fr" ? "modèles disponibles à la boutique" : "قطعة متوفرة بالمحل"}
          </span>
          <button
            onClick={fetchProducts}
            className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors cursor-pointer"
            title="Actualiser la liste"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{lang === "fr" ? "Actualiser" : "تحديث"}</span>
          </button>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <RefreshCw className="w-10 h-10 animate-spin text-[#d4af37] mx-auto" />
            <p className="text-sm font-semibold tracking-widest text-[#d4af37] uppercase">
              {lang === "fr" ? "Chargement de la collection..." : "جاري تحميل التشكيلة..."}
            </p>
          </div>
        ) : error ? (
          <div className="py-16 text-center space-y-3 bg-[#17120e] rounded-3xl p-8 border border-rose-500/30 max-w-md mx-auto">
            <p className="text-sm text-rose-300">{error}</p>
            <button
              onClick={fetchProducts}
              className="px-6 py-2.5 rounded-full bg-[#d4af37] text-[#0d0a08] font-bold text-xs uppercase"
            >
              Réessayer
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-[#17120e] rounded-3xl p-10 border border-[#d4af37]/20 max-w-lg mx-auto">
            <ShoppingBag className="w-12 h-12 text-[#d4af37]/40 mx-auto" />
            <h3 className="font-serif-luxury text-lg text-[#fbf8f3]">
              {t.noProductsFound}
            </h3>
            <p className="text-xs text-[#e8e0d5]/60">
              {lang === "fr"
                ? "Essayez d'ajuster vos filtres ou contactez-nous directement sur WhatsApp pour vérifier un modèle."
                : "يرجى تغيير خيارات البحث أو التواصل معنا مباشرة عبر واتساب لمعرفة توفر الموديل المطلوب."}
            </p>
            <a
              href="https://wa.me/212712128124"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Demander sur WhatsApp</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                onReserve={handleOpenReserve}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reservation Drawer / Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        product={selectedProductForOrder}
        onClose={() => setIsOrderModalOpen(false)}
        lang={lang}
      />
    </section>
  );
}
