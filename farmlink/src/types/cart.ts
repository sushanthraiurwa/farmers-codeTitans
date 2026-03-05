import { Product } from "@/data/products";

export interface CartItem extends Product {
  qty: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}
