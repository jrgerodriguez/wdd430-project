"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom"
import toast from "react-hot-toast";

const DeleteConfirmationModal = ({
  productName,
  onConfirm,
  onCancel,
}: {
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
<div className="fixed inset-0 z-[9999] bg-black/50 flex justify-center items-center">
  <div className="bg-gray-800 p-5 shadow-lg w-80 text-center ">
    <h3 className="font-semibold mb-4 text-gray-100 font-sans text-base">
      Are you sure you want to delete <span className="text-emerald-400">{productName}</span>?
    </h3>
    <div className="flex justify-between gap-4">
      <button
        className="flex-1 min-w-[70px] sm:min-w-[100px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-500 text-gray-300 font-light text-[0.7rem] sm:text-[0.8rem] hover:border-gray-400 hover:text-white transition-all tracking-wide text-center cursor-pointer"
        onClick={onConfirm}
      >
        Yes, Delete
      </button>
      <button
        className="flex-1 min-w-[70px] sm:min-w-[100px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-green-400 text-green-400 font-light text-[0.7rem] sm:text-[0.8rem] hover:border-green-500 hover:text-green-500 transition-all tracking-wide text-center cursor-pointer"
        onClick={onCancel}
      >
        No, Cancel
      </button>
    </div>
  </div>
</div>
,
    document.body
  );
};


type Props = { p: Product };

export default function SellerProductCard({p}: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

const handleDeleteProduct = async (productId: string) => {
  try {
    const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
    const data = await res.json(); // ya seguro que siempre habrá JSON

    if (!res.ok) throw new Error(data.error || "Failed to delete product");

    toast.success(data.message);
    setTimeout(() => {
      window.location.reload();
    }, 1000)
  } catch (err) {
    console.error(err);
    toast.error(err instanceof Error ? err.message : "Something went wrong");
  }
};

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
                    href={`/my-products/edit/${p.id}`}
                    className="flex-1 min-w-[70px] sm:min-w-[100px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-green-300 text-green-300 font-light text-[0.7rem] sm:text-[0.8rem] hover:border-green-400 hover:text-green-400 transition-all tracking-wide text-center"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex-1 min-w-[70px] sm:min-w-[100px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/70 text-white/70 font-light text-[0.7rem] sm:text-[0.8rem] hover:border-white/90 hover:text-white/90 transition-all tracking-wide text-center cursor-pointer"
                    >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
            {showDeleteModal && (
              <DeleteConfirmationModal
              productName={p.name}
              onConfirm={() => {
              handleDeleteProduct(p.id.toString());
              setShowDeleteModal(false);
                }}
              onCancel={() => setShowDeleteModal(false)}
              />
            )}
        </div>
    );
}