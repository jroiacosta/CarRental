import { APP_CONFIG } from "../../../config/constants";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
        { name: "Home", href: "#home" },
        { name: "Our Fleet", href: "#fleet" },
        { name: "Details", href: "#details" },
        { name: "Contact", href: "#contact" },
    ];

    const getDashboardLink = () => {
        if (role === 'admin') return "/portal/dashboard";
        if (role === 'renter') return "/renter/dashboard";
        return "/login";
    };

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);

        const targetHash = href.replace('#', '');

        if (location.pathname !== '/') {
            navigate({ to: '/', hash: targetHash });
            return;
        }

        const element = document.getElementById(targetHash);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => scrollToSection(e, "#home")}
                        className="flex items-center gap-2"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/30">
                            F
                        </div>
                        <span className="font-heading font-bold text-2xl text-white tracking-tight">
                            {APP_CONFIG.BRAND_NAME}
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="text-slate-300 hover:text-white font-medium transition-colors text-sm font-heading relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full" />
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <Link to={getDashboardLink()} className="text-white font-bold hover:text-red-500 transition-colors">
                                My Account
                            </Link>
                        ) : (
                            <Link to="/login" className="text-white font-bold hover:text-red-500 transition-colors">
                                Sign In
                            </Link>
                        )}
                        <button className="btn-primary shadow-red-500/20 shadow-lg border border-red-500/50">
                            Book Now
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-300 hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-slate-900 border-t border-white/10"
                >
                    <div className="px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="block text-slate-300 hover:text-white font-medium text-lg"
                            >
                                {link.name}
                            </a>
                        ))}
                        <hr className="border-white/10" />
                        <div className="flex flex-col gap-3">
                            {isAuthenticated ? (
                                <Link to={getDashboardLink()} className="text-white font-semibold hover:text-red-500 text-left py-2">
                                    My Account
                                </Link>
                            ) : (
                                <Link to="/login" className="text-white font-semibold hover:text-red-500 text-left py-2">
                                    Sign In
                                </Link>
                            )}
                            <button className="btn-primary w-full text-center">
                                Book Now
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
};
