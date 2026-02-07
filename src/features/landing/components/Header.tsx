import { APP_CONFIG } from "../../../config/constants";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "@tanstack/react-router";
import { auth } from "../../../common/auth";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = auth.isAuthenticated();
    const role = auth.getRole();

    const navLinks = [
        { name: "About Us", href: "#details" },
        { name: "Cars", href: "#fleet" },
        { name: "Features", href: "#details" },
        { name: "Help", href: "#contact" },
    ];

    const getDashboardLink = () => {
        if (role === "admin") return "/portal/dashboard";
        if (role === "renter") return "/renter/dashboard";
        return "/login";
    };

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        const targetHash = href.replace("#", "");
        if (location.pathname !== "/") {
            navigate({ to: "/", hash: targetHash });
            return;
        }
        const element = document.getElementById(targetHash);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-slate-950 border-b border-white/5"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => scrollToSection(e, "#home")}
                        className="flex items-center gap-2 shrink-0"
                    >
                        <img src="/images/logo.png" alt="" className="w-9 h-9 object-contain" />
                        <span className="font-heading font-bold text-xl text-white tracking-tight">
                            {APP_CONFIG.BRAND_NAME}
                        </span>
                    </a>

                    {/* Desktop Nav - centered */}
                    <nav className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="text-slate-300 hover:text-white font-medium transition-colors text-sm"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Right: Register (link + arrow) or My Account */}
                    <div className="hidden md:flex items-center shrink-0">
                        {isAuthenticated ? (
                            <Link
                                to={getDashboardLink()}
                                className="text-white font-medium hover:text-red-400 transition-colors text-sm"
                            >
                                My Account
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-1.5 text-white font-medium hover:text-red-400 transition-colors text-sm"
                            >
                                Register
                                <ArrowRight size={16} />
                            </Link>
                        )}
                    </div>

                    <button
                        className="md:hidden p-2 text-slate-300 hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-slate-900 border-t border-white/10"
                >
                    <div className="px-4 py-5 space-y-1">
                        <a
                            href="#home"
                            onClick={(e) => scrollToSection(e, "#home")}
                            className="block py-3 text-slate-300 hover:text-white font-medium"
                        >
                            Home
                        </a>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="block py-3 text-slate-300 hover:text-white font-medium"
                            >
                                {link.name}
                            </a>
                        ))}
                        <hr className="border-white/10 my-3" />
                        {isAuthenticated ? (
                            <Link to={getDashboardLink()} className="block py-3 text-white font-medium">
                                My Account
                            </Link>
                        ) : (
                            <Link to="/login" className="inline-flex items-center gap-1.5 py-3 text-white font-medium">
                                Register
                                <ArrowRight size={16} />
                            </Link>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
};
