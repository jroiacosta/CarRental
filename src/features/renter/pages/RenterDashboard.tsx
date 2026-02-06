import { Link } from "@tanstack/react-router";
import { User, Package, MapPin, ArrowRight, Bell, CheckCircle2, Clock, Info, Trophy, Star, CreditCard, ChevronRight, Wallet } from "lucide-react";
import { auth } from "../../../common/auth";
import React from 'react';

interface UserData {
    username: string;
    role: string;
}

export default function RenterDashboard() {
    const user = auth.getUser() as UserData | null;
    const username = React.useMemo(() => user?.username || 'Renter', [user]);

    // Mock Notifications
    const notifications = [
        {
            id: 1,
            title: "Booking Confirmed",
            message: "Your reservation for the Porsche 911 GT3 RS has been confirmed.",
            time: "2 hours ago",
            icon: CheckCircle2,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            border: "border-emerald-400/20"
        },
        {
            id: 2,
            title: "Upcoming Trip",
            message: "Reminder: Your trip to San Diego starts in 3 days. View details.",
            time: "5 hours ago",
            icon: Clock,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            border: "border-blue-400/20"
        },
        {
            id: 3,
            title: "Policy Update",
            message: "We've updated our rental terms regarding late returns. Please review.",
            time: "1 day ago",
            icon: Info,
            color: "text-slate-400",
            bg: "bg-white/5",
            border: "border-white/10"
        }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Status Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-white mb-2">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">{username}</span>
                    </h2>
                    <p className="text-slate-400">Here's what's happening with your account today.</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
                    <div className="px-4 border-r border-white/10">
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Status</p>
                        <div className="flex items-center gap-2 text-amber-500 font-bold font-heading">
                            <Trophy size={16} />
                            Platinum Member
                        </div>
                    </div>
                    <div className="px-4">
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Points</p>
                        <div className="flex items-center gap-2 text-white font-bold font-heading">
                            <Star size={16} className="text-yellow-500" />
                            12,450 pts
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Content Column (2/3) */}
                <div className="xl:col-span-2 space-y-16">

                    {/* Active Rental Hero Card */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-heading font-bold text-white">Active Rental</h3>
                            <Link to="/renter/bookings" className="text-xs text-red-500 font-bold hover:text-red-400 flex items-center gap-1 transition-colors">
                                View Order <ChevronRight size={14} />
                            </Link>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 group">
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop"
                                alt="Porsche 911 GT3 RS"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />

                            <div className="relative z-20 p-8 flex flex-col justify-between h-full min-h-[280px]">
                                <div>
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-bold backdrop-blur-md mb-4">
                                        <Clock size={12} /> Live Now
                                    </span>
                                    <h3 className="text-3xl font-heading font-bold text-white mb-2">Porsche 911 GT3 RS</h3>
                                    <p className="text-slate-300 font-medium">San Diego Airport • Feb 10 - Feb 12</p>
                                </div>

                                <div className="flex items-center gap-4 mt-8">
                                    <button className="px-6 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/5">
                                        Extend Rental
                                    </button>
                                    <button className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10">
                                        Report Issue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Quick Access Grid */}
                    <section>
                        <h3 className="text-lg font-heading font-bold text-white mb-4">Quick Access</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { title: "Manage Bookings", icon: Package, color: "red", to: "/renter/bookings", desc: "View history & upcoming trips" },
                                { title: "My Profile", icon: User, color: "blue", to: "/renter/profile", desc: "Edit personal details" },
                                { title: "Saved Addresses", icon: MapPin, color: "emerald", to: "/renter/profile", desc: "Manage billing locations" },
                                { title: "Payment Methods", icon: CreditCard, color: "purple", to: "/renter/profile", desc: "Update cards & billing" },
                            ].map((item) => (
                                <Link
                                    key={item.title}
                                    to={item.to}
                                    className="group relative bg-slate-900/50 border border-white/5 hover:border-white/10 p-6 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 overflow-hidden"
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.color}-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-${item.color}-500/10`} />

                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className={`p-3 rounded-xl bg-${item.color}-500/10 text-${item.color}-400 group-hover:text-${item.color}-300 group-hover:scale-110 transition-all duration-300`}>
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold text-white mb-1 group-hover:text-${item.color}-400 transition-colors">{item.title}</h4>
                                            <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">{item.desc}</p>
                                        </div>
                                        <ArrowRight size={16} className={`ml-auto text-slate-600 group-hover:text-${item.color}-400 transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 duration-300`} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Column (1/3) */}
                <div className="space-y-8">
                    {/* Notifications Panel */}
                    <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <div className="flex items-center gap-2">
                                <Bell size={18} className="text-red-500" />
                                <h3 className="text-lg font-heading font-bold text-white">Activity</h3>
                            </div>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-slate-400 transition-colors">
                                <Info size={16} />
                            </button>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {notifications.map((n) => (
                                <div key={n.id} className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-white/10 transition-colors group">
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-1 p-1.5 rounded-full ${n.bg} ${n.color} border ${n.border} flex-shrink-0`}>
                                            <n.icon size={12} strokeWidth={3} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{n.title}</p>
                                            <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                                            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider mt-2">{n.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rewards Card */}
                    <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white overflow-hidden shadow-2xl shadow-indigo-900/50 group">
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                                <Wallet size={24} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-heading font-bold mb-2">Winter Rewards</h3>
                            <p className="text-indigo-200 text-sm mb-6 leading-relaxed">
                                Earn double points on all SUV rentals this weekend. Upgrade your tier faster!
                            </p>
                            <button className="w-full py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
                                View Offers
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
