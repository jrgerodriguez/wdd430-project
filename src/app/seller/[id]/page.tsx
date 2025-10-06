// page for a specif seller. Show the story of the seller and their products
import { getUserById } from '@/lib/users';
import { User } from '@/types/user';
import React from 'react';
import SellerProductsDisplay from '@/app/components/seller/SellerProductsDisplay';

export default async function SellerPage() {
    // get the seller id from the url
    const sellerId = 1; // replace with actual id from url
    const seller: User | null = await getUserById(sellerId);
    if (!seller) {
        return <div>Seller not found</div>;
    }
    return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">{seller.name}</h1>
                <p className="text-lg text-gray-600">{seller.story}</p>
            </div>
            <SellerProductsDisplay user={seller} />

        </div>
    );
}


