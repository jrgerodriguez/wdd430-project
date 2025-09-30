import Image from "next/image";
import { getProductById } from "@/lib/products";
import { Product } from "@/types/product";

type Props = {
    params: { id: string }
}

export default async function ProductDetailesPage({params}: Props) {
    const product: Product = await getProductById(Number(params.id))

  return (
    <section className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="relative w-full h-96">
          <Image
            src={product.image_url ?? "/images/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-500 mb-2">
            {product.category.replace("_", " ")}
          </p>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-[#FF6B35] mb-6">
            ${product.price.toFixed(2)}
          </p>

        </div>
      </div>
    </section>
  );

}

