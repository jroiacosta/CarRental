import { useState, useMemo } from "react";
import { Filter, Mail, Phone, MapPin, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "../../../common/utils";

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50];

const allCustomers = [
    { id: 1, name: "John Wick", email: "babayaga@continental.com", phone: "+1 (555) 010-9988", location: "New York, NY", totalBookings: 12, totalSpent: "$14,250", status: "Active", role: "VIP" },
    { id: 2, name: "Sarah Connor", email: "sarah@resistance.org", phone: "+1 (555) 303-4455", location: "Los Angeles, CA", totalBookings: 5, totalSpent: "$4,800", status: "Active", role: "Renter" },
    { id: 3, name: "Tony Stark", email: "tony@stark.com", phone: "+1 (555) 888-7777", location: "Malibu, CA", totalBookings: 45, totalSpent: "$152,000", status: "Active", role: "Platinum" },
    { id: 4, name: "Bruce Wayne", email: "bruce@wayneent.com", phone: "+1 (555) 777-6666", location: "Gotham, NJ", totalBookings: 8, totalSpent: "$12,400", status: "Suspended", role: "Renter" },
    { id: 5, name: "Ellen Ripley", email: "ripley@nostromo.com", phone: "+1 (555) 222-3333", location: "San Diego, CA", totalBookings: 3, totalSpent: "$2,100", status: "Active", role: "Renter" },
    { id: 6, name: "Diana Prince", email: "diana@themyscira.com", phone: "+1 (555) 444-5555", location: "Washington DC", totalBookings: 22, totalSpent: "$28,900", status: "Active", role: "VIP" },
];

const statusOptions = ["Active", "Suspended"];
const roleOptions = ["Renter", "VIP", "Platinum"];

export const PortalCustomers = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredCustomers = useMemo(() => {
        let list = allCustomers;
        const q = search.trim().toLowerCase();
        if (q) {
            list = list.filter(
                (c) =>
                    c.name.toLowerCase().includes(q) ||
                    c.email.toLowerCase().includes(q) ||
                    c.phone.toLowerCase().includes(q) ||
                    c.location.toLowerCase().includes(q) ||
                    c.role.toLowerCase().includes(q)
            );
        }
        if (statusFilter) list = list.filter((c) => c.status === statusFilter);
        if (roleFilter) list = list.filter((c) => c.role === roleFilter);
        return list;
    }, [search, statusFilter, roleFilter]);

    const totalFiltered = filteredCustomers.length;
    const totalPages = Math.max(1, Math.ceil(totalFiltered / rowsPerPage));
    const paginatedCustomers = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredCustomers.slice(start, start + rowsPerPage);
    }, [filteredCustomers, page, rowsPerPage]);

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
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">Customer Management</h1>
                    <p className="text-slate-500 dark:text-slate-400">View and manage customer profiles.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors font-medium shadow-sm">
                        <Mail size={18} />
                        Email All
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
                            placeholder="Search by name, email, location..."
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
                            {statusOptions.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <select
                            value={roleFilter}
                            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
                            className="py-2.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 text-sm focus:ring-2 focus:ring-red-500 outline-none min-w-[120px]"
                        >
                            <option value="">All roles</option>
                            {roleOptions.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Stats</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                            {paginatedCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        No customers match your search or filters.
                                    </td>
                                </tr>
                            ) : (
                            paginatedCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-400">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-slate-900 dark:text-white">{customer.name}</p>
                                                    {customer.role === "VIP" && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">VIP</span>}
                                                    {customer.role === "Platinum" && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300">PLATINUM</span>}
                                                </div>
                                                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><MapPin size={10} /> {customer.location}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <div className="space-y-1">
                                            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2"><Mail size={12} /> {customer.email}</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2"><Phone size={12} /> {customer.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{customer.totalBookings} orders</p>
                                            <p className="text-xs text-slate-500">Lifetime: {customer.totalSpent}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${customer.status === "Active"
                                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                                            : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            to="/portal/customers/$customerId"
                                            params={{ customerId: customer.id.toString() }}
                                            className="text-white hover:text-white transition-colors px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold border border-slate-700"
                                        >
                                            View Details
                                        </Link>
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
