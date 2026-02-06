import { motion } from "framer-motion";
import {
    TrendingUp,
    Users,
    Car,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    CheckCircle2,
    Clock,
    AlertCircle,
    Search,
    Filter
} from "lucide-react";
import { cn } from "../../../common/utils";

// Mock Data
const stats = [
    { title: "Total Revenue", value: "$124,592", change: "+12.5%", trend: "up", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Active Rentals", value: "45", change: "+4", trend: "up", icon: Car, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Pending Bookings", value: "12", change: "-2", trend: "down", icon: Calendar, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "New Customers", value: "28", change: "+14.2%", trend: "up", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
];

const cars = [
    { name: "Porsche 911 GT3 RS", plate: "CA 8829X", status: "Active", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop" },
    { name: "Mercedes-AMG GT", plate: "NY 2210Z", status: "Available", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60" },
    { name: "Tesla Model S Plaid", plate: "TX 4492A", status: "Maintenance", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=60" },
    { name: "BMW M4 Competition", plate: "FL 9921K", status: "Available", image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&auto=format&fit=crop&q=60" },
];

const bookings = [
    { id: "#ORD-7782", customer: "John Wick", car: "Porsche 911 GT3 RS", dates: "Feb 10 - Feb 12", amount: "$1,850", status: "Confirmed" },
    { id: "#ORD-9921", customer: "Sarah Connor", car: "Mercedes-AMG GT", dates: "Feb 14 - Feb 18", amount: "$2,450", status: "Pending" },
    { id: "#ORD-8823", customer: "Tony Stark", car: "Tesla Model S Plaid", dates: "Now - Feb 05", amount: "$1,200", status: "Active" },
    { id: "#ORD-1122", customer: "Bruce Wayne", car: "BMW M4 Comp", dates: "Feb 20 - Feb 22", amount: "$950", status: "Cancelled" },
    { id: "#ORD-3344", customer: "Ellen Ripley", car: "Range Rover Sport", dates: "Mar 01 - Mar 05", amount: "$1,500", status: "Confirmed" },
];

export const PortalDashboard = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">Dashboard Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400">Welcome back, here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors font-medium shadow-sm">
                        <ArrowDownRight size={18} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={stat.title}
                        className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                                <stat.icon size={22} />
                            </div>
                            <span className={cn(
                                "flex items-center text-xs font-bold px-2 py-1 rounded-full",
                                stat.trend === "up" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400" : "text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400"
                            )}>
                                {stat.change} {stat.trend === "up" ? <ArrowUpRight size={14} className="ml-1" /> : <ArrowDownRight size={14} className="ml-1" />}
                            </span>
                        </div>
                        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white font-heading">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Bookings List (2/3 width) */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Recent Bookings</h2>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search order ID..."
                                className="pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none w-48 transition-all"
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Car</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white font-mono">{booking.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400">
                                                    {booking.customer.charAt(0)}
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{booking.customer}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden sm:table-cell text-sm text-slate-600 dark:text-slate-400">{booking.car}</td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className={cn(
                                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border",
                                                booking.status === "Confirmed" && "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
                                                booking.status === "Pending" && "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
                                                booking.status === "Active" && "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
                                                booking.status === "Cancelled" && "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
                                            )}>
                                                {booking.status === "Confirmed" && <CheckCircle2 size={12} />}
                                                {booking.status === "Pending" && <AlertCircle size={12} />}
                                                {booking.status === "Active" && <Clock size={12} />}
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-bold text-slate-900 dark:text-white">{booking.amount}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Fleet Overview (1/3 width) */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Live Fleet Status</h2>
                        <a href="#" className="text-xs font-semibold text-red-600 hover:text-red-700 dark:text-red-400">View All</a>
                    </div>

                    <div className="space-y-4">
                        {cars.map((car) => (
                            <div key={car.plate} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-red-500/30 transition-all group flex gap-4">
                                <div className="w-24 h-24 sm:w-32 bg-slate-100 dark:bg-slate-950 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 line-clamp-1">{car.name}</h4>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{car.plate}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                                            car.status === "Active" && "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
                                            car.status === "Available" && "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
                                            car.status === "Maintenance" && "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
                                        )}>
                                            {car.status}
                                        </span>
                                        <button className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors">
                                            Manage
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Quick Add Card */}
                        <button className="w-full border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-all gap-2 h-24">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <Car size={16} />
                            </div>
                            <span className="text-xs font-bold">Add New Vehicle</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
