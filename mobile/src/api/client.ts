// Mol Sac API Configuration for Mobile
import { DEFAULT_PRODUCTS, MobileProduct } from "../data/defaultProducts";

export { MobileProduct };

// Live Vercel production API URL
export const API_BASE_URL = "https://molsac.vercel.app";

export interface MobileOrderPayload {
  customerName: string;
  customerPhone: string;
  productId: number | string;
  quantity?: number;
  notes?: string;
}

export async function fetchProducts(): Promise<MobileProduct[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${API_BASE_URL}/api/products`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error("API non disponible");
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
    return DEFAULT_PRODUCTS;
  } catch (error) {
    console.warn("fetchProducts fallback to local catalogue:", error);
    return DEFAULT_PRODUCTS;
  }
}

export async function submitOrder(order: MobileOrderPayload): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const json = await res.json();
    return Boolean(json.success);
  } catch (err) {
    console.error("submitOrder error:", err);
    return false;
  }
}
