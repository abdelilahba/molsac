export type ProductCategory = "SAC" | "CHAUSSURE" | "ACCESSOIRE";

export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface Product {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  category: ProductCategory | string;
  images: string; // JSON-stringified string[]
  inStock: boolean;
  featured: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  orders?: Order[];
}

export interface ProductParsed extends Omit<Product, "images"> {
  images: string[];
}

export interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  productId: number;
  product?: Product;
  quantity: number;
  status: OrderStatus | string;
  notes?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Admin {
  id: number;
  username: string;
  passwordHash?: string;
  createdAt: Date | string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateProductInput {
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  category: ProductCategory;
  images: string[];
  inStock?: boolean;
  featured?: boolean;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: number;
}

export interface CreateOrderInput {
  customerName: string;
  customerPhone: string;
  productId: number;
  quantity?: number;
  notes?: string;
}

export interface UpdateOrderStatusInput {
  status: OrderStatus;
}

export interface AdminLoginInput {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  admin: {
    id: number;
    username: string;
  };
}

export interface ShopInfo {
  name: string;
  nameAr: string;
  location: string;
  locationAr: string;
  whatsapp: string;
  instagram: string;
  categories: {
    key: ProductCategory;
    nameEn: string;
    nameAr: string;
    icon: string;
  }[];
}

export const SHOP_INFO: ShopInfo = {
  name: "Mol Sac",
  nameAr: "مول الصاك",
  location: "Kissariat Al Hamama, Shop No. 6, Tétouan, Morocco",
  locationAr: "قيسارية الحمامة، محل رقم 6، تطوان 🇲🇦",
  whatsapp: "0712-128124",
  instagram: "@mol_sac44",
  categories: [
    { key: "SAC", nameEn: "Bags", nameAr: "حقائب", icon: "👜" },
    { key: "CHAUSSURE", nameEn: "Shoes", nameAr: "أحذية", icon: "👠" },
    { key: "ACCESSOIRE", nameEn: "Accessories & Jewelry", nameAr: "إكسسوارات ومجوهرات", icon: "💍" },
  ],
};
