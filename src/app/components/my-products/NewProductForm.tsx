'use client'

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { NewProduct } from "@/types/product";
import toast from "react-hot-toast";

interface AddNewProductFormProps {
  sellerId: number;
}

export default function AddNewProductForm({ sellerId }: AddNewProductFormProps) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    // const [photo, setPhoto] = useState<File | null>(null);
    const [photo, setPhoto] = useState("");

    const categories = ["Footwear", "Home Decor", "Clothing", "Bags", "Jewelry"];

    const inputClass = "w-full px-4 py-2 border border-white/10 bg-white/10 text-white placeholder-white/50 focus:border-white/30 focus:outline-none transition-all text-sm font-light font-sans";

    // Get the values from local storage.
    useEffect(() => {
        const savedName = localStorage.getItem("name");
        const savedDescription = localStorage.getItem("description");
        const savedCategory = localStorage.getItem("category");
        const savedPrice = localStorage.getItem("price");

        if (savedName) setName(savedName);
        if (savedDescription) setDescription(savedDescription);
        if (savedCategory) setCategory(savedCategory);
        if (savedPrice) setPrice(savedPrice);
    }, []);

    // Save values in localStorage in gets page is updated.
    useEffect(() => { localStorage.setItem("name", name); }, [name]);
    useEffect(() => { localStorage.setItem("description", description); }, [description]);
    useEffect(() => { localStorage.setItem("category", category); }, [category]);
    useEffect(() => { localStorage.setItem("price", price); }, [price]);

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()

        const newProduct: NewProduct = {
            name,
            description,
            category: category as NewProduct["category"],
            price: parseFloat(price),
            seller_id: sellerId,
            image_url: photo
        }

        try {
            const {data, error} = await supabase
            .from("product")
            .insert([newProduct]);

            if (error) throw error;

            toast.success("Producto guardado con éxito!");
            setName(""); setDescription(""); setCategory(""); setPrice(""); setPhoto("");
        } catch (err) {
            console.error("Error:", err);
            toast.error("Hubo un error guardando el producto.");
        }
    }

    return (
        

        <form className="w-full max-w-[500px] mx-auto" onSubmit={handleSubmit}>

                        <div className="flex flex-col w-full mb-4">
                            <label htmlFor="name" className="mb-2 text-left tracking-wide text-white/80 text-[0.94rem] font-thin">
                                Title
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={inputClass}
                                placeholder="Handcrafted Backpack"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="flex flex-col w-full mb-4">
                            <label htmlFor="description" className="mb-2 text-left tracking-wide text-white/80 text-[0.94rem] font-thin">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className={inputClass + " resize-none"}
                                placeholder="Enter product description..."
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
                                    onChange={(e) => setCategory(e.target.value)}
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
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col w-full mb-4">
                            <label htmlFor="photo" className="mb-2 text-left tracking-wide text-white/80 text-[0.94rem] font-thin">
                                Photo
                            </label>
                            <input
                                type="text"
                                id="photo"
                                name="photo"
                                className={inputClass}
                                value={photo}
                                onChange={(e) => {
                                    // if (e.target.files && e.target.files[0]) {
                                    // setPhoto(e.target.files[0]);
                                    // }
                                    setPhoto(e.target.value)
                                }}
                                required
                            />

                            {/* {photo && (
                            <img
                                src={URL.createObjectURL(photo)}
                                alt="Preview"
                                className="mt-2 w-32 h-32 object-cover"
                            />
                            )} */}
                        </div>

                        <button
                            type="submit"
                            className="cursor-pointer px-5 py-2 border border-white/30 text-white/70 font-semibold text-sm hover:text-white hover:border-white/50 hover:backdrop-blur-sm transition-all w-max"
                        >
                            Submit
                        </button>

        </form>
    )
}