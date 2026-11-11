"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Plus,
  LogOut,
  Search,
  Clock,
  MessageCircle,
  Phone,
  Trash2,
  Edit,
  Loader2,
  Sparkles,
  Store,
} from "lucide-react";
import { Product, Order, OrderStatus } from "@/types";
import { getProductImage } from "@/lib/images";
import ProductFormModal from "@/components/admin/ProductFormModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

type AdminTab = "dashboard" | "products" | "orders";

export default function AdminPage() {
  const router = useRouter();

  // Authentication & Loading
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Active Tab for iPhone navigation
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  // Data
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Filters
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>("ALL");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("ALL");

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);

  // 1. Check Authentication on Mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const json = await res.json();
        if (!res.ok || !json.success) {
          router.replace("/admin/login");
          return;
        }
        setIsAuthLoading(false);
      } catch {
        router.replace("/admin/login");
      }
    }
    checkAuth();
  }, [router]);

  // 2. Fetch Data
  const loadData = useCallback(async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/orders"),
      ]);

      const productsJson = await productsRes.json();
      const ordersJson = await ordersRes.json();

      if (productsJson.success && Array.isArray(productsJson.data)) {
        setProducts(productsJson.data);
      }
      if (ordersJson.success && Array.isArray(ordersJson.data)) {
        setOrders(ordersJson.data);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    }
  }, []);

  useEffect(() => {
    if (!isAuthLoading) {
      loadData();
    }
  }, [isAuthLoading, loadData]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/admin/login");
    } catch {
      router.replace("/admin/login");
    }
  };

  // Toggle inStock directly from the list
  const handleToggleStock = async (product: Product) => {
    try {
      const newStockStatus = !product.inStock;
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inStock: newStockStatus }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, inStock: newStockStatus } : p))
        );
      }
    } catch (err) {
      console.error("Stock toggle error:", err);
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId: number, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error("Order update error:", err);
    }
  };

  // Delete Product
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeletingProduct(true);
    try {
      const res = await fetch(`/api/products/${productToDelete.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
        setProductToDelete(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setIsDeletingProduct(false);
    }
  };

  // Computed values
  const pendingOrders = orders.filter((o) => o.status === "PENDING");

  const filteredProducts = products.filter((p) => {
    const matchesCat = productCategoryFilter === "ALL" || p.category === productCategoryFilter;
    const matchesSearch =
      !productSearch.trim() ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.nameAr && p.nameAr.toLowerCase().includes(productSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === "ALL") return true;
    return o.status === orderStatusFilter;
  });

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#0d0a08] flex flex-col items-center justify-center text-[#d4af37]">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-widest uppercase">
          Espace Gérance Mol Sac Tétouan...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0a08] text-[#f6f3ee] pb-24 sm:pb-12">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#120e0b]/95 backdrop-blur-md text-[#f6f3ee] border-b border-[#d4af37]/25 px-4 py-3.5 shadow-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#d4af37] bg-black/40 shrink-0">
              <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-luxury font-bold text-base sm:text-lg text-[#fbf8f3] tracking-wider">
                  Mol Sac Admin
                </h1>
                <span className="text-[10px] bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/35 px-2 py-0.5 rounded-full font-bold uppercase">
                  iPhone Mode
                </span>
              </div>
              <p className="text-[11px] text-[#c5a880]/80">
                Kissaria Al Hamama N°6, Tétouan 🇲🇦
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#d4af37] border border-[#d4af37]/25 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Voir la boutique publique"
            >
              <Store className="w-4 h-4" />
              <span className="hidden sm:inline">Voir le site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sortir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* TAB 1: DASHBOARD (APERÇU) */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#17120e] via-[#221812] to-[#17120e] rounded-[32px] p-6 sm:p-8 text-[#f6f3ee] border border-[#d4af37]/35 shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-[#d4af37]/35 text-[#d4af37] text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tableau de Bord Direct • Tétouan</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#fbf8f3] tracking-wide">
                  Salam ! Bienvenue sur l&apos;espace de gérance
                </h2>
                <p className="text-xs sm:text-sm text-[#e8e0d5]/80 mt-1 max-w-xl font-light leading-relaxed">
                  Ajoutez vos nouveaux sacs et chaussures en direct depuis votre appareil photo iPhone et suivez les demandes des clientes.
                </p>

                {/* Big Action Button for iPhone */}
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setProductToEdit(null);
                      setIsProductModalOpen(true);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full bg-gold-metallic text-[#0d0a08] font-bold text-sm sm:text-base uppercase tracking-wider shadow-[0_10px_25px_rgba(212,175,55,0.3)] hover:opacity-95 transition-all cursor-pointer active:scale-95"
                  >
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                    <span>➕ Ajouter un nouveau produit (Photo 📸)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
              <div
                onClick={() => setActiveTab("products")}
                className="bg-[#17120e] p-5 rounded-2xl border border-[#d4af37]/25 shadow-lg cursor-pointer hover:border-[#d4af37] transition-all"
              >
                <div className="flex items-center justify-between text-xs text-[#c5a880] font-bold mb-1">
                  <span>Total Produits</span>
                  <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div className="text-3xl font-bold font-serif-luxury text-[#fbf8f3]">
                  {products.length}
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                  {products.filter((p) => p.inStock).length} en stock
                </div>
              </div>

              <div
                onClick={() => setActiveTab("orders")}
                className="bg-[#17120e] p-5 rounded-2xl border border-[#d4af37]/25 shadow-lg cursor-pointer hover:border-[#d4af37] transition-all relative overflow-hidden"
              >
                {pendingOrders.length > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                )}
                <div className="flex items-center justify-between text-xs text-[#c5a880] font-bold mb-1">
                  <span>En attente</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-bold font-serif-luxury text-amber-400">
                  {pendingOrders.length}
                </div>
                <div className="text-[11px] text-amber-300/80 font-semibold mt-1">
                  Nouvelles réservations
                </div>
              </div>

              <div
                onClick={() => setActiveTab("orders")}
                className="col-span-2 sm:col-span-1 bg-[#17120e] p-5 rounded-2xl border border-[#d4af37]/25 shadow-lg cursor-pointer hover:border-[#d4af37] transition-all"
              >
                <div className="flex items-center justify-between text-xs text-[#c5a880] font-bold mb-1">
                  <span>Total Commandes</span>
                  <ClipboardList className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div className="text-3xl font-bold font-serif-luxury text-[#fbf8f3]">
                  {orders.length}
                </div>
                <div className="text-[11px] text-[#e8e0d5]/60 font-semibold mt-1">
                  {orders.filter((o) => o.status === "DELIVERED").length} livrées
                </div>
              </div>
            </div>

            {/* Quick Pending Orders Feed */}
            <div className="bg-[#17120e] rounded-[28px] p-6 border border-[#d4af37]/25 shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <h3 className="font-bold text-base text-[#fbf8f3] font-serif-luxury">
                    Dernières demandes clients
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs text-[#d4af37] hover:underline font-bold cursor-pointer"
                >
                  Tout voir →
                </button>
              </div>

              {pendingOrders.length === 0 ? (
                <div className="text-center py-10 text-xs text-[#e8e0d5]/50">
                  Aucune nouvelle réservation en attente pour le moment.
                </div>
              ) : (
                <div className="space-y-3.5">
                  {pendingOrders.slice(0, 3).map((order) => {
                    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, "");
                    const waPhone = cleanPhone.startsWith("0")
                      ? "212" + cleanPhone.substring(1)
                      : cleanPhone;

                    return (
                      <div
                        key={order.id}
                        className="p-4 rounded-2xl bg-[#0f0b08] border border-[#d4af37]/25 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-14 h-14 rounded-xl overflow-hidden relative bg-black border border-[#d4af37]/30 shrink-0">
                            <Image
                              src={getProductImage(order.product?.images)}
                              alt={order.product?.name || "Article"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-[#fbf8f3]">
                              {order.customerName}
                            </div>
                            <div className="text-xs text-[#e8e0d5]/80">
                              {order.product?.name} •{" "}
                              <span className="font-bold text-[#d4af37]">
                                {order.product?.price} DH
                              </span>
                            </div>
                            {order.notes && (
                              <p className="text-[11px] text-amber-300/90 italic mt-0.5">
                                « {order.notes} »
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <a
                            href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                              `Salam ${order.customerName}, suite à votre demande pour l'article ${order.product?.name} chez Mol Sac Tétouan...`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, "CONFIRMED")}
                            className="px-3.5 py-2 rounded-xl bg-gold-metallic text-[#0d0a08] text-xs font-bold cursor-pointer"
                          >
                            Valider
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS (PRODUITS) */}
        {activeTab === "products" && (
          <div className="space-y-5">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#d4af37] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Rechercher un sac, soulier..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#17120e] border border-[#d4af37]/30 text-sm text-[#f6f3ee] placeholder-[#e8e0d5]/40 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center gap-2.5">
                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="px-4 py-3 rounded-2xl bg-[#17120e] border border-[#d4af37]/30 text-xs font-bold text-[#d4af37] focus:outline-none"
                >
                  <option value="ALL">Toutes les catégories</option>
                  <option value="SAC">👜 Sacs</option>
                  <option value="CHAUSSURE">👠 Chaussures</option>
                  <option value="ACCESSOIRE">💍 Accessoires</option>
                </select>

                <button
                  onClick={() => {
                    setProductToEdit(null);
                    setIsProductModalOpen(true);
                  }}
                  className="px-5 py-3 rounded-2xl bg-gold-metallic text-[#0d0a08] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap active:scale-95"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Ajouter</span>
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-[#17120e] rounded-3xl p-12 text-center text-xs text-[#e8e0d5]/60 border border-[#d4af37]/20">
                Aucun article trouvé.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#17120e] rounded-2xl p-4 border border-[#d4af37]/25 shadow-lg flex flex-col justify-between"
                  >
                    <div className="flex gap-3.5">
                      <div className="w-20 h-20 rounded-xl overflow-hidden relative bg-black border border-[#d4af37]/30 shrink-0">
                        <Image
                          src={getProductImage(product.images)}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/10 text-[#d4af37]">
                            {product.category}
                          </span>
                          <span className="text-base font-bold text-gold-gradient font-serif-luxury">
                            {product.price} DH
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-[#fbf8f3] truncate font-serif-luxury">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#c5a880]/70 truncate font-arabic-luxury" dir="rtl">
                          {product.nameAr}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-3 border-t border-[#d4af37]/15 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleStock(product)}
                        className={`text-[11px] font-bold px-3 py-1 rounded-full cursor-pointer transition-all ${
                          product.inStock
                            ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                            : "bg-rose-950/80 text-rose-300 border border-rose-500/40"
                        }`}
                      >
                        {product.inStock ? "● En stock" : "○ Épuisé"}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setProductToEdit(product);
                            setIsProductModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#d4af37] border border-[#d4af37]/30 text-xs font-semibold cursor-pointer"
                          title="Modifier"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setProductToDelete(product)}
                          className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-xs font-semibold cursor-pointer"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ORDERS (COMMANDES) */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {/* Status Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { key: "ALL", label: "Toutes" },
                { key: "PENDING", label: `En attente (${pendingOrders.length})` },
                { key: "CONFIRMED", label: "Confirmées" },
                { key: "SHIPPED", label: "Expédiées" },
                { key: "DELIVERED", label: "Livrées" },
                { key: "CANCELLED", label: "Annulées" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setOrderStatusFilter(tab.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    orderStatusFilter === tab.key
                      ? "bg-gold-metallic text-[#0d0a08] shadow-md font-bold"
                      : "bg-[#17120e] text-[#e8e0d5]/70 border border-[#d4af37]/25"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="bg-[#17120e] rounded-3xl p-12 text-center text-xs text-[#e8e0d5]/60 border border-[#d4af37]/20">
                Aucune commande dans cette catégorie.
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredOrders.map((order) => {
                  const cleanPhone = order.customerPhone.replace(/[^0-9]/g, "");
                  const waPhone = cleanPhone.startsWith("0")
                    ? "212" + cleanPhone.substring(1)
                    : cleanPhone;

                  return (
                    <div
                      key={order.id}
                      className="bg-[#17120e] rounded-2xl p-5 border border-[#d4af37]/25 shadow-lg space-y-3.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <div className="w-14 h-14 rounded-xl overflow-hidden relative bg-black border border-[#d4af37]/30 shrink-0">
                            <Image
                              src={getProductImage(order.product?.images)}
                              alt={order.product?.name || "Article"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-[#fbf8f3] font-serif-luxury">
                              {order.customerName}
                            </div>
                            <a
                              href={`tel:${order.customerPhone}`}
                              className="text-xs text-[#d4af37] font-semibold flex items-center gap-1 hover:underline mt-0.5"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{order.customerPhone}</span>
                            </a>
                            <div className="text-xs text-[#e8e0d5]/80 mt-1">
                              {order.product?.name} (Qté: {order.quantity}) •{" "}
                              <span className="font-bold text-gold-gradient font-serif-luxury">
                                {((order.product?.price || 0) * (order.quantity || 1))} DH
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                            order.status === "PENDING"
                              ? "bg-amber-950/80 text-amber-300 border border-amber-500/40"
                              : order.status === "CONFIRMED"
                              ? "bg-blue-950/80 text-blue-300 border border-blue-500/40"
                              : order.status === "DELIVERED"
                              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                              : "bg-gray-900 text-gray-400 border border-gray-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      {order.notes && (
                        <div className="text-xs bg-black/40 p-3 rounded-xl border border-[#d4af37]/20 text-[#e8e0d5]/80">
                          <span className="font-bold text-[#d4af37]">Remarque client : </span>
                          {order.notes}
                        </div>
                      )}

                      {/* Bottom Action Bar */}
                      <div className="pt-3 border-t border-[#d4af37]/15 flex flex-wrap items-center justify-between gap-2.5">
                        <a
                          href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                            `Salam ${order.customerName}, c'est Mol Sac Tétouan (Kissaria Al Hamama) concernant votre réservation de ${order.product?.name}...`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Client</span>
                        </a>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, "CONFIRMED")}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-[#d4af37]/30 hover:bg-white/10 text-[#d4af37] text-xs font-bold cursor-pointer"
                          >
                            Confirmer
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, "DELIVERED")}
                            className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold cursor-pointer"
                          >
                            Livré ✅
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, "CANCELLED")}
                            className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-bold cursor-pointer"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Action Button (FAB) on iPhone for quick Product Add */}
      <button
        onClick={() => {
          setProductToEdit(null);
          setIsProductModalOpen(true);
        }}
        className="sm:hidden fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-gold-metallic text-[#0d0a08] shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center border-2 border-white/40 active:scale-90 transition-all cursor-pointer"
        title="Ajouter un produit"
      >
        <Plus className="w-7 h-7 stroke-[2.5]" />
      </button>

      {/* Fixed iPhone Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#120e0b]/95 backdrop-blur-xl border-t border-[#d4af37]/25 px-4 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl transition-all cursor-pointer ${
            activeTab === "dashboard" ? "text-[#d4af37]" : "text-[#e8e0d5]/50"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Aperçu</span>
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={`flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl transition-all cursor-pointer ${
            activeTab === "products" ? "text-[#d4af37]" : "text-[#e8e0d5]/50"
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Produits</span>
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl transition-all relative cursor-pointer ${
            activeTab === "orders" ? "text-[#d4af37]" : "text-[#e8e0d5]/50"
          }`}
        >
          {pendingOrders.length > 0 && (
            <span className="absolute -top-1 right-2 bg-amber-400 text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-black">
              {pendingOrders.length}
            </span>
          )}
          <ClipboardList className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Commandes</span>
        </button>
      </nav>

      {/* Modals */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setProductToEdit(null);
        }}
        productToEdit={productToEdit}
        onSaved={loadData}
      />

      <DeleteConfirmModal
        isOpen={Boolean(productToDelete)}
        productName={productToDelete?.name || ""}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeletingProduct}
      />
    </div>
  );
}
