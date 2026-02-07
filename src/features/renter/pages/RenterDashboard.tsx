import { Link } from "@tanstack/react-router";
import {
    User,
    Package,
    MapPin,
    ArrowRight,
    Bell,
    CheckCircle2,
    Clock,
    Info,
    Trophy,
    Star,
    CreditCard,
    ChevronRight,
    Wallet,
    Car,
    Calendar,
    HelpCircle,
} from "lucide-react";
import { auth } from "../../../common/auth";
import React from "react";

interface UserData {
    username: string;
    role: string;
}

const quickAccessItems: Array<{
    title: string;
    icon: React.ComponentType<{ size?: number }>;
    iconBg: string;
    iconColor: string;
    to: string;
    desc: string;
}> = [
    {
        title: "Manage Bookings",
        icon: Package,
        iconBg: "bg-red-500/10",
        iconColor: "text-red-400",
        to: "/renter/bookings",
        desc: "View history & upcoming trips",
    },
    {
        title: "My Profile",
        icon: User,
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-400",
        to: "/renter/profile",
        desc: "Edit personal details",
    },
    {
        title: "Saved Addresses",
        icon: MapPin,
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-400",
        to: "/renter/profile",
        desc: "Manage billing locations",
    },
    {
        title: "Payment Methods",
        icon: CreditCard,
        iconBg: "bg-purple-500/10",
        iconColor: "text-purple-400",
        to: "/renter/profile",
        desc: "Update cards & billing",
    },
];

