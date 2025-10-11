'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideBar() {

    const pathname = usePathname()

    return (
        <aside className="w-full md:w-50 py-4">
            <ul className="list-none flex flex-col gap-4 font-sans text-[0.94rem] text-white/70">
                <li>
                <Link href="/my-products"
                className={`md:p-2 rounded cursor-pointer w-full text-left ${pathname === '/my-products' ? 'text-emerald-400' : ''}`}
                >
                    My Products</Link>
                </li>
                <li>
                <Link href="/my-products/add" 
                className={`md:p-2 rounded cursor-pointer w-full text-left ${pathname === '/my-products/add' ? 'text-emerald-400' : ''}`}
                >
                Add New Product</Link>
                </li>
            </ul>
        </aside>
    )
}