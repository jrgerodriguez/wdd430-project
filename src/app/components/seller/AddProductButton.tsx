'use client'

import { User } from "@/types/user";
import { useState } from "react";
import { Product } from "@/types/product";
import ProductForm from "./ProductForm";

type Props = {
    user: User;
    onAddProduct: (newProduct: Omit<Product, "id">) => void;
};

export default function addProductButton({ user, onAddProduct }: Props) {
    const [isAdding, setIsAdding] = useState(false);
    return (
    <div>
        {isAdding ? (
        <ProductForm user={user} onAddProduct={onAddProduct} />
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
