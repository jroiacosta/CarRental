import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
    LayoutDashboard,
    Car,
    CalendarCheck,
    Users,
    Settings,
    LogOut,
    Menu,
    Bell,
    Search,
    X,
    Home,
    Moon,
    Sun,
    ChevronDown
} from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { cn } from "../../../common/utils";
import { auth } from "../../../common/auth";
import { useTheme } from "../../../common/useTheme";

const SidebarItem = ({
    icon: Icon,
    label,
    to,
    isActive
}: {
    icon: any,
    label: string,
    to: string,
    isActive: boolean
}) => {
    return (
        <Link
            to={to}
            className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group mb-1",
                isActive
                    ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            )}
        >
            <Icon size={20} className={cn(
                isActive ? "text-red-500 dark:text-red-400" : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
            )} />
            <span>{label}</span>
        </Link>
    );
};

const allSearchItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/portal/dashboard", keywords: "dashboard home" },
    { icon: Car, label: "Cars Management", to: "/portal/cars", keywords: "cars fleet vehicles management" },
    { icon: CalendarCheck, label: "Bookings", to: "/portal/bookings", keywords: "bookings reservations calendar orders" },
    { icon: Users, label: "Customers", to: "/portal/customers", keywords: "customers users clients" },
    { icon: Settings, label: "Settings", to: "/portal/settings", keywords: "settings system config" },
];

