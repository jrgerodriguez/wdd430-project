"use client"; // necessário para usar hooks no Next 13+

import { useState, useEffect } from "react";
import { Category, Product } from "@/types/product";
import { getAllProducts } from "@/lib/products";
import ProductCard from "../components/marketplace/ProductCard";

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | "">("");

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await getAllProducts();
      console.log("Produtos recebidos:", allProducts);
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (categoryFilter !== "all") {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    if (maxPriceFilter !== "") {
      filtered = filtered.filter(p => p.price <= Number(maxPriceFilter));
    }

    setFilteredProducts(filtered);
  }, [categoryFilter, maxPriceFilter, products]);

  const categories = ["Footwear", "Home Decor", "Clothing", "Bags", "Jewelry"];
  
  return (
    <section className="w-full flex flex-col items-center p-10">
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as Category | "all")}
          className="px-3 py-2 rounded bg-white text-black border-white/20"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Max Price"
          value={maxPriceFilter}
          onChange={(e) => setMaxPriceFilter (e.target.value === "" ? "" : Number(e.target.value))}
          className="px-3 py-2 rounded bg-white/5 text-white border border-white/20"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 gap-10 w-full max-w-[1200px]">
        {filteredProducts.map((element) => (
          <ProductCard key={element.id} product={element} />
        ))}
      </div>
    </section>
  );
}
