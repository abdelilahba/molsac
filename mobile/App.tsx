import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  TextInput,
  Modal,
  Alert,
  Dimensions,
  Platform,
} from "react-native";
import { theme } from "./src/theme";
import { fetchProducts, submitOrder, MobileProduct } from "./src/api/client";
import { DEFAULT_STORIES, MobileStory } from "./src/data/defaultProducts";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type NavTab = "home" | "catalog" | "favorites" | "boutique";
type Language = "fr" | "ar";

export default function App() {
  const [lang, setLang] = useState<Language>("ar");
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [products, setProducts] = useState<MobileProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  // Story modal state
  const [activeStory, setActiveStory] = useState<MobileStory | null>(null);

  // Product detail modal state
  const [selectedProduct, setSelectedProduct] = useState<MobileProduct | null>(null);

  // Reservation modal state
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reserveName, setReserveName] = useState("");
  const [reservePhone, setReservePhone] = useState("");
  const [reserveNotes, setReserveNotes] = useState("");
  const [isSubmittingReserve, setIsSubmittingReserve] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleFavorite = (id: number | string) => {
    const numId = Number(id);
    setFavorites((prev) =>
      prev.includes(numId) ? prev.filter((item) => item !== numId) : [...prev, numId]
    );
  };

  const openWhatsApp = (productName?: string, price?: number) => {
    let msg =
      lang === "ar"
        ? "السلام عليكم، أتواصل معكم عبر تطبيق مول الصاك بتطوان."
        : "Salam, je vous contacte depuis l'application officielle Mol Sac Tétouan.";
    if (productName && price) {
      msg =
        lang === "ar"
          ? `السلام عليكم، أرغب في طلب هذا الموديل من محل مول الصاك بتطوان:\n• الموديل : ${productName}\n• الثمن : ${price} درهم\nهل هو متوفر حالياً بقيسارية الحمامة ؟`
          : `Salam, je souhaite commander cet article chez Mol Sac Tétouan :\n• Modèle : ${productName}\n• Prix : ${price} DH\nEst-il disponible à Kissaria Al Hamama ?`;
    }
    const url = `whatsapp://send?phone=212712128124&text=${encodeURIComponent(msg)}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(`https://wa.me/212712128124?text=${encodeURIComponent(msg)}`);
      }
    });
  };

  const openGoogleMaps = () => {
    const query = encodeURIComponent("Kissariat Al Hamama, Tetouan");
    const url = Platform.select({
      ios: `maps:0,0?q=${query}`,
      android: `geo:0,0?q=${query}`,
      default: `https://maps.google.com/?q=${query}`,
    });
    Linking.openURL(url);
  };

  const handleReserveSubmit = async () => {
    if (!reserveName.trim() || !reservePhone.trim()) {
      Alert.alert(
        lang === "ar" ? "تنبيه" : "Champ manquant",
        lang === "ar" ? "يرجى كتابة الاسم ورقم الهاتف" : "Veuillez renseigner votre nom et votre numéro."
      );
      return;
    }

    if (!selectedProduct) return;

    setIsSubmittingReserve(true);
    const success = await submitOrder({
      customerName: reserveName.trim(),
      customerPhone: reservePhone.trim(),
      productId: selectedProduct.id,
      notes: reserveNotes.trim() || undefined,
    });
    setIsSubmittingReserve(false);

    if (success) {
      Alert.alert(
        lang === "ar" ? "تم الحجز بنجاح ! 🎉" : "Réservation Confirmée ! 🎉",
        lang === "ar"
          ? "تم حجز طلبك بنجاح. سنقوم بتجهيزه لك في قيسارية الحمامة محل رقم 6."
          : "Votre réservation a été transmise à la boutique (Kissaria Al Hamama N°6)."
      );
      setIsReserveModalOpen(false);
      setReserveName("");
      setReservePhone("");
      setReserveNotes("");
    } else {
      Alert.alert(
        "Erreur",
        lang === "ar"
          ? "تعذر إرسال الحجز، يمكنك التواصل معنا مباشرة عبر واتساب."
          : "Impossible d'envoyer la réservation. Contactez-nous par WhatsApp."
      );
    }
  };

  const filtered = products.filter((p) => {
    const matchCat = selectedCategory === "ALL" || p.category === selectedCategory;
    const matchSearch =
      !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.nameAr && p.nameAr.includes(search));
    return matchCat && matchSearch;
  });

  const favoriteProducts = products.filter((p) => favorites.includes(Number(p.id)));

  const getProductImg = (imagesStr: string) => {
    try {
      if (imagesStr.startsWith("[")) {
        const arr = JSON.parse(imagesStr);
        return arr[0] || "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800";
      }
      return imagesStr || "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800";
    } catch {
      return "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0a08" />

      {/* Top Luxury Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=150&q=80",
            }}
            style={styles.logoImage}
          />
          <View>
            <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6 }}>
              <Text style={styles.brandTitle}>MOL SAC</Text>
              <Text style={styles.brandArabic}>مول الصاك</Text>
            </View>
            <Text style={styles.brandSubtitle}>Kissaria Al Hamama N°6, Tétouan 🇲🇦</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {/* Language Toggle */}
          <TouchableOpacity
            style={styles.langBtn}
            onPress={() => setLang(lang === "fr" ? "ar" : "fr")}
            activeOpacity={0.8}
          >
            <Text style={styles.langText}>{lang === "fr" ? "العربية" : "FR"}</Text>
          </TouchableOpacity>

          {/* WhatsApp Action */}
          <TouchableOpacity
            style={styles.headerWaBtn}
            onPress={() => openWhatsApp()}
            activeOpacity={0.8}
          >
            <Text style={styles.headerWaText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content by Active Tab */}
      {activeTab === "home" && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Stories Horizontal Reel */}
          <View style={styles.storiesContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.storiesSectionTitle}>
                {lang === "ar" ? "✨ ستوريات وجديد الأسبوع" : "✨ Stories & Nouveautés"}
              </Text>
              <Text style={styles.storiesBadge}>
                {lang === "ar" ? "مباشرة من المحل" : "En direct de Tétouan"}
              </Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesScroll}>
              {DEFAULT_STORIES.map((story) => (
                <TouchableOpacity
                  key={story.id}
                  style={styles.storyCircleWrapper}
                  onPress={() => setActiveStory(story)}
                  activeOpacity={0.85}
                >
                  <View style={styles.storyRing}>
                    <Image source={{ uri: story.image }} style={styles.storyThumb} />
                  </View>
                  <Text style={styles.storyTitle} numberOfLines={1}>
                    {lang === "ar" ? story.titleAr : story.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Editorial Hero Banner */}
          <View style={styles.heroBanner}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>
                {lang === "ar" ? "تشكيلة حصرية 2026" : "COLLECTION EXCLUSIVE 2026"}
              </Text>
            </View>
            <Text style={styles.heroTitle}>
              {lang === "ar" ? "الأناقة بروح تطوانية راقية" : "L'Élégance à la Tétouanaise"}
            </Text>
            <Text style={styles.heroSub}>
              {lang === "ar"
                ? "أرقى تشكيلات الحقائب الجلدية، الأحذية الفاخرة والمجوهرات في قلب تطوان."
                : "Sacs de luxe, souliers d'exception et maroquinerie haut de gamme à Kissaria Al Hamama."}
            </Text>

            <TouchableOpacity
              style={styles.heroCta}
              onPress={() => setActiveTab("catalog")}
              activeOpacity={0.9}
            >
              <Text style={styles.heroCtaText}>
                {lang === "ar" ? "اكتشفوا التشكيلة الكاملة" : "Découvrir la Collection"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Masterpiece of the Week */}
          <View style={styles.masterpieceCard}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
              }}
              style={styles.masterpieceImg}
            />
            <View style={styles.masterpieceOverlay}>
              <View style={styles.masterpieceBadge}>
                <Text style={styles.masterpieceBadgeText}>
                  {lang === "ar" ? "⭐ تحفة الأسبوع" : "⭐ PIÈCE MAÎTRESSE"}
                </Text>
              </View>
              <Text style={styles.masterpieceName}>
                {lang === "ar" ? "حقيبة سوداء ملكية بسلسلة ذهبية" : "Sac Bandoulière Matelassé Noir"}
              </Text>
              <View style={styles.masterpiecePriceRow}>
                <Text style={styles.masterpiecePrice}>420 DH</Text>
                <TouchableOpacity
                  style={styles.masterpieceBuyBtn}
                  onPress={() => openWhatsApp("Sac Bandoulière Matelassé Noir", 420)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.masterpieceBuyText}>
                    {lang === "ar" ? "طلب فوري" : "Réserver"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Quick Pillars */}
          <View style={styles.pillarsGrid}>
            <View style={styles.pillarItem}>
              <Text style={styles.pillarIcon}>👜</Text>
              <Text style={styles.pillarTitle}>{lang === "ar" ? "جلد رفيع" : "Maroquinerie"}</Text>
              <Text style={styles.pillarSub}>{lang === "ar" ? "جودة عالية" : "Finitions soignées"}</Text>
            </View>
            <View style={styles.pillarItem}>
              <Text style={styles.pillarIcon}>📍</Text>
              <Text style={styles.pillarTitle}>{lang === "ar" ? "محل رقم 6" : "Kissaria N°6"}</Text>
              <Text style={styles.pillarSub}>{lang === "ar" ? "تطوان 🇲🇦" : "Tétouan 🇲🇦"}</Text>
            </View>
            <View style={styles.pillarItem}>
              <Text style={styles.pillarIcon}>🚚</Text>
              <Text style={styles.pillarTitle}>{lang === "ar" ? "توصيل سريع" : "Livraison"}</Text>
              <Text style={styles.pillarSub}>{lang === "ar" ? "كافة المدن" : "Tout le Maroc"}</Text>
            </View>
          </View>
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {activeTab === "catalog" && (
        <View style={{ flex: 1 }}>
          {/* Search Toolbar */}
          <View style={styles.searchBox}>
            <TextInput
              style={styles.searchInput}
              placeholder={lang === "ar" ? "ابحث عن حقيبة، حذاء، إكسسوار..." : "Rechercher un sac, soulier, bijou..."}
              placeholderTextColor="#8e8275"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* Category Chips */}
          <View style={{ height: 50 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
              {[
                { id: "ALL", label: lang === "ar" ? "الكل ✨" : "Tous ✨" },
                { id: "SAC", label: lang === "ar" ? "حقائب 👜" : "Sacs 👜" },
                { id: "CHAUSSURE", label: lang === "ar" ? "أحذية 👠" : "Souliers 👠" },
                { id: "ACCESSOIRE", label: lang === "ar" ? "إكسسوار 💍" : "Bijoux 💍" },
              ].map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catChip, selectedCategory === cat.id && styles.catChipActive]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Text style={[styles.catChipText, selectedCategory === cat.id && styles.catChipTextActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Product Grid */}
          {loading ? (
            <ActivityIndicator color={theme.colors.gold} size="large" style={{ marginTop: 60 }} />
          ) : (
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              <View style={styles.productGrid}>
                {filtered.map((item) => {
                  const isFav = favorites.includes(Number(item.id));
                  const imgUri = getProductImg(item.images);

                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.productCard}
                      onPress={() => setSelectedProduct(item)}
                      activeOpacity={0.88}
                    >
                      <View style={styles.productImgContainer}>
                        <Image source={{ uri: imgUri }} style={styles.productImg} />
                        {/* Favorite Heart Button */}
                        <TouchableOpacity
                          style={styles.favBadge}
                          onPress={() => toggleFavorite(item.id)}
                        >
                          <Text style={{ fontSize: 16 }}>{isFav ? "❤️" : "🤍"}</Text>
                        </TouchableOpacity>

                        {/* In stock badge */}
                        <View style={styles.stockBadge}>
                          <Text style={styles.stockBadgeText}>
                            {lang === "ar" ? "متوفر بالمحل" : "En stock N°6"}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.productInfo}>
                        <Text style={styles.productName} numberOfLines={1}>
                          {lang === "ar" && item.nameAr ? item.nameAr : item.name}
                        </Text>
                        <Text style={styles.priceVal}>{item.price} DH</Text>

                        {/* WhatsApp 1-tap Button */}
                        <TouchableOpacity
                          style={styles.cardWaBtn}
                          onPress={() => openWhatsApp(item.name, item.price)}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.cardWaText}>
                            {lang === "ar" ? "طلب عبر واتساب" : "WhatsApp"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={{ height: 40 }} />
            </ScrollView>
          )}
        </View>
      )}

      {activeTab === "favorites" && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.favHeaderBox}>
            <Text style={styles.favTitle}>
              {lang === "ar" ? "❤️ قائمة المفضلة" : "❤️ Mes Modèles Coups de Cœur"}
            </Text>
            <Text style={styles.favSub}>
              {lang === "ar"
                ? "احفظي الحقائب المفضلة لديكِ لإظهارها في المحل بقيسارية الحمامة."
                : "Vos pièces sauvegardées pour votre prochaine visite au magasin N°6."}
            </Text>
          </View>

          {favoriteProducts.length === 0 ? (
            <View style={styles.emptyFavBox}>
              <Text style={{ fontSize: 44, marginBottom: 12 }}>👜</Text>
              <Text style={styles.emptyFavTitle}>
                {lang === "ar" ? "قائمتك فارغة حالياً" : "Aucun article favori pour le moment"}
              </Text>
              <Text style={styles.emptyFavSub}>
                {lang === "ar"
                  ? "تصفحي التشكيلة واضغطي على رمز القلب ❤️ لحفظ حقائبك المفضلة."
                  : "Parcourez notre collection et touchez le cœur ❤️ pour sauvegarder vos pièces."}
              </Text>
              <TouchableOpacity
                style={styles.browseBtn}
                onPress={() => setActiveTab("catalog")}
              >
                <Text style={styles.browseBtnText}>
                  {lang === "ar" ? "تصفح التشكيلة" : "Voir le catalogue"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.productGrid}>
              {favoriteProducts.map((item) => (
                <View key={item.id} style={styles.productCard}>
                  <Image source={{ uri: getProductImg(item.images) }} style={styles.productImg} />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={1}>
                      {lang === "ar" && item.nameAr ? item.nameAr : item.name}
                    </Text>
                    <Text style={styles.priceVal}>{item.price} DH</Text>
                    <TouchableOpacity
                      style={styles.cardWaBtn}
                      onPress={() => openWhatsApp(item.name, item.price)}
                    >
                      <Text style={styles.cardWaText}>
                        {lang === "ar" ? "طلب الآن" : "Réserver"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {activeTab === "boutique" && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Boutique Hero Card */}
          <View style={styles.boutiqueHeroCard}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80",
              }}
              style={styles.boutiqueImg}
            />
            <View style={styles.boutiqueHeroOverlay}>
              <Text style={styles.boutiqueHeroTitle}>MOL SAC • مول الصاك</Text>
              <Text style={styles.boutiqueHeroSub}>Kissaria Al Hamama, Magasin N°6, Tétouan 🇲🇦</Text>
            </View>
          </View>

          {/* Info Cards */}
          <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>{lang === "ar" ? "📍 العنوان" : "📍 ADRESSE"}</Text>
            <Text style={styles.infoCardMain}>قيسارية الحمامة، محل رقم 6</Text>
            <Text style={styles.infoCardDetail}>Au cœur de la médina commerçante de Tétouan</Text>
            <TouchableOpacity style={styles.gpsBtn} onPress={openGoogleMaps} activeOpacity={0.85}>
              <Text style={styles.gpsBtnText}>
                {lang === "ar" ? "🗺️ فتح خريطة GPS (Maps)" : "🗺️ Ouvrir dans Google Maps"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>{lang === "ar" ? "🕒 مواعيد الاستقبال" : "🕒 HORAIRES"}</Text>
            <Text style={styles.infoCardMain}>
              {lang === "ar" ? "مفتوح يومياً (7 أيام / 7)" : "Ouvert 7 jours sur 7"}
            </Text>
            <Text style={styles.infoCardDetail}>10:00 - 21:30 (Accueil chaleureux garanti)</Text>
          </View>

          <View style={styles.boutiqueActionsGrid}>
            <TouchableOpacity
              style={[styles.boutiqueActionBtn, { backgroundColor: "#10b981" }]}
              onPress={() => openWhatsApp()}
            >
              <Text style={styles.boutiqueActionText}>💬 WhatsApp Direct</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.boutiqueActionBtn, { backgroundColor: "#1f1813", borderColor: theme.colors.gold, borderWidth: 1 }]}
              onPress={() => Linking.openURL("tel:+212712128124")}
            >
              <Text style={[styles.boutiqueActionText, { color: theme.colors.gold }]}>📞 0712-128124</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.instaBanner}
            onPress={() => Linking.openURL("https://instagram.com/mol_sac44")}
          >
            <Text style={styles.instaBannerText}>📸 Suivez-nous sur Instagram @mol_sac44</Text>
          </TouchableOpacity>
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {/* Bottom Luxury Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("home")}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 20 }}>🏠</Text>
          <Text style={[styles.navText, activeTab === "home" && styles.navTextActive]}>
            {lang === "ar" ? "الرئيسية" : "Accueil"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("catalog")}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 20 }}>👜</Text>
          <Text style={[styles.navText, activeTab === "catalog" && styles.navTextActive]}>
            {lang === "ar" ? "التشكيلة" : "Collection"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("favorites")}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 20 }}>❤️</Text>
          <Text style={[styles.navText, activeTab === "favorites" && styles.navTextActive]}>
            {lang === "ar" ? "المفضلة" : "Favoris"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("boutique")}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 20 }}>📍</Text>
          <Text style={[styles.navText, activeTab === "boutique" && styles.navTextActive]}>
            {lang === "ar" ? "المحل" : "Boutique"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 1. Fullscreen Story Modal */}
      {activeStory && (
        <Modal visible animationType="fade" transparent onRequestClose={() => setActiveStory(null)}>
          <View style={styles.storyModalOverlay}>
            <Image source={{ uri: activeStory.image }} style={styles.storyFullImg} />
            <View style={styles.storyModalHeader}>
              <View>
                <Text style={styles.storyModalBadge}>
                  {lang === "ar" ? activeStory.tagAr : activeStory.tag}
                </Text>
                <Text style={styles.storyModalTitle}>
                  {lang === "ar" ? activeStory.titleAr : activeStory.title}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.storyCloseBtn}
                onPress={() => setActiveStory(null)}
              >
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.storyModalFooter}>
              <Text style={styles.storyModalCaption}>
                {lang === "ar" ? activeStory.captionAr : activeStory.caption}
              </Text>
              {activeStory.price ? (
                <Text style={styles.storyModalPrice}>{activeStory.price}</Text>
              ) : null}

              <TouchableOpacity
                style={styles.storyWaBtn}
                onPress={() => {
                  openWhatsApp(activeStory.title);
                  setActiveStory(null);
                }}
              >
                <Text style={styles.storyWaBtnText}>
                  {lang === "ar" ? "💬 طلب عبر واتساب" : "💬 Commander sur WhatsApp"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* 2. Product Detail Modal */}
      {selectedProduct && (
        <Modal visible animationType="slide" transparent onRequestClose={() => setSelectedProduct(null)}>
          <View style={styles.detailModalOverlay}>
            <View style={styles.detailModalCard}>
              <Image source={{ uri: getProductImg(selectedProduct.images) }} style={styles.detailImg} />
              <TouchableOpacity
                style={styles.detailCloseBtn}
                onPress={() => setSelectedProduct(null)}
              >
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>✕</Text>
              </TouchableOpacity>

              <View style={styles.detailInfoBox}>
                <Text style={styles.detailName}>
                  {lang === "ar" && selectedProduct.nameAr ? selectedProduct.nameAr : selectedProduct.name}
                </Text>
                <Text style={styles.detailPrice}>{selectedProduct.price} DH</Text>
                <Text style={styles.detailDesc}>
                  {lang === "ar" && selectedProduct.descriptionAr
                    ? selectedProduct.descriptionAr
                    : selectedProduct.description || "Maroquinerie de prestige Kissaria Al Hamama N°6, Tétouan."}
                </Text>

                <View style={styles.detailBtnRow}>
                  <TouchableOpacity
                    style={[styles.detailActionBtn, { backgroundColor: "#10b981" }]}
                    onPress={() => {
                      openWhatsApp(selectedProduct.name, selectedProduct.price);
                      setSelectedProduct(null);
                    }}
                  >
                    <Text style={styles.detailActionText}>WhatsApp Direct</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.detailActionBtn, { backgroundColor: theme.colors.gold }]}
                    onPress={() => {
                      setIsReserveModalOpen(true);
                    }}
                  >
                    <Text style={[styles.detailActionText, { color: "#0d0a08" }]}>
                      {lang === "ar" ? "حجز بالمحل" : "Réserver"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* 3. In-Store Reservation Modal */}
      {isReserveModalOpen && selectedProduct && (
        <Modal visible animationType="fade" transparent onRequestClose={() => setIsReserveModalOpen(false)}>
          <View style={styles.reserveOverlay}>
            <View style={styles.reserveCard}>
              <Text style={styles.reserveTitle}>
                {lang === "ar" ? "حجز في المحل (تطوان)" : "Réserver à Kissaria Al Hamama"}
              </Text>
              <Text style={styles.reserveSubtitle}>
                {selectedProduct.name} • {selectedProduct.price} DH
              </Text>

              <TextInput
                style={styles.reserveInput}
                placeholder={lang === "ar" ? "الاسم الكامل" : "Votre Nom Complet"}
                placeholderTextColor="#8e8275"
                value={reserveName}
                onChangeText={setReserveName}
              />

              <TextInput
                style={styles.reserveInput}
                placeholder={lang === "ar" ? "رقم الهاتف (واتساب)" : "Numéro de Téléphone (WhatsApp)"}
                placeholderTextColor="#8e8275"
                keyboardType="phone-pad"
                value={reservePhone}
                onChangeText={setReservePhone}
              />

              <TextInput
                style={styles.reserveInput}
                placeholder={lang === "ar" ? "ملاحظة (اختياري)" : "Remarque (ex: passage à 17h)"}
                placeholderTextColor="#8e8275"
                value={reserveNotes}
                onChangeText={setReserveNotes}
              />

              <View style={styles.reserveBtnRow}>
                <TouchableOpacity
                  style={styles.reserveCancelBtn}
                  onPress={() => setIsReserveModalOpen(false)}
                >
                  <Text style={styles.reserveCancelText}>{lang === "ar" ? "إلغاء" : "Annuler"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.reserveConfirmBtn}
                  onPress={handleReserveSubmit}
                  disabled={isSubmittingReserve}
                >
                  {isSubmittingReserve ? (
                    <ActivityIndicator color="#0d0a08" size="small" />
                  ) : (
                    <Text style={styles.reserveConfirmText}>
                      {lang === "ar" ? "تأكيد الحجز" : "Confirmer"}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0a08",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212, 175, 55, 0.2)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f0b08",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: theme.colors.gold,
  },
  brandTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  brandArabic: {
    color: theme.colors.gold,
    fontSize: 13,
    fontWeight: "bold",
  },
  brandSubtitle: {
    color: "#c5a880",
    fontSize: 10,
  },
  langBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "#1c1612",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.35)",
  },
  langText: {
    color: theme.colors.gold,
    fontSize: 11,
    fontWeight: "bold",
  },
  headerWaBtn: {
    backgroundColor: "#10b981",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  headerWaText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  // Stories
  storiesContainer: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212, 175, 55, 0.15)",
    backgroundColor: "#0a0706",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  storiesSectionTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  storiesBadge: {
    color: theme.colors.gold,
    fontSize: 10,
    fontWeight: "600",
  },
  storiesScroll: {
    paddingLeft: 12,
  },
  storyCircleWrapper: {
    alignItems: "center",
    marginRight: 14,
    width: 70,
  },
  storyRing: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: theme.colors.gold,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  storyThumb: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  storyTitle: {
    color: "#e8e0d5",
    fontSize: 10,
    marginTop: 4,
    textAlign: "center",
  },
  // Hero Banner
  heroBanner: {
    margin: 16,
    padding: 20,
    borderRadius: 22,
    backgroundColor: "#16110d",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  heroBadgeText: {
    color: theme.colors.gold,
    fontSize: 9,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  heroSub: {
    color: "#c5a880",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  heroCta: {
    backgroundColor: theme.colors.gold,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
  },
  heroCtaText: {
    color: "#0d0a08",
    fontSize: 12,
    fontWeight: "bold",
  },
  // Masterpiece
  masterpieceCard: {
    marginHorizontal: 16,
    borderRadius: 22,
    overflow: "hidden",
    height: 240,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
  },
  masterpieceImg: {
    width: "100%",
    height: "100%",
  },
  masterpieceOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(13, 10, 8, 0.85)",
  },
  masterpieceBadge: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 4,
  },
  masterpieceBadgeText: {
    color: "#0d0a08",
    fontSize: 9,
    fontWeight: "bold",
  },
  masterpieceName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },
  masterpiecePriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  masterpiecePrice: {
    color: theme.colors.gold,
    fontSize: 18,
    fontWeight: "bold",
  },
  masterpieceBuyBtn: {
    backgroundColor: "#10b981",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 14,
  },
  masterpieceBuyText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  // Pillars
  pillarsGrid: {
    flexDirection: "row",
    marginHorizontal: 16,
    gap: 10,
  },
  pillarItem: {
    flex: 1,
    backgroundColor: "#16110d",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.15)",
  },
  pillarIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  pillarTitle: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  pillarSub: {
    color: "#8e8275",
    fontSize: 9,
    marginTop: 2,
  },
  // Search
  searchBox: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchInput: {
    backgroundColor: "#16110d",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "#fff",
    fontSize: 13,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.25)",
  },
  catScroll: {
    paddingHorizontal: 16,
  },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#16110d",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  catChipActive: {
    backgroundColor: theme.colors.gold,
    borderColor: theme.colors.gold,
  },
  catChipText: {
    color: "#c5a880",
    fontSize: 12,
    fontWeight: "600",
  },
  catChipTextActive: {
    color: "#0d0a08",
    fontWeight: "bold",
  },
  // Product Grid
  productGrid: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 8,
  },
  productCard: {
    width: (SCREEN_WIDTH - 44) / 2,
    backgroundColor: "#16110d",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    marginBottom: 4,
  },
  productImgContainer: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
  },
  productImg: {
    width: "100%",
    height: "100%",
  },
  favBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 14,
    padding: 4,
  },
  stockBadge: {
    position: "absolute",
    bottom: 6,
    left: 6,
    backgroundColor: "rgba(16, 185, 129, 0.9)",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  stockBadgeText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "bold",
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  priceVal: {
    color: theme.colors.gold,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardWaBtn: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    borderWidth: 1,
    borderColor: "#10b981",
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  cardWaText: {
    color: "#10b981",
    fontSize: 10,
    fontWeight: "bold",
  },
  // Favorites
  favHeaderBox: {
    padding: 16,
  },
  favTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  favSub: {
    color: "#8e8275",
    fontSize: 12,
  },
  emptyFavBox: {
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  emptyFavTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  emptyFavSub: {
    color: "#8e8275",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 18,
  },
  browseBtn: {
    backgroundColor: theme.colors.gold,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 16,
  },
  browseBtnText: {
    color: "#0d0a08",
    fontSize: 12,
    fontWeight: "bold",
  },
  // Boutique Tab
  boutiqueHeroCard: {
    height: 180,
    margin: 16,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  boutiqueImg: {
    width: "100%",
    height: "100%",
  },
  boutiqueHeroOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(13, 10, 8, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  boutiqueHeroTitle: {
    color: theme.colors.gold,
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 4,
  },
  boutiqueHeroSub: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  infoCard: {
    backgroundColor: "#16110d",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  infoCardLabel: {
    color: theme.colors.gold,
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
  },
  infoCardMain: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  infoCardDetail: {
    color: "#c5a880",
    fontSize: 12,
  },
  gpsBtn: {
    marginTop: 12,
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    borderWidth: 1,
    borderColor: theme.colors.gold,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  gpsBtnText: {
    color: theme.colors.gold,
    fontSize: 12,
    fontWeight: "bold",
  },
  boutiqueActionsGrid: {
    flexDirection: "row",
    marginHorizontal: 16,
    gap: 10,
    marginBottom: 14,
  },
  boutiqueActionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  boutiqueActionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  instaBanner: {
    marginHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#1c1612",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    alignItems: "center",
  },
  instaBannerText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  // Bottom Nav
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#0d0a08",
    borderTopWidth: 1,
    borderTopColor: "rgba(212, 175, 55, 0.2)",
    paddingVertical: 8,
    paddingBottom: Platform.OS === "ios" ? 18 : 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    color: "#8e8275",
    fontSize: 10,
    marginTop: 2,
    fontWeight: "600",
  },
  navTextActive: {
    color: theme.colors.gold,
    fontWeight: "bold",
  },
  // Story Modal
  storyModalOverlay: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-between",
  },
  storyFullImg: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  storyModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  storyModalBadge: {
    color: theme.colors.gold,
    fontSize: 11,
    fontWeight: "bold",
  },
  storyModalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  storyCloseBtn: {
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  storyModalFooter: {
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  storyModalCaption: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 8,
  },
  storyModalPrice: {
    color: theme.colors.gold,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
  },
  storyWaBtn: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  storyWaBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  // Product Detail Modal
  detailModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "flex-end",
  },
  detailModalCard: {
    backgroundColor: "#16110d",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",
    maxHeight: SCREEN_HEIGHT * 0.82,
    borderTopWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.4)",
  },
  detailImg: {
    width: "100%",
    height: 260,
  },
  detailCloseBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  detailInfoBox: {
    padding: 20,
  },
  detailName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  detailPrice: {
    color: theme.colors.gold,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailDesc: {
    color: "#c5a880",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 18,
  },
  detailBtnRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  detailActionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  detailActionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  // Reserve Modal
  reserveOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    padding: 20,
  },
  reserveCard: {
    backgroundColor: "#16110d",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.35)",
  },
  reserveTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  reserveSubtitle: {
    color: theme.colors.gold,
    fontSize: 12,
    marginBottom: 14,
  },
  reserveInput: {
    backgroundColor: "#0d0a08",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#fff",
    fontSize: 13,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  reserveBtnRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  reserveCancelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "#1c1612",
    alignItems: "center",
  },
  reserveCancelText: {
    color: "#c5a880",
    fontSize: 12,
    fontWeight: "bold",
  },
  reserveConfirmBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: theme.colors.gold,
    alignItems: "center",
  },
  reserveConfirmText: {
    color: "#0d0a08",
    fontSize: 12,
    fontWeight: "bold",
  },
});
