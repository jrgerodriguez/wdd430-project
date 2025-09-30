import Image from "next/image";

export default function Hero() {
    return (
        <section
            className="relative flex items-center justify-center w-full"
            style={{ height: "calc(100vh - 4rem - 6rem)" }}
            aria-labelledby="hero-title"
        >
            {/* Background image */}
            <Image
                src="/images/hero-image.webp"
                alt="Handcrafted items"
                fill
                priority
                className="object-cover brightness-35"
            />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl">
                <h1
                    id="hero-title"
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
                >
                    Discover Unique Handcrafted Treasures
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-gray-200">
                    Connecting artisans and conscious consumers in one marketplace.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/marketplace"
                        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors"
                    >
                        Explore Marketplace
                    </a>
                    <a
                        href="/seller/products"
                        className="px-6 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white hover:text-black transition-colors"
                    >
                        My Products
                    </a>
                </div>
            </div>
        </section>
    );
}
