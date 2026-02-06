import { Link, useParams } from "@tanstack/react-router";
import {
    ChevronLeft,
    Mail,
    Phone,
    MapPin,
    Calendar,
    CreditCard,
    Clock,
    CheckCircle2,
    User,
    ArrowUpRight
} from "lucide-react";
import { cn } from "../../../common/utils";

export const PortalCustomerDetails = () => {
    const { customerId } = useParams({ from: '/portal/customers/$customerId' });

    // Mock Customer Data
    const customer = {
        id: customerId,
        name: "John Wick",
        email: "babayaga@continental.com",
        phone: "+1 (555) 010-9988",
        location: "New York, NY",
        avatar: "J",
        memberSince: "Jan 2024",
        status: "Active",
        role: "VIP",
        stats: {
            totalBookings: 12,
            totalSpent: 14250,
            activeRentals: 1,
            avgRating: 4.9
        },
        recentBookings: [
            { id: "ORD-7782-XJ", car: "Porsche 911 GT3 RS", date: "Feb 10, 2026", amount: 1850, status: "confirmed" },
            { id: "ORD-5521-MC", car: "Mercedes-AMG GT", date: "Jan 12, 2026", amount: 2450, status: "completed" },
            { id: "ORD-3321-LB", car: "Lamborghini Huracán", date: "Dec 20, 2025", amount: 3200, status: "completed" },
        ]
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Nav */}
            <div className="flex items-center gap-4">
                <Link to="/portal/customers" className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                    <ChevronLeft size={24} />
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">{customer.name}</h1>
                        <span className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider",
                            customer.role === "VIP" ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20" : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                        )}>
                            {customer.role}
                        </span>
                        <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                            customer.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" : "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                        )}>
                            {customer.status}
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">ID: CST-{customer.id} • Member since {customer.memberSince}</p>
                </div>

                <div className="ml-auto flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        Edit Profile
                    </button>
                    <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20">
                        Suspend Account
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Bookings", value: customer.stats.totalBookings, icon: Calendar, color: "text-blue-500" },
                    { label: "Total Spent", value: `$${customer.stats.totalSpent.toLocaleString()}`, icon: CreditCard, color: "text-emerald-500" },
                    { label: "Active Rentals", value: customer.stats.activeRentals, icon: Clock, color: "text-amber-500" },
                    { label: "Trust Score", value: "98%", icon: CheckCircle2, color: "text-purple-500" },
                ].map((stat, i) => (
                    <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <stat.icon size={20} className={stat.color} />
                        </div>
                        <p className="text-2xl font-bold dark:text-white uppercase leading-tight tracking-tight">
                            {stat.value}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact & Personal Info */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                <User size={20} className="text-slate-400" />
                                Personal Information
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 text-3xl font-bold shadow-inner">
                                    {customer.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-xl text-slate-900 dark:text-white">{customer.name}</p>
                                    <p className="text-slate-500">Verified Identity</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email Address</span>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <Mail size={16} className="text-slate-400" />
                                        {customer.email}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Phone Number</span>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <Phone size={16} className="text-slate-400" />
                                        {customer.phone}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Primary Location</span>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <MapPin size={16} className="text-slate-400" />
                                        {customer.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking History */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                <Calendar size={20} className="text-slate-400" />
                                Recent Bookings
                            </h3>
                            <button className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest">
                                View All
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800/50">
                                    <tr>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vehicle</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                    {customer.recentBookings.map((booking) => (
                                        <tr key={booking.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{booking.car}</p>
                                                <p className="text-[10px] font-mono text-slate-500 uppercase">{booking.id}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {booking.date}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                                ${booking.amount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                                    booking.status === "confirmed" && "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
                                                    booking.status === "completed" && "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
                                                )}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    to="/portal/bookings/$orderId"
                                                    params={{ orderId: booking.id }}
                                                    className="p-2 text-slate-300 hover:text-red-500 transition-colors inline-block"
                                                >
                                                    <ArrowUpRight size={18} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
