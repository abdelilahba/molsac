const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed via node...");

  // 1. Seed Admin
  const adminPasswordHash = await bcrypt.hash("molsac2026", 10);
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: { passwordHash: adminPasswordHash },
    create: {
      username: "admin",
      passwordHash: adminPasswordHash,
    },
  });
  console.log("✅ Admin user ready:", admin.username);

  // 2. Clear old demo data
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});

  // 3. Demo Products
  const productsData = [
    {
      name: "Sac à Main Cuir Chic",
      nameAr: "حقيبة يد جلدية فاخرة",
      description: "Sac à main en cuir finition soignée avec bandoulière réglable et fermoirs dorés. Idéal pour toutes vos sorties.",
      descriptionAr: "حقيبة يد راقية مصنوعة من جلد عالي الجودة مع تفاصيل ذهبية أنيقة وحزام قابل للتعديل.",
      price: 280,
      category: "SAC",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80"
      ]),
      inStock: true,
      featured: true,
    },
    {
      name: "Cabas Élégance Quotidienne",
      nameAr: "حقيبة تسوق عصرية وأنيقة",
      description: "Grand cabas spacieux et résistant, parfait pour vos journées chargées ou vos séances shopping.",
      descriptionAr: "حقيبة كتف واسعة وعملية تناسب العمل والتسوق اليومي بتصميم جذاب.",
      price: 240,
      category: "SAC",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&auto=format&fit=crop&q=80"
      ]),
      inStock: true,
      featured: false,
    },
    {
      name: "Pochette de Soirée Métallisée",
      nameAr: "حقيبة سهرات ومناسبات راقية",
      description: "Pochette raffinée avec chaîne dorée détachable. La touche glamour indispensable pour vos mariages et fêtes.",
      descriptionAr: "حقيبة يد صغيرة للمناسبات والأعراس مع سلسلة ذهبية أنيقة ولمسة لامعة مميزة.",
      price: 190,
      category: "SAC",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80"
      ]),
      inStock: true,
      featured: true,
    },
    {
      name: "Escarpins Stiletto Dorés",
      nameAr: "حذاء نسائي أنيق بكعب عالي ذهبي",
      description: "Escarpins à talons hauts design luxueux et confortables, parfaits pour sublimer vos tenues de soirée.",
      descriptionAr: "حذاء سهرة أنيق ومريح ذو كعب عالٍ بتصميم راقٍ يناسب القفطان وفساتين الحفلات.",
      price: 340,
      category: "CHAUSSURE",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80"
      ]),
      inStock: true,
      featured: true,
    },
    {
      name: "Sneakers Mode Blanches & Or",
      nameAr: "حذاء رياضي عصري أبيض وذهبي",
      description: "Sneakers modernes au look urbain et semelle amortissante. Élégance décontractée au quotidien.",
      descriptionAr: "سنيكرز عصري ومريح بنعل ممتص للصدمات ولمسات ذهبية رقيقة تناسب جميع الإطلالات.",
      price: 290,
      category: "CHAUSSURE",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80"
      ]),
      inStock: true,
      featured: false,
    },
    {
      name: "Sandales Élégantes à Talons Bloc",
      nameAr: "صندل صيفي أنيق بكعب مريح",
      description: "Sandales ouvertes à lanières fines et talon bloc stable pour un maintien parfait.",
      descriptionAr: "صندل صيفي ناعم بسيور أنيقة وكعب مربع مريح يمنحك ثباتاً وأناقة طوال اليوم.",
      price: 220,
      category: "CHAUSSURE",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800&auto=format&fit=crop&q=80"
      ]),
      inStock: true,
      featured: true,
    },
    {
      name: "Parure Collier & Boucles Dorée",
      nameAr: "طقم عقد وأقراط راقي مطلي بالذهب",
      description: "Ensemble bijoux raffiné inspiré de la haute joaillerie. Brillance exceptionnelle et haute tenue.",
      descriptionAr: "طقم إكسسوارات ملكي يشمل عقداً وأقراطاً بتصميم فاخر ولمعان جذاب يدوم طويلاً.",
      price: 170,
      category: "ACCESSOIRE",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80"
      ]),
      inStock: true,
      featured: true,
    },
    {
      name: "Portefeuille Cuir Multi-rangements",
      nameAr: "محفظة نسائية فاخرة بجيوب متعددة",
      description: "Portefeuille compact et élégant avec compartiments pour cartes, billets et monnaie.",
      descriptionAr: "محفظة جلدية أنيقة وعملية تتسع للبطاقات والنقود بتشطيب عالي الدقة.",
      price: 130,
      category: "ACCESSOIRE",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80"
      ]),
      inStock: true,
      featured: false,
    },
  ];

  const createdProducts = [];
  for (const item of productsData) {
    const p = await prisma.product.create({ data: item });
    createdProducts.push(p);
  }
  console.log(`✅ Created ${createdProducts.length} demo products.`);

  // 4. Sample Orders
  if (createdProducts.length > 0) {
    await prisma.order.create({
      data: {
        customerName: "Fatima Zahra",
        customerPhone: "0661234567",
        productId: createdProducts[0].id,
        quantity: 1,
        status: "PENDING",
        notes: "Livraison demandée sur Tétouan - Wilaya.",
      },
    });

    await prisma.order.create({
      data: {
        customerName: "Khadija Benali",
        customerPhone: "0612987654",
        productId: createdProducts[3].id,
        quantity: 1,
        status: "CONFIRMED",
        notes: "Passage prévu au local n°6 pour récupération.",
      },
    });
    console.log("✅ Created 2 sample orders.");
  }

  console.log("🎉 Seed finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

