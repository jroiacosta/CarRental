import { APP_CONFIG } from "../../../config/constants";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight, User, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "@tanstack/react-router";
import { auth } from "../../../common/auth";
import { cn } from "../../../common/utils";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const accountRef = useRef<HTMLDivElement>(null);
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

    const handleLogout = () => {
        auth.logout();
        setAccountMenuOpen(false);
        setIsOpen(false);
        navigate({ to: "/login" });
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountMenuOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

                    {/* Desktop Right: Register or My Account dropdown */}
                    <div className="hidden md:flex items-center shrink-0">
                        {isAuthenticated ? (
                            <div ref={accountRef} className="relative">
                                <button
                                    onClick={() => setAccountMenuOpen((v) => !v)}
                                    className={cn(
                                        "flex items-center gap-2 text-white font-medium transition-colors text-sm rounded-lg px-3 py-2 hover:bg-white/10",
                                        accountMenuOpen && "bg-white/10"
                                    )}
                                >
                                    <User size={18} />
                                    My Account
                                    <ChevronDown size={14} className={cn("transition-transform", accountMenuOpen && "rotate-180")} />
                                </button>
                                {accountMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-52 py-2 bg-slate-900 border border-white/10 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <Link
                                            to={getDashboardLink()}
                                            onClick={() => setAccountMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                                        >
                                            <LayoutDashboard size={18} className="shrink-0" />
                                            {role === "admin" ? "Portal Dashboard" : "My Dashboard"}
                                        </Link>
                                        <div className="border-t border-white/10 my-1" />
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                                        >
                                            <LogOut size={18} className="shrink-0" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
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
                            <>
                                <div className="flex items-center gap-2 py-2 px-1 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                    <User size={14} />
                                    My Account
                                </div>
                                <Link
                                    to={getDashboardLink()}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 py-2.5 pl-4 text-slate-300 hover:text-white font-medium"
                                >
                                    <LayoutDashboard size={18} className="shrink-0" />
                                    {role === "admin" ? "Portal Dashboard" : "My Dashboard"}
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => { handleLogout(); }}
                                    className="flex items-center gap-3 w-full py-2.5 pl-4 text-left text-red-400 hover:text-red-300 font-medium"
                                >
                                    <LogOut size={18} className="shrink-0" />
                                    Logout
                                </button>
                            </>
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
