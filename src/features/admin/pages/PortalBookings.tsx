import { Search, Filter, MoreHorizontal, CheckCircle2, XCircle, Clock, AlertCircle, Calendar as CalendarIcon, Download } from "lucide-react";
import { cn } from "../../../common/utils";

const bookings = [
    {
        id: "ORD-7782-XJ",
        customer: { name: "John Wick", email: "babayaga@continental.com", avatar: "J" },
        car: "Porsche 911 GT3 RS",
        dates: { start: "Feb 10, 2026", end: "Feb 12, 2026", duration: "2 days" },
        amount: 1850,
        status: "confirmed",
        location: "San Diego Airport"
    },
    {
        id: "ORD-9921-MC",
        customer: { name: "Sarah Connor", email: "sarah@resistance.org", avatar: "S" },
        car: "Mercedes-AMG GT",
        dates: { start: "Feb 14, 2026", end: "Feb 18, 2026", duration: "4 days" },
        amount: 2450,
        status: "pending",
        location: "Los Angeles (LAX)"
    },
    {
        id: "ORD-8823-TS",
        customer: { name: "Tony Stark", email: "tony@stark.com", avatar: "T" },
        car: "Tesla Model S Plaid",
        dates: { start: "Jan 28, 2026", end: "Feb 05, 2026", duration: "8 days" },
        amount: 3200,
        status: "active",
        location: "San Francisco (SFO)"
    },
    {
        id: "ORD-1122-BW",
        customer: { name: "Bruce Wayne", email: "bruce@wayneent.com", avatar: "B" },
        car: "BMW M4 Competition",
        dates: { start: "Mar 01, 2026", end: "Mar 03, 2026", duration: "2 days" },
        amount: 950,
        status: "cancelled",
        location: "Gotham City"
    },
    {
        id: "ORD-3344-ER",
        customer: { name: "Ellen Ripley", email: "ripley@nostromo.com", avatar: "E" },
        car: "Range Rover Sport",
        dates: { start: "Mar 10, 2026", end: "Mar 15, 2026", duration: "5 days" },
        amount: 1500,
        status: "confirmed",
        location: "San Diego Downtown"
    },
];

export const PortalBookings = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">Bookings & Reservations</h1>
                    <p className="text-slate-500 dark:text-slate-400">View and manage all rental reservations.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                        <Download size={18} />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                        <Filter size={18} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search by order ID, customer, or car..."
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                />
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Dates</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Total</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                            {booking.id}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                                                {booking.customer.avatar}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{booking.customer.name}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-500">{booking.customer.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{booking.car}</p>
                                        <p className="text-xs text-slate-500">{booking.location}</p>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <CalendarIcon size={14} className="text-slate-400" />
                                            <span>{booking.dates.start}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1 pl-6">{booking.dates.duration}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border",
                                            booking.status === "confirmed" && "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
                                            booking.status === "pending" && "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
                                            booking.status === "active" && "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
                                            booking.status === "cancelled" && "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
                                        )}>
                                            {booking.status === "confirmed" && <CheckCircle2 size={12} />}
                                            {booking.status === "pending" && <AlertCircle size={12} />}
                                            {booking.status === "active" && <Clock size={12} />}
                                            {booking.status === "cancelled" && <XCircle size={12} />}
                                            <span className="capitalize">{booking.status}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">${booking.amount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
