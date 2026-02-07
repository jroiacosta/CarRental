import { APP_CONFIG } from "../../../config/constants";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { FeaturedCars } from "../components/FeaturedCars";
import { ContactSection } from "../components/ContactSection";
import { PromoModal } from "../components/PromoModal";
import { AboutUs } from "../components/AboutUs";


import { useEffect } from "react";

const LandingPage = () => {
    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;

        const timeoutId = setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 font-body">
            <Header />
            <Hero />
            <FeaturedCars />
            <AboutUs />
            <ContactSection />
            <PromoModal />

            <footer className="bg-slate-950 text-slate-500 py-8 text-center border-t border-white/5 text-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <p>&copy; {new Date().getFullYear()} {APP_CONFIG.COMPANY_NAME}. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
