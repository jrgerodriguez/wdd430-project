import { Product } from "@/types/product";
import { AddProduct } from "@/lib/products";
import { User } from "@/types/user";
import { getUserById, updateUserStory, updateUserRole } from "@/lib/users";
import StoryForm from "../components/seller/StoryForm";
import { revalidatePath } from "next/cache";
import React from "react";
import AddProductButton from "../components/seller/AddProductButton";
import SellerProductsDisplay from "../components/seller/SellerProductsDisplay";

export default async function SellersPage() {
    // Get user id from session or auth context
    const seller_id = 1; // NEED TO CHANGE BY LOGIC FOR LOGGED IN USER
    // Get user role to ensure they are a seller
    const userRole = "seller"; // NEED TO CHANGE BY LOGIC FOR LOGGED IN USER
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

    const handleBecomeSeller = async () => {
        "use server";
        try {
            await updateUserRole(seller_id, "seller");
            console.log("User role updated to seller");
        } catch (error) {
            console.error("Error updating user role:", error);
        }
        revalidatePath("/seller");
    };


    // if is not a seller, show a message and give the option to become one
    if (userRole !== "seller") {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-500 text-white">
            <h1 className="text-3xl font-bold">
                This page is for sellers to manage their story and collection of items.
            </h1>
            <form action={handleBecomeSeller}>
                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-white text-red-500 rounded"
                    >
                        Become a Seller
                    </button>
                </form>
        </div>
    );
}

    else
        return (
            <div className="min-h-screen bg-gradient-to-b from-purple-400 via-pink-500 to-red-500 text-white">
    // New section for adding products and seller story
                <section className="w-full flex flex-col items-center p-10 space-y-6">
                    <h1 className="text-4xl font-bold">Welcome, {user.name}</h1>
                    <StoryForm user={user} onSave={handleSaveStory} />
                    <AddProductButton user={user} onAddProduct={handleAddProduct} />
                </section>
    // Use seller_id to filter products by this seller
                <section className="w-full flex justify-center p-10">
                    <SellerProductsDisplay user={user} />
                </section>
            </div>
        );
}
