export type Category =
  | "FOOTWEAR"  
  | "HOME DECOR"
  | "CLOTHING"
  | "BAGS"
  | "JEWELRY";

export interface Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  price: number;
  image_url?: string;
  seller_id?: number;
}

