import { Product } from "@/types/product";
import { getAllProducts } from "@/lib/products";
import ProductCard from "../components/marketplace/ProductCard";
import { User } from "@/types/user";
import { getUserById, updateUserStory } from "@/lib/users";
import StoryForm from "../components/seller/storyForm";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { addProductButton } from "../components/seller/addProductButton";

export default async function SellersPage() {
    const products: Product[] = await getAllProducts();
    // Get user id from session or auth context
    const seller_id = 1; // NEED TO CHANGE BY LOGIC FOR LOGGED IN USER
    // Get information for the logged-in user
    const user: User = await getUserById(seller_id);
    const handleSaveStory = async (updatedStory: string) => {
        try {
            await updateUserStory(seller_id, updatedStory);
        }
    };

return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-pink-500 to-red-500 text-white">
    // New section for adding products and seller story
    <section className="w-full flex flex-col items-center p-10 space-y-6">
        <h1 className="text-4xl font-bold">Welcome, {user.name}</h1>
        <StoryForm user={user} onSave={handleSaveStory} />
        <addProductButton user={user} onAddProduct={() => {}} />
    </section>


    // Use seller_id to filter products by this seller
    <section className="w-full flex justify-center p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 gap-10 w-full max-w-[1200px]">
        {products.map((seller_id) => (
            <ProductCard key={seller_id.seller_id} product={seller_id} />
        ))}
        </div>
    </section>
    </div>
    );
}
