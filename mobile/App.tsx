import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { theme } from "./src/theme";
import { fetchProducts, MobileProduct } from "./src/api/client";

export default function App() {
  const [activeTab, setActiveTab] = useState<"catalog" | "admin">("catalog");
  const [products, setProducts] = useState<MobileProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const loadData = async () => {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openWhatsApp = (productName?: string, price?: number) => {
    let msg = "Salam, je vous contacte depuis l'application Mol Sac Tétouan.";
    if (productName && price) {
      msg = `Salam, je souhaite commander cet article chez Mol Sac Tétouan :\n• Modèle : ${productName}\n• Prix : ${price} DH\nEst-il disponible à Kissaria Al Hamama ?`;
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

  const filtered = products.filter((p) => {
    const matchCat = selectedCategory === "ALL" || p.category === selectedCategory;
    const matchSearch =
      !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.nameAr && p.nameAr.includes(search));
    return matchCat && matchSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0a08" />

      {/* Top Brand Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80" }}
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

        {/* WhatsApp VIP Button */}
        <TouchableOpacity
          style={styles.headerWaBtn}
          onPress={() => openWhatsApp()}
          activeOpacity={0.8}
        >
          <Text style={styles.headerWaText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>

      {/* Mode Switcher: Vitrine Client vs Admin Frère */}
      <View style={styles.modeTabs}>
        <TouchableOpacity
          style={[styles.modeTab, activeTab === "catalog" && styles.modeTabActive]}
          onPress={() => setActiveTab("catalog")}
        >
          <Text
            style={[
              styles.modeTabText,
              activeTab === "catalog" && styles.modeTabTextActive,
            ]}
          >
            ✨ Vitrine Boutique
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeTab, activeTab === "admin" && styles.modeTabActive]}
          onPress={() => setActiveTab("admin")}
        >
          <Text
            style={[
              styles.modeTabText,
              activeTab === "admin" && styles.modeTabTextActive,
            ]}
          >
            📱 Admin iPhone
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "catalog" ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Hero Banner */}
          <View style={styles.heroBanner}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>NOUVELLE COLLECTION 2026</Text>
            </View>
            <Text style={styles.heroTitle}>L&apos;Élégance à la Tétouanaise</Text>
            <Text style={styles.heroSub}>
              Sacs d&apos;exception, souliers et maroquinerie haut de gamme au cœur de Tétouan.
            </Text>
          </View>

          {/* Search Box */}
          <View style={styles.searchBox}>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un sac, une paire..."
              placeholderTextColor="#8e8275"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {[
              { id: "ALL", label: "Tous ✨" },
              { id: "SAC", label: "Sacs 👜" },
              { id: "CHAUSSURE", label: "Souliers 👠" },
              { id: "ACCESSOIRE", label: "Bijoux 💍" },
            ].map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.catChip,
                  selectedCategory === cat.id && styles.catChipActive,
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text
                  style={[
                    styles.catChipText,
                    selectedCategory === cat.id && styles.catChipTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Product List */}
          {loading ? (
            <ActivityIndicator color={theme.colors.gold} size="large" style={{ marginTop: 40 }} />
          ) : (
            <View style={styles.productGrid}>
              {filtered.map((item) => (
                <View key={item.id} style={styles.productCard}>
                  <Image
                    source={{
                      uri: item.images
                        ? JSON.parse(item.images)[0]
                        : "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
                    }}
                    style={styles.productImg}
                  />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    {item.nameAr ? (
                      <Text style={styles.productArabic} numberOfLines={1}>
                        {item.nameAr}
                      </Text>
                    ) : null}
                    <View style={styles.priceRow}>
                      <Text style={styles.priceVal}>{item.price} DH</Text>
                      <TouchableOpacity
                        style={styles.orderBtn}
                        onPress={() => openWhatsApp(item.name, item.price)}
                      >
                        <Text style={styles.orderBtnText}>Commander</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={{ height: 60 }} />
        </ScrollView>
      ) : (
        /* Brother iPhone Admin view */
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.adminBox}>
            <Text style={styles.adminTitle}>Espace Gestion iPhone</Text>
            <Text style={styles.adminDesc}>
              Conçu pour être utilisé 100% sur iPhone sans ordinateur.
            </Text>

            <TouchableOpacity
              style={styles.adminActionBtn}
              onPress={() => {
                Linking.openURL("http://localhost:3000/admin");
              }}
            >
              <Text style={styles.adminActionBtnText}>📸 Ouvrir l&apos;Admin Mobile (Web / PWA)</Text>
            </TouchableOpacity>

            <View style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>💡 Astuce pour votre frère sur iPhone :</Text>
              <Text style={styles.tipsItem}>1. Ouvrir Safari sur iPhone et aller sur molsac.ma/admin</Text>
              <Text style={styles.tipsItem}>2. Cliquer sur le bouton Partager ⬆️</Text>
              <Text style={styles.tipsItem}>3. Choisir &ldquo;Sur l&apos;écran d&apos;accueil&rdquo; 📲</Text>
              <Text style={styles.tipsItem}>4. L&apos;icône dorée Mol Sac apparaîtra comme une vraie appli !</Text>
            </View>
          </View>
        </ScrollView>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212, 175, 55, 0.2)",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#d4af37",
  },
  brandTitle: {
    color: "#f6f3ee",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 2,
  },
  brandArabic: {
    color: "#d4af37",
    fontSize: 15,
  },
  brandSubtitle: {
    color: "#c5a880",
    fontSize: 10,
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
  modeTabs: {
    flexDirection: "row",
    backgroundColor: "#17120e",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212, 175, 55, 0.2)",
  },
  modeTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  modeTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#d4af37",
  },
  modeTabText: {
    color: "#8e8275",
    fontSize: 13,
    fontWeight: "600",
  },
  modeTabTextActive: {
    color: "#d4af37",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  heroBanner: {
    backgroundColor: "#17120e",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    marginBottom: 16,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(212, 175, 55, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  heroBadgeText: {
    color: "#d4af37",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  heroTitle: {
    color: "#f6f3ee",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  heroSub: {
    color: "#e8e0d5",
    fontSize: 12,
    lineHeight: 18,
  },
  searchBox: {
    backgroundColor: "#17120e",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  searchInput: {
    height: 44,
    color: "#f6f3ee",
    fontSize: 13,
  },
  catScroll: {
    marginBottom: 18,
  },
  catChip: {
    backgroundColor: "#17120e",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.25)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  catChipActive: {
    backgroundColor: "#d4af37",
    borderColor: "#d4af37",
  },
  catChipText: {
    color: "#e8e0d5",
    fontSize: 12,
    fontWeight: "600",
  },
  catChipTextActive: {
    color: "#0d0a08",
    fontWeight: "bold",
  },
  productGrid: {
    gap: 16,
  },
  productCard: {
    backgroundColor: "#17120e",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    overflow: "hidden",
  },
  productImg: {
    width: "100%",
    height: 220,
    backgroundColor: "#0d0a08",
  },
  productInfo: {
    padding: 14,
  },
  productName: {
    color: "#f6f3ee",
    fontSize: 16,
    fontWeight: "bold",
  },
  productArabic: {
    color: "#c5a880",
    fontSize: 12,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(212, 175, 55, 0.15)",
  },
  priceVal: {
    color: "#d4af37",
    fontSize: 20,
    fontWeight: "bold",
  },
  orderBtn: {
    backgroundColor: "#10b981",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  orderBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  adminBox: {
    padding: 10,
  },
  adminTitle: {
    color: "#f6f3ee",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  adminDesc: {
    color: "#c5a880",
    fontSize: 13,
    marginBottom: 20,
  },
  adminActionBtn: {
    backgroundColor: "#d4af37",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 24,
  },
  adminActionBtnText: {
    color: "#0d0a08",
    fontWeight: "bold",
    fontSize: 14,
  },
  tipsCard: {
    backgroundColor: "#17120e",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    borderRadius: 18,
    padding: 16,
    gap: 8,
  },
  tipsTitle: {
    color: "#d4af37",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  tipsItem: {
    color: "#e8e0d5",
    fontSize: 12,
    lineHeight: 18,
  },
});

