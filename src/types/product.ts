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
}

