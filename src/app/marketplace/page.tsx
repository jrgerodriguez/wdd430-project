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

  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    <>

      <div className="my-6 font-sans text-[0.94rem] text-white/50 flex flex-col md:flex-row justify-center items-center gap-6 text-center">

        <div className="relative w-40">
          <div
            className="px-4 py-2 bg-white/10 text-white cursor-pointer flex justify-between items-center transition hover:bg-white/20"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {categoryFilter === "all" ? "All Categories" : categoryFilter}
            <svg
              className="w-4 h-4 transition-transform"
              style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {dropdownOpen && (
            <div className="absolute mt-1 w-full bg-black/80 shadow-lg z-10">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className="px-4 py-2 cursor-pointer hover:bg-white/20 text-white transition"
                  onClick={() => {
                    setCategoryFilter(cat as Category);
                    setDropdownOpen(false);
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="max-price" className="whitespace-nowrap">Max Price</label>
          <input
            type="number"
            id="max-price"
            className="px-3 py-2 bg-white/10 text-white placeholder-white focus:outline-none focus:bg-white/20 transition w-24 text-center text-[0.94rem]"
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
      </div>

      <section className="w-full flex justify-center px-10 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 gap-10 w-full max-w-[1200px]">
          {filteredProducts.map((element) => (
            <ProductCard key={element.id} product={element} />
          ))}
        </div>
      </section>
    </>
  );
}
