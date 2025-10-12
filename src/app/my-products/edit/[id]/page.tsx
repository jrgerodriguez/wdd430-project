import EditProductForm from "@/app/components/my-products/EditProductForm";
import { getProductById } from "@/lib/products";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

interface PageProps {
  params: { id: string };
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = params;

  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  const token = tokenCookie?.value;

  if (!token) return <div>Please log in.</div>;

  const verified = verifyToken(token);
  if (typeof verified !== "object" || verified === null || !("id" in verified)) {
    return <div>Invalid token. Please log in again.</div>;
  }

  const userId = verified.id;
  const product = await getProductById(Number(id));

  if (!product) {
  return <div className="font-sans">Product not found.</div>;
  }

  if (product.seller_id !== Number(userId)) {
    return <div className="font-sans">You don’t have permission to edit this product.</div>;
  }

  return <EditProductForm product={product} />;
}
