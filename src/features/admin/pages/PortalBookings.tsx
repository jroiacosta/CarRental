import { useState, useMemo } from "react";
import { Search, Filter, CheckCircle2, XCircle, Clock, AlertCircle, Calendar as CalendarIcon, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../../common/utils";
import { Link } from "@tanstack/react-router";

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50];

const allBookings = [
    {
        id: "ORD-7782-XJ",
        customer: { name: "John Wick", email: "babayaga@continental.com", avatar: "J" },
        car: "Porsche 911 GT3 RS",
        dates: { start: "Feb 10, 2026", end: "Feb 12, 2026", duration: "2 days" },
        dateStartISO: "2026-02-10",
        dateEndISO: "2026-02-12",
        amount: 1850,
        status: "confirmed",
        location: "San Diego Airport"
    },
    {
        id: "ORD-9921-MC",
        customer: { name: "Sarah Connor", email: "sarah@resistance.org", avatar: "S" },
        car: "Mercedes-AMG GT",
        dates: { start: "Feb 14, 2026", end: "Feb 18, 2026", duration: "4 days" },
        dateStartISO: "2026-02-14",
        dateEndISO: "2026-02-18",
        amount: 2450,
        status: "pending",
        location: "Los Angeles (LAX)"
    },
    {
        id: "ORD-8823-TS",
        customer: { name: "Tony Stark", email: "tony@stark.com", avatar: "T" },
        car: "Tesla Model S Plaid",
        dates: { start: "Jan 28, 2026", end: "Feb 05, 2026", duration: "8 days" },
        dateStartISO: "2026-01-28",
        dateEndISO: "2026-02-05",
        amount: 3200,
        status: "active",
        location: "San Francisco (SFO)"
    },
    {
        id: "ORD-1122-BW",
        customer: { name: "Bruce Wayne", email: "bruce@wayneent.com", avatar: "B" },
        car: "BMW M4 Competition",
        dates: { start: "Mar 01, 2026", end: "Mar 03, 2026", duration: "2 days" },
        dateStartISO: "2026-03-01",
        dateEndISO: "2026-03-03",
        amount: 950,
        status: "cancelled",
        location: "Gotham City"
    },
    {
        id: "ORD-3344-ER",
        customer: { name: "Ellen Ripley", email: "ripley@nostromo.com", avatar: "E" },
        car: "Range Rover Sport",
        dates: { start: "Mar 10, 2026", end: "Mar 15, 2026", duration: "5 days" },
        dateStartISO: "2026-03-10",
        dateEndISO: "2026-03-15",
        amount: 1500,
        status: "confirmed",
        location: "San Diego Downtown"
    },
    {
        id: "ORD-5566-KR",
        customer: { name: "Kara Danvers", email: "kara@catco.com", avatar: "K" },
        car: "Porsche 911 GT3 RS",
        dates: { start: "Feb 20, 2026", end: "Feb 22, 2026", duration: "2 days" },
        dateStartISO: "2026-02-20",
        dateEndISO: "2026-02-22",
        amount: 2100,
        status: "pending",
        location: "National City"
    },
    {
        id: "ORD-7788-DK",
        customer: { name: "Diana Prince", email: "diana@themyscira.com", avatar: "D" },
        car: "Mercedes-AMG GT",
        dates: { start: "Mar 05, 2026", end: "Mar 08, 2026", duration: "3 days" },
        dateStartISO: "2026-03-05",
        dateEndISO: "2026-03-08",
        amount: 1890,
        status: "confirmed",
        location: "Washington DC"
    },
];

const uniqueCars = [...new Set(allBookings.map((b) => b.car))].sort();
const uniqueStatuses = ["confirmed", "pending", "active", "cancelled"] as const;

export const PortalBookings = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [carFilter, setCarFilter] = useState<string>("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredBookings = useMemo(() => {
        let list = allBookings;
        const q = search.trim().toLowerCase();
        if (q) {
            list = list.filter(
                (b) =>
                    b.id.toLowerCase().includes(q) ||
                    b.customer.name.toLowerCase().includes(q) ||
                    b.customer.email.toLowerCase().includes(q) ||
                    b.car.toLowerCase().includes(q) ||
                    b.location.toLowerCase().includes(q)
            );
        }
        if (statusFilter) list = list.filter((b) => b.status === statusFilter);
        if (carFilter) list = list.filter((b) => b.car === carFilter);
        if (dateFrom) list = list.filter((b) => (b as { dateEndISO?: string }).dateEndISO >= dateFrom);
        if (dateTo) list = list.filter((b) => (b as { dateStartISO?: string }).dateStartISO <= dateTo);
        return list;
    }, [search, statusFilter, carFilter, dateFrom, dateTo]);

    const totalFiltered = filteredBookings.length;
    const totalPages = Math.max(1, Math.ceil(totalFiltered / rowsPerPage));
    const paginatedBookings = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredBookings.slice(start, start + rowsPerPage);
    }, [filteredBookings, page, rowsPerPage]);

    const startRow = totalFiltered === 0 ? 0 : (page - 1) * rowsPerPage + 1;
    const endRow = Math.min(page * rowsPerPage, totalFiltered);

    const handleRowsPerPageChange = (value: number) => {
        setRowsPerPage(value);
        setPage(1);
    };

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
                </div>
            </div>

            {/* Search + Filters */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[200px] max-w-md">
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Search by order ID, customer, or car..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white text-sm"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Filter size={18} className="text-slate-500 shrink-0" />
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                            className="py-2.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                        >
                            <option value="">All statuses</option>
                            {uniqueStatuses.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <select
                            value={carFilter}
                            onChange={(e) => { setCarFilter(e.target.value); setPage(1); }}
                            className="py-2.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 text-sm focus:ring-2 focus:ring-red-500 outline-none min-w-[180px]"
                        >
                            <option value="">All vehicles</option>
                            {uniqueCars.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
                                className="py-2.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                            />
                            <span className="text-slate-400 text-sm">to</span>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
                                className="py-2.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                            />
                        </div>
                    </div>
                </div>
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
                            {paginatedBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        No bookings match your search or filters.
                                    </td>
                                </tr>
                            ) : (
                            paginatedBookings.map((booking) => (
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
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                to="/portal/bookings/$orderId"
                                                params={{ orderId: booking.id }}
                                                className="text-white hover:text-white transition-colors px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold border border-slate-700"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span>Show</span>
                        <select
                            value={rowsPerPage}
                            onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                            className="py-1.5 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                        >
                            {ROWS_PER_PAGE_OPTIONS.map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                        <span>entries</span>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                        Showing {startRow} to {endRow} of {totalFiltered} entries
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page <= 1}
                            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setPage(p)}
                                className={cn(
                                    "min-w-[36px] py-2 px-2 rounded-lg border text-sm font-medium transition-colors",
                                    p === page
                                        ? "bg-red-600 border-red-600 text-white"
                                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                )}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page >= totalPages}
                            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
