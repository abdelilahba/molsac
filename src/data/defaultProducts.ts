export interface StaticProduct {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  category: "SAC" | "CHAUSSURE" | "ACCESSOIRE";
  images: string;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_PRODUCTS: StaticProduct[] = [
  {
    id: 1,
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
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
  },
  {
    id: 2,
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
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
  },
  {
    id: 3,
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
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
  },
  {
    id: 4,
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
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
  },
  {
    id: 5,
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
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
  },
  {
    id: 6,
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
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
  },
  {
    id: 7,
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
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
  },
  {
    id: 8,
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
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
  },
];

