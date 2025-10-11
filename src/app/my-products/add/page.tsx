import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { JwtPayloadCustom } from '@/types/jwt';
import AddNewProductForm from "@/app/components/my-products/NewProductForm"


export default async function AddNewProductPage() {

    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");
    const token = tokenCookie?.value;

    if (!token) return <p>No token found. Please log in.</p>;

    const verified = verifyToken(token);

    if (typeof verified !== "object" || verified === null || !("id" in verified)) {
        return <p>Invalid token. Please log in again.</p>;
    }

    const payload = verified as JwtPayloadCustom;

    const seller_id = Number(payload.id);

    return (
        <div className="grid grid-cols-1 gap-6 w-full max-w-[1200px] mx-auto justify-center">
            <AddNewProductForm sellerId={seller_id}/>
        </div>
    )
}