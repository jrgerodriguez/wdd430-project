import { User } from "@/types/user";
import { useState } from "react";
import { Product } from "@/types/product";

type Props = {
    user: User;
    onAddProduct: (newProduct: Omit<Product, "id">) => void;
};

export default function productForm({ user, onAddProduct }: Props) {
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const handleAddProduct = async () => {
        if (name.trim() === "" || description.trim() === "" || category.trim() === "" || price === "") {
            setError("All fields are required.");
            return;
        }
        setIsSaving(true);
        setError("");
        try {
            await onAddProduct({ name, description, category, price: Number(price), seller_id: user.user_id });
            setIsAdding(false);
            setName("");
            setDescription("");
            setCategory("");
            setPrice("");
        } catch (err) {
            setError("Failed to add product. Please try again.");
        }
        setIsSaving(false);
    };

    return (
    <div>
        {isAdding ? (
        <div className="max-w-md mx-auto p-4 bg-white/15 backdrop-blur-[15px] rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSaving}
            />
            <textarea
                className="w-full h-24 p-2 border border-gray-300 rounded mb-2 resize-none"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSaving}
            />
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isSaving}
            />
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
                    onClick={() => { setIsAdding(false); setError(""); }}
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

