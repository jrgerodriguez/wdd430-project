import Image from "next/image";
import { getProductById } from "@/lib/products";
import { Product } from "@/types/product";
import ProductReview from "@/app/components/marketplace/ProductReview";

type Props = {
    params: { id: string }
}

export default async function ProductDetailPage({ params }: Props) {
    const product: Product = await getProductById(Number(params.id));

    return (
        <section className="max-w-5xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 backdrop-blur-[20px] overflow-hidden">

                <div className="relative w-full h-96">
                    <Image
                        src={product.image_url ?? "/images/placeholder.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105 brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                <div className="p-6 flex flex-col justify-between text-white font-sans">
                    <div>
                        <p className="text-[0.65rem] sm:text-[0.7rem] tracking-widest uppercase text-white/50 mb-2">
                            {product.category.replace("_", " ")}
                        </p>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide mb-4">
                            {product.name}
                        </h1>

                        <p className="text-sm sm:text-[0.85rem] text-white/70 mb-6 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex justify-between items-center mt-auto">
                      <p className="text-xl sm:text-2xl font-semibold text-green-300 tracking-wide">
                        ${product.price.toFixed(2)}
                      </p>

                      <button className="px-5 py-2 rounded-full border border-white/30 text-white/70 font-semibold text-sm hover:text-white hover:border-white/50 hover:backdrop-blur-sm transition-all">
                        Add to Cart
                      </button>
                    </div>
                </div>
            </div>
            <ProductReview productId={params.id} />
        </section>
    );
}