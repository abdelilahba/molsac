export interface MobileProduct {
  id: number | string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  price: number;
  category: string;
  images: string;
  inStock: boolean;
  featured: boolean;
}

export interface MobileStory {
  id: string;
  title: string;
  titleAr: string;
  tag: string;
  tagAr: string;
  image: string;
  price?: string;
  caption: string;
  captionAr: string;
}

export const DEFAULT_STORIES: MobileStory[] = [
  {
    id: "s1",
    title: "Nouveautés Sacs",
    titleAr: "حقائب جديدة",
    tag: "Arrivage Semaine",
    tagAr: "وصل حديثاً",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
    price: "420 DH",
    caption: "Nouveau sac bandoulière matelassé avec chaîne dorée gourmette. Édition limitée disponible à Kissaria Al Hamama !",
    captionAr: "حقيبة كتف مبطنة بلمسة ذهبية ملكية راقية. كمية محدودة متوفرة الآن في المحل !",
  },
  {
    id: "s2",
    title: "Escarpins Soirée",
    titleAr: "أحذية سهرة",
    tag: "Tendance 2026",
    tagAr: "موضة 2026",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85",
    price: "360 DH",
    caption: "Escarpins vernis noir talon aiguille 9cm. Confortables et splendides pour toutes vos fêtes et mariages.",
    captionAr: "حذاء كعب عالي أسود لامع، أناقة مطلقة وراحة لقدميك في كافة المناسبات والأعراس.",
  },
  {
    id: "s3",
    title: "Cabas Élégance",
    titleAr: "حقائب كاباس",
    tag: "Best-Seller",
    tagAr: "الأكثر طلباً",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85",
    price: "490 DH",
    caption: "Grand cabas cuir caramel rigide avec pochettes intérieures et finitions couture. Le sac parfait de tous les jours.",
    captionAr: "حقيبة يد كاباس كبيرة من الجلد الكاراميل الفاخر، واسعة ومثالية للاستخدام اليومي والعمل.",
  },
  {
    id: "s4",
    title: "Haute Fantaisie",
    titleAr: "مجوهرات وإكسسوار",
    tag: "Finitions Or",
    tagAr: "طلاء ذهبي",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
    price: "240 DH",
    caption: "Parure collier et pendentif maillons or 18k plaqué avec incrustations. L'éclat qui sublime n'importe quelle tenue.",
    captionAr: "طقم عقد وأساور مطلي بماء الذهب عالي الجودة ومقاوم للماء، يمنحك بريقاً فريداً.",
  },
  {
    id: "s5",
    title: "La Boutique",
    titleAr: "المحل بتطوان",
    tag: "Kissaria Al Hamama",
    tagAr: "قيسارية الحمامة",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85",
    caption: "Bienvenue chez Mol Sac ! Kissaria Al Hamama, Magasin N°6 à Tétouan. Ouvert 7j/7 de 10h à 21h30.",
    captionAr: "مرحباً بكم في محلكم مول الصاك ! قيسارية الحمامة، محل رقم 6 بتطوان. مفتوح يومياً من 10:00 إلى 21:30.",
  },
];

export const DEFAULT_PRODUCTS: MobileProduct[] = [
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
    ]),
    inStock: true,
    featured: true,
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
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&auto=format&fit=crop&q=80",
    ]),
    inStock: true,
    featured: false,
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
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80",
    ]),
    inStock: true,
    featured: true,
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
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80",
    ]),
    inStock: true,
    featured: true,
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
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
    ]),
    inStock: true,
    featured: false,
  },
  {
    id: 6,
    name: "Parure Collier & Boucles Dorée",
    nameAr: "طقم عقد وأقراط راقي مطلي بالذهب",
    description: "Ensemble bijoux raffiné inspiré de la haute joaillerie. Brillance exceptionnelle et haute tenue.",
    descriptionAr: "طقم إكسسوارات ملكي يشمل عقداً وأقراطاً بتصميم فاخر ولمعان جذاب يدوم طويلاً.",
    price: 170,
    category: "ACCESSOIRE",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
    ]),
    inStock: true,
    featured: true,
  },
];

