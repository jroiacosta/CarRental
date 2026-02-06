import { Link, useParams } from "@tanstack/react-router";
import {
    ChevronLeft,
    Gauge,
    Fuel,
    Zap,
    History,
    CheckCircle2,
    Clock,
    ArrowUpRight,
    Wrench,
    TrendingUp,
    ShieldCheck,
    Search,
    MapPin
} from "lucide-react";
import { cn } from "../../../common/utils";

export const PortalCarDetails = () => {
    const { carId } = useParams({ from: '/portal/cars/$carId' });

    // Mock Car Data
    const car = {
        id: carId,
        name: "Porsche 911 GT3 RS",
        plate: "CA 8829X",
        status: "Active",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop",
        category: "Sports",
        price: 1200,
        fuel: "Premium",
        speed: "198 mph",
        engine: "4.0L Flat-6",
        transmission: "PDK",
        lastService: "Jan 15, 2026",
        nextService: "Jun 15, 2026",
        health: "Excelent",
        stats: {
            totalBookings: 24,
            revenue: 28800,
            activeDays: 142,
            utilization: "85%"
        },
        bookingHistory: [
            { id: "ORD-7782-XJ", customer: "John Wick", customerAvatar: "J", date: "Feb 10, 2026", duration: "2 days", amount: 2400, status: "active" },
            { id: "ORD-9921-MC", customer: "Sarah Connor", customerAvatar: "S", date: "Jan 28, 2026", duration: "5 days", amount: 6000, status: "completed" },
            { id: "ORD-1122-BW", customer: "Bruce Wayne", customerAvatar: "B", date: "Jan 15, 2026", duration: "3 days", amount: 3600, status: "completed" },
        ]
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Nav */}
            <div className="flex items-center gap-4">
                <Link to="/portal/cars" className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                    <ChevronLeft size={24} />
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">{car.name}</h1>
                        <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                            car.status === "Active" && "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400",
                            car.status === "Available" && "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400",
                            car.status === "Maintenance" && "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400",
                        )}>
                            {car.status}
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Plate: {car.plate} • {car.category} Category</p>
                </div>

                <div className="ml-auto flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        Edit Specs
                    </button>
                    <button className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl transition-colors shadow-lg shadow-slate-900/20">
                        Manage Maintenance
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Bookings", value: car.stats.totalBookings, icon: History, color: "text-blue-500" },
                    { label: "Total Revenue", value: `$${car.stats.revenue.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-500" },
                    { label: "Utilization Rate", value: car.stats.utilization, icon: Gauge, color: "text-amber-500" },
                    { label: "Vehicle Health", value: car.health, icon: ShieldCheck, color: "text-purple-500" },
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
                {/* Car Image & Specs */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="aspect-video relative overflow-hidden group">
                            <img
                                src={car.image}
                                alt={car.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-2xl font-bold text-white font-heading">{car.name}</h3>
                                <div className="flex gap-4 mt-2">
                                    <div className="flex items-center gap-2 text-slate-200 text-sm">
                                        <Fuel size={14} className="text-orange-500" />
                                        {car.fuel}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-200 text-sm">
                                        <Zap size={14} className="text-yellow-500" />
                                        {car.speed}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-200 text-sm">
                                        <Gauge size={14} className="text-blue-500" />
                                        {car.category}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Performance Specs</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Engine</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{car.engine}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Transmission</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{car.transmission}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Max Speed</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{car.speed}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="md:border-l border-slate-100 dark:border-slate-800 md:pl-8">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Maintenance Status</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 flex items-center gap-1"><Wrench size={14} /> Last Service</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{car.lastService}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 flex items-center gap-1"><Clock size={14} /> Next Service</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{car.nextService}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 flex items-center gap-1"><CheckCircle2 size={14} /> Health</span>
                                        <span className="font-bold text-emerald-500">{car.health}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="md:border-l border-slate-100 dark:border-slate-800 md:pl-8">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Rental Pricing</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Base Price</span>
                                        <span className="font-bold text-slate-900 dark:text-white">${car.price}/day</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Discount Week</span>
                                        <span className="font-bold text-emerald-500">-15%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Security Deposit</span>
                                        <span className="font-bold text-slate-900 dark:text-white">$5,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking History Table */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                <History size={20} className="text-slate-400" />
                                Rental History
                            </h3>
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search history..."
                                    className="pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-lg text-xs outline-none focus:ring-1 focus:ring-red-500"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-body">
                                <thead className="bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800/50">
                                    <tr>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rental Period</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Amount</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                    {car.bookingHistory.map((booking) => (
                                        <tr key={booking.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold font-heading text-slate-600 dark:text-slate-400">
                                                        {booking.customerAvatar}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{booking.customer}</p>
                                                        <p className="text-[10px] font-mono text-slate-500 uppercase mt-1">{booking.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm dark:text-slate-300">{booking.date}</p>
                                                <p className="text-[10px] text-slate-500">{booking.duration}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                                ${booking.amount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                                    booking.status === "active" && "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
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

                {/* Tracking & Usage Sidebar */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Live Tracking</h3>
                        <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 relative overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Map mockup" />
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white dark:border-slate-900 animate-pulse shadow-lg" />
                                <span className="mt-2 text-[10px] font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded shadow">CURRENT POSITION</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50">
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase">Location</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Santa Monica Pier</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                    <Gauge size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase">Current Speed</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">45 mph</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Service Summary</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                    <CheckCircle2 size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Tires Status</p>
                                    <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full w-[85%] bg-emerald-500" />
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-emerald-500">85%</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                    <ShieldCheck size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Safety Systems</p>
                                    <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full w-full bg-emerald-500" />
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-emerald-500">100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
