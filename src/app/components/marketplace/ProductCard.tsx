import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  return (
    <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02] bg-white/5 backdrop-blur-[20px] border border-white/10">
      

      <div className="relative w-full h-64">
        <Image
          src={product.image_url ?? "/images/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>


      <div className="p-5 flex flex-col flex-1 text-white font-sans">
        <p className="text-[0.65rem] sm:text-[0.7rem] tracking-widest uppercase text-white/70 mb-1">
          {product.category.replace("_", " ")}
        </p>

        <h2 className="text-sm sm:text-[0.95rem] md:text-base font-light tracking-wide line-clamp-2">
          {product.name}
        </h2>


        <div className="mt-2 flex justify-between items-center">
          <p className="text-[0.85rem] sm:text-sm font-semibold text-green-300 tracking-wide">
            ${product.price.toFixed(2)}
          </p>

          <Link
            href={`/marketplace/${product.id}`}
            className="px-3 py-1 rounded-full border border-white/30 text-white/70 font-light text-[0.7rem] sm:text-[0.75rem] hover:text-white hover:border-white/50 transition-all tracking-wide"
          >
            See Details
          </Link>
        </div>

      </div>

    </div>
  );
}
