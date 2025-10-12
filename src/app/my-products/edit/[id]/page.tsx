import EditProductForm from "@/app/components/my-products/EditProductForm";
import { getProductById } from "@/lib/products";

interface PageProps {
  params: { id: string };
}

export default async function EditProductPage({ params }: PageProps) {

    const { id } = params;

    const product = await getProductById(Number(id))

    if (!product) {
        return <div>Product not found.</div>;
    }

    return <EditProductForm product={product} />
   
}
