import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
    LayoutDashboard,
    LogOut,
    History,
    User,
    ChevronRight,
} from "lucide-react";
import { cn } from "../../../common/utils";
import { auth } from "../../../common/auth";

export const RenterLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate({ to: "/login" });
    };

    const sidebarItems = [
        { icon: LayoutDashboard, label: "Dashboard", to: "/renter/dashboard" },
        { icon: History, label: "Orders / Bookings", to: "/renter/bookings" },
        { icon: User, label: "Account Details", to: "/renter/profile" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 font-body text-slate-100">
            {/* Header Removed as per user request */}

            {/* Header Removed as per user request */}

            {/* Page Header (Clean Dark Mode Style) */}
            <div className="bg-slate-900 border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
                    <h1 className="text-4xl font-heading font-bold text-white mb-2">My Account</h1>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} className="text-slate-600" />
                        <span className="text-white font-medium">My Account</span>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Account Navigation (Sidebar) */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <nav className="space-y-1">
                            {sidebarItems.map((item) => {
                                const isActive = location.pathname === item.to;
                                return (
                                    <Link
                                        key={item.label}
                                        to={item.to}
                                        className={cn(
                                            "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border",
                                            isActive
                                                ? "bg-white/5 text-white border-white/10 shadow-lg shadow-black/20 backdrop-blur-sm"
                                                : "text-slate-400 border-transparent hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon size={18} className={isActive ? "text-red-500" : "text-slate-500 group-hover:text-slate-300"} />
                                            <span>{item.label}</span>
                                        </div>
                                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />}
                                    </Link>
                                );
                            })}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-red-500 rounded-xl transition-all duration-300 mt-6 group border border-transparent hover:border-white/5"
                            >
                                <LogOut size={18} className="text-slate-500 group-hover:text-red-500 transition-colors" />
                                <span>Logout</span>
                            </button>
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1 min-w-0">
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 lg:p-8 relative">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
