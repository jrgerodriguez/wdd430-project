// CHANGE TO EXPORT FOR A SELECT ELEMENT

export const ALL_CATEGORIES = [
  "Footwear", 
  "Home Decor", 
  "Clothing", 
  "Bags", 
  "Jewelry"] as const;

export type Category = typeof ALL_CATEGORIES[number];

export interface Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  price: number;
  // Change to be necessary
  image_url: string;
  // Change to be necessary
  seller_id: number;
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