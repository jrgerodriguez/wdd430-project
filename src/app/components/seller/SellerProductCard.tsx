import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

type Props = { p: Product };

export default function SellerProductCard({p}: Props) {
    return (
        <div key={p.id} className="relative w-full rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02] bg-white/5 backdrop-blur-[20px]">

            <div className="aspect-[1/1] w-full flex flex-col">


              <div className="relative w-full flex-[1_1_auto]">
                <Image
                  src={p.image_url ?? "/images/placeholder.jpg"}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>


              <div className="p-3 flex flex-col flex-[0_0_auto] text-white font-sans bg-white/5">
                <p className="text-[0.65rem] sm:text-[0.7rem] tracking-widest uppercase text-white/70 mb-1">
                  {p.category.replace("_", " ")}
                </p>

                <h2 className="text-sm sm:text-[0.95rem] md:text-base font-light tracking-wide line-clamp-2">
                  {p.name}
                </h2>

                <div className="mt-2 flex flex-wrap justify-between items-center gap-2">
                  <p className="text-[0.85rem] sm:text-sm font-semibold text-green-300 tracking-wide">
                    ${p.price.toFixed(2)}
                  </p>

                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">

                    <Link
                      href={`/marketplace/${p.id}`}
                      className="flex-1 min-w-[70px] sm:min-w-[100px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-green-300 text-green-300 font-light text-[0.7rem] sm:text-[0.8rem] hover:border-green-400 hover:text-green-400 transition-all tracking-wide text-center"
                    >
                      Edit
                    </Link>

                    <Link
                      href={`/marketplace/${p.id}`}
                      className="flex-1 min-w-[70px] sm:min-w-[100px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/70 text-white/70 font-light text-[0.7rem] sm:text-[0.8rem] hover:border-white/90 hover:text-white/90 transition-all tracking-wide text-center"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
    )
}