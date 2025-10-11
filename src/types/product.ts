export type Category =
  | "Footwear"  
  | "Home Decor"
  | "Clothing"
  | "Bags"
  | "Jewelry";

export interface Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  price: number;
  image_url?: string;
  seller_id?: number;
  averageRating?: number;
  ratings?: Rating[];
}

export interface Rating {
  id: string;
  productId: number;
  rating: number; // 1–5
  comment?: string;
  created_at?: string;
}

export type NewProduct = Required<
  Omit<Product, "id" | "averageRating" | "ratings">
>;