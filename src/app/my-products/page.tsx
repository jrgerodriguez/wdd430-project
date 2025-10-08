import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { getProductsBySellerId } from "@/lib/seller/product";
import { Product } from "@/types/product";
import { JwtPayloadCustom } from "@/types/jwt";
import SellerProductCard from "../components/seller/SellerProductCard";


export default async function MyProductsPage() {

  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  const token = tokenCookie?.value;

  if (!token) return <p>No token found. Please log in.</p>;

  const verified = verifyToken(token);

  if (typeof verified !== "object" || verified === null || !("id" in verified)) {
    return <p>Invalid token. Please log in again.</p>;
  }

  const payload = verified as JwtPayloadCustom;
  const seller_id = payload.id;

  const products: Product[] = await getProductsBySellerId(Number(seller_id));

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-6 w-full max-w-[1200px] mx-auto">
      {products.length === 0 ? (
        <p className="text-white col-span-full font-sans">No products found.</p>
      ) : (
        products.map((p) => (
          <SellerProductCard key={p.id} p={p} />
        ))
      )}
    </div>
  );
}