export default function RenterDashboard() {
    const user = auth.getUser() as UserData | null;
    const username = React.useMemo(() => user?.username || "Renter", [user]);

    const notifications = [
        {
            id: 1,
            title: "Booking Confirmed",
            message: "Your reservation for the Porsche 911 GT3 RS has been confirmed.",
            time: "2 hours ago",
            icon: CheckCircle2,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            border: "border-emerald-400/20",
        },
        {
            id: 2,
            title: "Upcoming Trip",
            message: "Reminder: Your trip to San Diego starts in 3 days. View details.",
            time: "5 hours ago",
            icon: Clock,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            border: "border-blue-400/20",
        },
        {
            id: 3,
            title: "Policy Update",
            message: "We've updated our rental terms regarding late returns. Please review.",
            time: "1 day ago",
            icon: Info,
            color: "text-slate-400",
            bg: "bg-white/5",
            border: "border-white/10",
        },
    ];

    const hasActiveRental = true;
    const upcomingTrips = [
        { id: 1, car: "Mercedes-AMG GT", dates: "Feb 15 – Feb 18", location: "San Diego" },
        { id: 2, car: "McLaren 720S", dates: "Mar 1 – Mar 3", location: "LAX" },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Welcome + Primary CTA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                        Welcome back,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                            {username}
                        </span>
                    </h2>
                    <p className="text-slate-400 text-sm">Here’s what’s happening with your account.</p>
                </div>
                <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-colors shadow-lg shadow-red-900/30 border border-red-500/30"
                >
                    <Car size={18} />
                    Book a Car
                </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Bookings", value: "8", icon: Package, color: "text-red-400" },
                    { label: "Upcoming Trips", value: "2", icon: Calendar, color: "text-blue-400" },
                    { label: "Member Tier", value: "Platinum", icon: Trophy, color: "text-amber-400" },
                    { label: "Reward Points", value: "12,450", icon: Star, color: "text-yellow-400" },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 lg:p-5 hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-white/5">
                                <stat.icon size={20} className={stat.color} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white font-heading">{stat.value}</p>
                                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-10">
                    {/* Active Rental or Empty state */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-heading font-bold text-white">Active Rental</h3>
                            <Link
                                to="/renter/bookings"
                                className="text-xs text-red-500 font-bold hover:text-red-400 flex items-center gap-1 transition-colors"
                            >
                                View all <ChevronRight size={14} />
                            </Link>
                        </div>

                        {hasActiveRental ? (
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop"
                                    alt="Active rental"
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="relative z-20 p-6 sm:p-8 flex flex-col justify-between min-h-[260px]">
                                    <div>
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-bold backdrop-blur-md mb-3">
                                            <Clock size={12} /> Live Now
                                        </span>
                                        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-1">
                                            Porsche 911 GT3 RS
                                        </h3>
                                        <p className="text-slate-300 text-sm font-medium">
                                            San Diego Airport • Feb 10 – Feb 12
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 mt-6">
                                        <button
                                            type="button"
                                            className="px-5 py-2.5 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm"
                                        >
                                            Extend Rental
                                        </button>
                                        <button
                                            type="button"
                                            className="px-5 py-2.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 text-sm"
                                        >
                                            Report Issue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/30 p-10 text-center">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                                    <Car size={28} className="text-slate-500" />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">No active rental</h4>
                                <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
                                    You don’t have an active rental right now. Book a car to hit the road.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-colors"
                                >
                                    <Car size={18} />
                                    Browse Fleet
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* Upcoming trips */}
                    {upcomingTrips.length > 0 && (
                        <section>
                            <h3 className="text-lg font-heading font-bold text-white mb-4">Upcoming Trips</h3>
                            <div className="space-y-3">
                                {upcomingTrips.map((trip) => (
                                    <Link
                                        key={trip.id}
                                        to="/renter/bookings"
                                        className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:border-white/10 hover:bg-slate-900/70 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-lg bg-white/5">
                                                <Calendar size={18} className="text-red-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white group-hover:text-red-400 transition-colors">
                                                    {trip.car}
                                                </p>
                                                <p className="text-sm text-slate-500">
                                                    {trip.dates} • {trip.location}
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Quick Access */}
                    <section>
                        <h3 className="text-lg font-heading font-bold text-white mb-4">Quick Access</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {quickAccessItems.map((item) => (
                                <Link
                                    key={item.title}
                                    to={item.to}
                                    className="group flex items-center gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-all"
                                >
                                    <div
                                        className={`p-3 rounded-xl ${item.iconBg} ${item.iconColor} transition-transform group-hover:scale-105`}
                                    >
                                        <item.icon size={22} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-white mb-0.5">{item.title}</h4>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </div>
                                    <ArrowRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Activity / Notifications */}
                    <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <Bell size={18} className="text-red-500" />
                                <h3 className="text-lg font-heading font-bold text-white">Activity</h3>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {notifications.map((n) => (
                                <div
                                    key={n.id}
                                    className="p-4 rounded-xl bg-slate-950/50 border border-white/5 hover:border-white/10 transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`mt-0.5 p-1.5 rounded-full ${n.bg} ${n.color} border ${n.border} flex-shrink-0`}
                                        >
                                            <n.icon size={12} strokeWidth={3} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-slate-200">{n.title}</p>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{n.message}</p>
                                            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider mt-2">
                                                {n.time}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rewards */}
                    <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                        <div className="relative z-10">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                <Wallet size={20} />
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-2">Winter Rewards</h3>
                            <p className="text-indigo-200 text-sm mb-4 leading-relaxed">
                                Earn double points on SUV rentals this weekend.
                            </p>
                            <button
                                type="button"
                                className="w-full py-2.5 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors text-sm"
                            >
                                View Offers
                            </button>
                        </div>
                    </div>

                    {/* Help */}
                    <a
                        href="/#contact"
                        className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-colors group"
                    >
                        <div className="p-2 rounded-xl bg-white/5 text-slate-400 group-hover:text-red-400 transition-colors">
                            <HelpCircle size={18} />
                        </div>
                        <div>
                            <p className="font-bold text-white text-sm">Need help?</p>
                            <p className="text-xs text-slate-500">Contact support or visit FAQ</p>
                        </div>
                        <ChevronRight size={16} className="text-slate-500 ml-auto" />
                    </a>
                </div>
            </div>
        </div>
    );
}
