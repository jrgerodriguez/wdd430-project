'use client'

import { User } from "@/types/user";
import { useState } from "react";
import { Product } from "@/types/product";
import { AddProduct } from "@/lib/products";

// Define the props for the component
type Props = {
    user: User;
    onAddProduct: (newProduct: Omit<Product, "id">) => void;
};

// ProductForm component
export default function productForm({ user, onAddProduct }: Props) {
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    // Function to handle adding a new product
    const handleAddProduct = async () => {
        // Basic validation for empty fields
        if (name.trim() === "" || description.trim() === "" || category.trim() === "" || price === "") {
            setError("All fields are required.");
            return;
        }
        // Ensure price is a positive number
        if (typeof price === "number" && price <= 0) {
            setError("Price must be a positive number.");
            return;
        }
        // Set saving state and clear previous errors
        setIsSaving(true);
        setError("");
        try {
            // Call the onAddProduct prop to add the new product
            await onAddProduct({ name, description, category, price: Number(price), image_url: imageUrl, seller_id: user.id });
            setName("");
            setDescription("");
            setCategory("");
            setPrice("");
            setImageUrl("");
        } catch (err) {
            setError("Failed to add product. Please try again.");
        }
        // Set saving state to false after operation
        setIsSaving(false);
    };

    // Render the form or the "Add New Product" button based on isAdding state
    return (
    <div>
        {isAdding ? (
        <div className="max-w-md mx-auto p-4 bg-white/15 backdrop-blur-[15px] rounded shadow">
            {/* Form to add a new product */}
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            {/* Name input field */}
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSaving}
            />
            {/* Description input field */}
            <textarea
                className="w-full h-24 p-2 border border-gray-300 rounded mb-2 resize-none"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSaving}
            />
            {/* Category input field */}
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isSaving}
            />
            {/* Price input field */}
            <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                disabled={isSaving}
                min="0"
                step="0.01"
            />
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {/* Image URL input field */}
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled={isSaving}
            />
            <div className="flex space-x-2">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
                    onClick={handleAddProduct}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Add Product"}
                </button>
                <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition disabled:opacity-50"
                    onClick={() => {setIsAdding(false); setError("")}}
                    disabled={isSaving}
                >
                    Cancel
                </button>
            </div>
        </div>
      ) : (
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        onClick={() => setIsAdding(true)}
      >
        Add New Product
      </button>
    )}
  </div>
);
}