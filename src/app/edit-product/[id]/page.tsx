"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Product } from "@/types/product";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category: "",
  });

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data: Product = await res.json();

        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price?.toString() || "0",
          image_url: data.image_url || "",
          category: data.category || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (res.ok) {
        alert("Product updated Successfully!");
        router.push(`/marketplace/${id}`);
      } else {
        alert("Error updating the product.");
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
          />
        </div>

        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
          />
        </div>

        <div>
          <label className="block mb-1">Image (URL)</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
        >
          Salve Changes
        </button>
      </form>
    </div>
  );
}
