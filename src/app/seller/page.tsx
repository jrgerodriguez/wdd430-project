import { Product } from "@/types/product";
import { AddProduct } from "@/lib/products";
import { User } from "@/types/user";
import { getUserById, updateUserStory } from "@/lib/users";
import StoryForm from "../components/seller/StoryForm";
import { revalidatePath } from "next/cache";
import React from "react";
import AddProductButton from "../components/seller/AddProductButton";
import SellerProductsDisplay from "../components/seller/SellerProductsDisplay";

export default async function SellersPage() {
    // Get user id from session or auth context
    const seller_id = 1; // NEED TO CHANGE BY LOGIC FOR LOGGED IN USER
    // Get the role of the user
    const isSeller = "seller";
    // Get information for the logged-in user
    const user: User = await getUserById(seller_id);
    const handleSaveStory = async (updatedStory: string) => {
        try {
            await updateUserStory(seller_id, updatedStory);
        }
        catch (error) {
            console.error("Error updating story:", error);
        }
        revalidatePath("/seller");
    };
    const handleAddProduct = async (newProduct: Omit<Product, "id" | "seller_id">) => {
        'use server';
        try {
            await AddProduct({ ...newProduct, seller_id });
        } catch (error) {
            console.error("Error adding product:", error);
        }
        revalidatePath("/seller");
    }

return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-pink-500 to-red-500 text-white">
    // New section for adding products and seller story
    <section className="w-full flex flex-col items-center p-10 space-y-6">
        <h1 className="text-4xl font-bold">Welcome, {user.name}</h1>
        <StoryForm user={user} onSave={handleSaveStory} />
        <AddProductButton user={user} onAddProduct={handleAddProduct} />
        <SellerProductsDisplay user={user} />
    </section>
    </div>
    );
}
