'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category, EditProduct } from "@/types/product";
import toast from "react-hot-toast";

interface EditProductFormProps {
  product: EditProduct;
}

export default function EditProductForm({product}: EditProductFormProps) {
    const router = useRouter();

    const categories = ["Footwear", "Home Decor", "Clothing", "Bags", "Jewelry"];
    const inputClass = "w-full px-4 py-2 border border-white/10 bg-white/10 text-white placeholder-white/50 focus:border-white/30 focus:outline-none transition-all text-sm font-light font-sans";

    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [category, setCategory] = useState(product.category);
    const [price, setPrice] = useState(product.price);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
        const res = await fetch(`/api/products/${product.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            name,
            description,
            price,
            category,
            }),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "Failed to update product");
        }

        toast.success("Product updated successfully.");
        router.push("/my-products");
        } catch (error) {
        console.error(error);
        toast.error("Something went wrong.");
        } finally {
        setLoading(false);
        }
    };

    return (
            <div className="grid grid-cols-1 gap-6 w-full max-w-[1200px] mx-auto justify-center">

                <form className="w-full max-w-[500px] mx-auto" onSubmit={handleSubmit}>
                    <h2 className="text-white/80 mb-4 font-sans text-xl">
                        Edit <span className="text-emerald-400 font-medium">{product.name}</span>
                    </h2>
                    <hr className="border-white/20 mb-6" />
                    
                    <div className="flex flex-col w-full mb-4">
                        <label htmlFor="name" className="mb-2 text-left tracking-wide text-white/80 text-[0.94rem] font-thin">
                            Title
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={inputClass}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col w-full mb-4">
                        <label htmlFor="description" className="mb-2 text-left tracking-wide text-white/80 text-[0.94rem] font-thin" bg-white>
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className={inputClass + " resize-none"}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            maxLength={150}
                            rows={5}
                        />
                    </div>

                    <div className="flex flex-col w-full mb-4">
                        <label htmlFor="category" className="mb-2 text-left tracking-wide text-white/80 text-[0.94rem] font-thin">
                            Category
                        </label>
                        <div className="relative w-full">
                            <select 
                                name="category" 
                                id="category"
                                className={inputClass + " appearance-none pr-8 bg-black text-white placeholder-white/50 border-white/10 focus:border-white/30"}
                                value={category}
                                onChange={(e) => setCategory(e.target.value as Category)}
                                required
                            >
                                <option value="" disabled className="text-gray-350 bg-black">Select a Category</option>
                                {categories.map((cat) => (
                                    <option value={cat} 
                                        key={cat} 
                                        className="text-gray-200 bg-black"
                                    >
                                        {cat}
                                    </option>
                                ))}   
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full mb-4">
                        <label htmlFor="price" className="mb-2 text-left tracking-wide text-white/80 text-[0.94rem] font-thin">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className={inputClass}
                            placeholder="25.99"
                            step="0.01"
                            min="0"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer px-5 py-2 border border-white/30 text-white/70 font-semibold text-sm hover:text-white hover:border-white/50 hover:backdrop-blur-sm transition-all w-max"
                    >
                        {loading ? "Editing..." : "Submit"}
                    </button>

                </form>
            </div>
        )
}