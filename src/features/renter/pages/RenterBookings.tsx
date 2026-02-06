import { Link } from "@tanstack/react-router";
import { Calendar, MapPin, Clock, ArrowRight, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "../../../common/utils";

// Mock Data
const activeBookings = [
    {
        id: "ORD-7782-XJ",
        car: {
            name: "Porsche 911 GT3 RS",
            image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop",
            category: "Premium Sport"
        },
        dates: {
            start: "Feb 10, 2026",
            end: "Feb 12, 2026",
            days: 2
        },
        location: "San Diego Airport (SAN)",
        price: 1850,
        status: "confirmed", // confirmed, pending, active
        statusLabel: "Confirmed"
    }
];

const pastBookings = [
    {
        id: "ORD-9921-MC",
        car: {
            name: "Mercedes-AMG GT",
            image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60",
            category: "Luxury Coupe"
        },
        dates: {
            start: "Dec 15, 2025",
            end: "Dec 18, 2025",
            days: 3
        },
        location: "Los Angeles (LAX)",
        price: 2450,
        status: "completed",
        statusLabel: "Completed"
    },
    {
        id: "ORD-8823-TS",
        car: {
            name: "Tesla Model S Plaid",
            image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60",
            category: "Electric Performance"
        },
        dates: {
            start: "Nov 02, 2025",
            end: "Nov 05, 2025",
            days: 3
        },
        location: "San Francisco (SFO)",
        price: 1200,
        status: "cancelled",
        statusLabel: "Cancelled"
    }
];

const StatusBadge = ({ status, label }: { status: string, label: string }) => {
    const styles = {
        confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        active: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        completed: "bg-slate-800 text-slate-300 border-slate-700",
        cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
        pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    };

    const icons = {
        confirmed: CheckCircle2,
        active: Clock,
        completed: CheckCircle2,
        cancelled: XCircle,
        pending: AlertCircle
    };

    const Icon = icons[status as keyof typeof icons] || AlertCircle;

    return (
        <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border", styles[status as keyof typeof styles])}>
            <Icon size={12} />
            {label}
        </span>
    );
};

export default function RenterBookings() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-8">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-white">Your Bookings</h2>
                    <p className="text-slate-400 mt-1">Manage current reservations and view history.</p>
                </div>
                <Link to="/" className="btn-primary py-2.5 px-6 text-sm bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20 border-none">
                    Book New Car
                </Link>
            </div>

            {/* Active Bookings */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <div className="h-6 w-1 bg-red-600 rounded-full" />
                    <h3 className="text-lg font-bold font-heading text-white uppercase tracking-wide">Upcoming & Active</h3>
                </div>

                <div className="space-y-4">
                    {activeBookings.map((booking) => (
                        <div key={booking.id} className="bg-slate-900 rounded-2xl border border-white/5 overflow-hidden hover:shadow-xl hover:shadow-black/20 hover:border-red-500/30 transition-all duration-300 group">
                            <div className="flex flex-col md:flex-row">
                                {/* Image */}
                                <div className="md:w-72 h-48 md:h-auto relative">
                                    <img src={booking.car.image} alt={booking.car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent md:hidden" />
                                    <div className="absolute bottom-4 left-4 md:hidden">
                                        <StatusBadge status={booking.status} label={booking.statusLabel} />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="text-2xl font-bold font-heading text-white group-hover:text-red-500 transition-colors">{booking.car.name}</h4>
                                                <div className="hidden md:block">
                                                    <StatusBadge status={booking.status} label={booking.statusLabel} />
                                                </div>
                                            </div>
                                            <p className="text-slate-400 text-sm font-medium">{booking.car.category}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-red-500">${booking.price.toLocaleString()}</p>
                                            <p className="text-xs text-slate-500 font-mono">Total Estimated</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                                        <div className="flex items-start gap-3">
                                            <Calendar className="text-red-500 mt-1" size={18} />
                                            <div>
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Dates</p>
                                                <p className="text-white font-semibold">{booking.dates.start}</p>
                                                <p className="text-slate-400 text-sm">to {booking.dates.end}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <MapPin className="text-red-500 mt-1" size={18} />
                                            <div>
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Pick-up</p>
                                                <p className="text-white font-semibold">{booking.location}</p>
                                                <p className="text-slate-400 text-sm">Terminal 2, Curbside</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 sm:justify-end">
                                            <div className="w-full sm:w-auto">
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 sm:text-right">Actions</p>
                                                <div className="flex gap-2">
                                                    <button className="flex-1 sm:flex-none py-2 px-4 rounded-lg border border-white/10 text-slate-300 text-sm font-semibold hover:bg-white/5 hover:text-white transition-colors">
                                                        Modify
                                                    </button>
                                                    <button className="flex-1 sm:flex-none py-2 px-4 rounded-lg bg-white text-slate-900 text-sm font-bold hover:bg-slate-200 transition-colors shadow-lg shadow-white/5">
                                                        Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Past Bookings */}
            <section className="pt-8">
                <div className="flex items-center gap-2 mb-6">
                    <div className="h-6 w-1 bg-slate-700 rounded-full" />
                    <h3 className="text-lg font-bold font-heading text-slate-500 uppercase tracking-wide">Past Hitory</h3>
                </div>

                <div className="bg-slate-900 rounded-2xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-950 border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Car Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Dates</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Location</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {pastBookings.map((booking) => (
                                <tr key={booking.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img src={booking.car.image} alt={booking.car.name} className="w-12 h-12 rounded-lg object-cover hidden sm:block grayscale group-hover:grayscale-0 transition-all duration-300" />
                                            <div>
                                                <p className="font-bold text-white font-heading group-hover:text-red-500 transition-colors">{booking.car.name}</p>
                                                <p className="text-xs text-slate-500 font-mono">{booking.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        <div className="text-sm">
                                            <p className="text-slate-300 font-medium">{booking.dates.start}</p>
                                            <p className="text-slate-500 text-xs">{booking.dates.days} days</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="text-sm text-slate-400">{booking.location}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-white">${booking.price.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={booking.status} label={booking.statusLabel} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-600 hover:text-red-500 transition-colors">
                                            <ArrowRight size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