export const PortalLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const notifications = [
        {
            id: 1,
            type: 'booking',
            title: 'New Booking',
            message: 'John Wick booked Porsche 911 GT3 RS for 2 days.',
            time: '5 mins ago',
            isRead: false
        },
        {
            id: 2,
            type: 'rental_end',
            title: 'Rental Nearing End',
            message: "Sarah Connor's rental for Mercedes-AMG GT ends in 1 hour.",
            time: '25 mins ago',
            isRead: false
        },
        {
            id: 3,
            type: 'report',
            title: 'Issue Reported',
            message: 'Bruce Wayne reported a flat tire on Tesla Model S Plaid.',
            time: '1 hour ago',
            isRead: true
        }
    ];

    const handleLogout = () => {
        auth.logout();
        navigate({ to: "/login" });
    };

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", to: "/portal/dashboard" },
        { icon: Car, label: "Cars Management", to: "/portal/cars" },
        { icon: CalendarCheck, label: "Bookings", to: "/portal/bookings" },
        { icon: Users, label: "Customers", to: "/portal/customers" },
    ];

    const searchResults = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return allSearchItems;
        return allSearchItems.filter(
            (item) =>
                item.label.toLowerCase().includes(q) ||
                item.keywords.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    const showSearchDropdown = searchFocused && (searchQuery.length > 0 || searchResults.length > 0);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchFocused(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={cn(
            "min-h-screen bg-slate-50 dark:bg-slate-950 flex font-body transition-colors duration-300",
            theme
        )}>
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transition-transform duration-300 lg:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                        <img
                            src="/images/logo.png"
                            alt="Portal Logo"
                            className="w-8 h-8 object-contain mr-3"
                        />
                        <span className="font-heading font-bold text-xl text-slate-900 dark:text-white">Portal</span>
                        <button
                            className="ml-auto lg:hidden text-slate-400 hover:text-slate-600"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 py-6 px-4 overflow-y-auto">
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-3">
                            Menu
                        </p>
                        <nav>
                            {menuItems.map((item) => (
                                <SidebarItem
                                    key={item.label}
                                    {...item}
                                    isActive={location.pathname === item.to || location.pathname.startsWith(item.to + "/")}
                                />
                            ))}
                        </nav>

                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-8 mb-4 px-3">
                            System
                        </p>
                        <nav>
                            <SidebarItem
                                icon={Settings}
                                label="Settings"
                                to="/portal/settings"
                                isActive={location.pathname === "/portal/settings" || location.pathname.startsWith("/portal/settings/")}
                            />
                        </nav>
                    </div>

                    {/* User Profile / Logout */}
                    <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-3 py-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                {/* Topbar */}
                <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={20} />
                        </button>

                        {/* Search content / menu */}
                        <div ref={searchRef} className="hidden sm:block relative w-64">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                                placeholder="Search menu... (e.g. bookings, cars)"
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500/50 outline-none placeholder:text-slate-500"
                            />
                            {showSearchDropdown && (
                                <div className="absolute left-0 right-0 top-full mt-1 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                    <p className="px-4 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Go to
                                    </p>
                                    {searchResults.length === 0 ? (
                                        <p className="px-4 py-3 text-sm text-slate-500">No matches</p>
                                    ) : (
                                        searchResults.map((item) => (
                                            <Link
                                                key={item.to}
                                                to={item.to}
                                                onClick={() => { setSearchQuery(""); setSearchFocused(false); }}
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                                                    location.pathname === item.to || location.pathname.startsWith(item.to + "/")
                                                        ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 font-semibold"
                                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                )}
                                            >
                                                <item.icon size={18} className="shrink-0" />
                                                {item.label}
                                            </Link>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="flex items-center gap-4">
                        {/* Go to Landing Page */}
                        <Link
                            to="/"
                            className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="Return to Home"
                        >
                            <Home size={20} />
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="Toggle Dark Mode"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={cn(
                                    "relative p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors",
                                    showNotifications && "bg-slate-100 dark:bg-slate-800 text-red-500"
                                )}
                            >
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900" />
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowNotifications(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
                                            <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                                            <button className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:text-red-400 transition-colors">
                                                Mark all as read
                                            </button>
                                        </div>
                                        <div className="max-h-[400px] overflow-y-auto">
                                            {notifications.map((n) => (
                                                <div
                                                    key={n.id}
                                                    className={cn(
                                                        "p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group",
                                                        !n.isRead && "bg-blue-50/30 dark:bg-blue-500/5"
                                                    )}
                                                >
                                                    <div className="flex gap-3">
                                                        <div className={cn(
                                                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border shadow-sm",
                                                            n.type === 'booking' && "bg-blue-50 text-blue-500 border-blue-100 dark:bg-blue-500/10 dark:border-blue-500/20",
                                                            n.type === 'rental_end' && "bg-amber-50 text-amber-500 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20",
                                                            n.type === 'report' && "bg-red-50 text-red-500 border-red-100 dark:bg-red-500/10 dark:border-red-500/20",
                                                        )}>
                                                            {n.type === 'booking' && <CalendarCheck size={18} />}
                                                            {n.type === 'rental_end' && <Bell size={18} />}
                                                            {n.type === 'report' && <Car size={18} />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <p className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                                                                    {n.title}
                                                                </p>
                                                                <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                                                            </div>
                                                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                                                                {n.message}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800 text-center">
                                            <button className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                                View all notifications
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Profile dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => { setShowProfileMenu((v) => !v); setShowNotifications(false); }}
                                onBlur={() => setTimeout(() => setShowProfileMenu(false), 150)}
                                className="flex items-center gap-3 rounded-lg p-1.5 pr-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shrink-0">
                                    <img src="https://ui-avatars.com/api/?name=Papajroi&background=random" alt="Admin" />
                                </div>
                                <div className="hidden sm:block text-left text-sm">
                                    <p className="font-semibold text-slate-900 dark:text-white">Papajroi</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs">Portal Admin</p>
                                </div>
                                <ChevronDown size={16} className={cn("hidden sm:block text-slate-400 transition-transform", showProfileMenu && "rotate-180")} />
                            </button>
                            {showProfileMenu && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} aria-hidden />
                                    <div className="absolute right-0 top-full mt-2 w-56 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                                            <p className="font-semibold text-slate-900 dark:text-white">Papajroi</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Portal Admin</p>
                                        </div>
                                        <Link
                                            to="/portal/dashboard"
                                            onClick={() => setShowProfileMenu(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            <LayoutDashboard size={18} className="shrink-0" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/portal/settings"
                                            onClick={() => setShowProfileMenu(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            <Settings size={18} className="shrink-0" />
                                            Settings
                                        </Link>
                                        <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                                        <button
                                            onClick={() => { setShowProfileMenu(false); handleLogout(); }}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                        >
                                            <LogOut size={18} className="shrink-0" />
                                            Logout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-4 sm:p-6 max-w-[1600px] mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
