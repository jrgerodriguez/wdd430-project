'use client'

import React from 'react';
import ProductCard from '../marketplace/ProductCard';
import { getAllProducts } from "@/lib/products";
import { User } from "@/types/user";
import { Product } from "@/types/product";
import { useState} from "react";

type Props = { user: User };

// Use seller_id to filter products by this seller
export default function SellerProductsDisplay({ user }: Props) {
    const [products, setProducts] = useState<Product[]>(getAllProducts().filter(product => product.seller_id === user.id));
          
        return (

    <section className="w-full flex justify-center p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 gap-10 w-full max-w-[1200px]">
        {products.map((seller_id) => (
            <ProductCard key={seller_id.seller_id} product={seller_id} />
        ))}
        </div>
    </section>
        )
    }