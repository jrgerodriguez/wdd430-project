import React from 'react';
import ProductCard from '../marketplace/ProductCard';
import { getAllProducts } from "@/lib/products";
import { User } from "@/types/user";
import { Product } from "@/types/product";

type Props = { user: User };

// Use seller_id to filter products by this seller
export default async function SellerProductsDisplay({ user }: Props) {
    const allProducts = await getAllProducts();
    const sellerProducts = allProducts.filter((p: Product) => p.seller_id === user.id);
        return (

    <section className="w-full flex justify-center p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 gap-10 w-full max-w-[1200px]">
        {sellerProducts.map((product) => (
    <ProductCard key={product.id} product={product} />
        ))}
        </div>
    </section>
        )
    }