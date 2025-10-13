import '@/app/globals.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { JwtPayloadCustom } from '@/types/jwt';
import SideBar from '../components/my-products/SideBar';


export default async function RootLayout({ children }: { children: React.ReactNode }) {

    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");
    const token = tokenCookie?.value;

    if (!token) return <p>No token found. Please log in.</p>;

    const verified = verifyToken(token);

    if (typeof verified !== "object" || verified === null || !("id" in verified)) {
        return <p>Invalid token. Please log in again.</p>;
    }

    const payload = verified as JwtPayloadCustom;
    // console.log(payload)

    const first_name = payload.first_name ?? "Seller";

    // console.log(payload)

    return (
    <>
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="min-h-screen px-6 py-5">
            {/* CHANGE TO WHITE THE TEXT COLOR */}
            <h1 className="text-3xl font-semibold tracking-wide font-sans text-center text-white">
                Hello, <span className="text-emerald-400">{first_name}</span>.
            </h1>
            <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto md:gap-6 gap-0">

            <SideBar />

                <main className="flex-1 py-5 md:pt-5 pt-0">
                {children}
                </main>

            </div>
        </div>
        <Footer />
    </div>

    </>
    )
}