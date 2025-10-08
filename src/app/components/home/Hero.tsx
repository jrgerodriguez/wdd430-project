import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section
            className="relative flex items-center justify-center w-full"
            style={{ height: "calc(100vh - 4rem - 6rem)" }}
            aria-labelledby="hero-title"
        >
            {/* Background image */}
            <Image
                src="/images/hero-image.jpg"
                alt="Handcrafted items"
                fill
                priority
                className="object-cover brightness-50"
            />

            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl">
                <h1
                    id="hero-title"
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400 drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
                >
                    Discover Unique Handcrafted Treasures
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-amber-100/90 drop-shadow-md">
                    Connecting artisans and conscious consumers in one marketplace.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/marketplace"
                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-300 text-black shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 font-sams text-[0.94rem] font-semibold"
                    >
                        Explore Marketplace
                    </Link>
                    <Link
                        href="/seller/products"
                       className="px-6 py-3 rounded-lg border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black hover:scale-105 hover:shadow-lg transition-all duration-300 font-sams text-[0.94rem] font-semibold"
                    >
                        My Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
