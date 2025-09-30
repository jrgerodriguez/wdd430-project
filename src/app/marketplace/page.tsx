import { Product } from "@/types/product";
import { getAllProducts } from "@/lib/products";
import ProductCard from "../components/marketplace/ProductCard";

export default async function MarketplacePage() {
  const products: Product[] = await getAllProducts();

  return (
    <section className="w-full flex justify-center p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 gap-10 w-full max-w-[1200px]">
        {products.map((element) => (
          <ProductCard key={element.id} product={element} />
        ))}
      </div>
    </section>
  );
}
