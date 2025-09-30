import '@/app/globals.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
    <>
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
    </div>
    </>
    )
}