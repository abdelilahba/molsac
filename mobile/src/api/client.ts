// Mol Sac API Configuration for Mobile
// By default points to the local or production Next.js backend
export const API_BASE_URL = "http://localhost:3000";

export interface MobileProduct {
  id: string;
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

export interface MobileOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  productId?: string;
  product?: MobileProduct;
  createdAt: string;
}

export async function fetchProducts(): Promise<MobileProduct[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`);
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("fetchProducts error", error);
    return [];
  }
}

export async function fetchOrders(): Promise<MobileOrder[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orders`);
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("fetchOrders error", error);
    return [];
  }
}
