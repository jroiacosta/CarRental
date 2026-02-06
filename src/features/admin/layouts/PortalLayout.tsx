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
    Sun
} from "lucide-react";
import { useState } from "react";
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

export const PortalLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

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
                        <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-slate-900 font-bold text-lg mr-3">
                            P
                        </div>
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
                                    isActive={location.pathname === item.to}
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
                                isActive={location.pathname === "/portal/settings"}
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

                        {/* Search */}
                        <div className="hidden sm:flex items-center relative">
                            <Search size={18} className="absolute left-3 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search portal..."
                                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500 w-64 placeholder:text-slate-500"
                            />
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

                        <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900" />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                <img src="https://ui-avatars.com/api/?name=Papajroi&background=random" alt="Admin" />
                            </div>
                            <div className="hidden sm:block text-sm">
                                <p className="font-semibold text-slate-900 dark:text-white">Papajroi</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Portal Admin</p>
                            </div>
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
