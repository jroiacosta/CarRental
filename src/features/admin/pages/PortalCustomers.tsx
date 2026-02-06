import { Filter, MoreHorizontal, Mail, Phone, MapPin } from "lucide-react";

const customers = [
    {
        id: 1,
        name: "John Wick",
        email: "babayaga@continental.com",
        phone: "+1 (555) 010-9988",
        location: "New York, NY",
        totalBookings: 12,
        totalSpent: "$14,250",
        status: "Active",
        role: "VIP"
    },
    {
        id: 2,
        name: "Sarah Connor",
        email: "sarah@resistance.org",
        phone: "+1 (555) 303-4455",
        location: "Los Angeles, CA",
        totalBookings: 5,
        totalSpent: "$4,800",
        status: "Active",
        role: "Renter"
    },
    {
        id: 3,
        name: "Tony Stark",
        email: "tony@stark.com",
        phone: "+1 (555) 888-7777",
        location: "Malibu, CA",
        totalBookings: 45,
        totalSpent: "$152,000",
        status: "Active",
        role: "Platinum"
    },
    {
        id: 4,
        name: "Bruce Wayne",
        email: "bruce@wayneent.com",
        phone: "+1 (555) 777-6666",
        location: "Gotham, NJ",
        totalBookings: 8,
        totalSpent: "$12,400",
        status: "Suspended",
        role: "Renter"
    },
];

export const PortalCustomers = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">Customer Management</h1>
                    <p className="text-slate-500 dark:text-slate-400">View and manage customer profiles.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors font-medium shadow-sm">
                        <Mail size={18} />
                        Email All
                    </button>
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
                            {customers.map((customer) => (
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
                                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
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
