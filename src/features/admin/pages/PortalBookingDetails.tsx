import { Link, useParams } from "@tanstack/react-router";
import {
    ChevronLeft,
    Calendar,
    MapPin,
    CreditCard,
    CheckCircle2,
    AlertCircle,
    XCircle,
    Clock,
    FileText,
    Download,
    User,
    Car,
    Phone,
    Mail
} from "lucide-react";
import { cn } from "../../../common/utils";

export const PortalBookingDetails = () => {
    const { orderId } = useParams({ from: '/portal/bookings/$orderId' });

    // Mock Data - In a real app, fetch based on orderId
    const booking = {
        id: orderId,
        status: "pending",
        requestDate: "Feb 08, 2026",
        amount: 2450,
        customer: {
            name: "Sarah Connor",
            email: "sarah@resistance.org",
            phone: "+1 (555) 019-2834",
            avatar: "S",
            memberSince: "Aug 2024",
            tier: "Gold"
        },
        vehicle: {
            name: "Mercedes-AMG GT",
            image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop",
            plate: "XYZ-9876",
            location: "Los Angeles (LAX)"
        },
        dates: {
            start: "Feb 14, 2026",
            end: "Feb 18, 2026",
            duration: "4 days",
            pickupTime: "10:00 AM",
            returnTime: "10:00 AM"
        },
        attachments: [
            { name: "Drivers_License_Front.jpg", size: "2.4 MB", type: "image/jpeg" },
            { name: "Insurance_Card.pdf", size: "1.1 MB", type: "application/pdf" }
        ]
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Nav */}
            <div className="flex items-center gap-4">
                <Link to="/portal/bookings" className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                    <ChevronLeft size={24} />
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">Booking #{booking.id}</h1>
                        <span className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border capitalize",
                            booking.status === "confirmed" && "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
                            booking.status === "pending" && "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
                            booking.status === "active" && "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
                            booking.status === "cancelled" && "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
                        )}>
                            {booking.status === "confirmed" && <CheckCircle2 size={14} />}
                            {booking.status === "pending" && <AlertCircle size={14} />}
                            {booking.status === "active" && <Clock size={14} />}
                            {booking.status === "cancelled" && <XCircle size={14} />}
                            {booking.status}
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Requested on {booking.requestDate}</p>
                </div>

                <div className="ml-auto flex gap-3">
                    <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20">
                        Reject Order
                    </button>
                    <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
                        Approve Booking
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Details (2Cols) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Vehicle Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                <Car size={20} className="text-blue-500" />
                                Vehicle Details
                            </h3>
                            <span className="text-sm font-mono text-slate-500">{booking.vehicle.plate}</span>
                        </div>
                        <div className="p-6 flex flex-col sm:flex-row gap-6">
                            <img
                                src={booking.vehicle.image}
                                alt={booking.vehicle.name}
                                className="w-full sm:w-48 h-32 object-cover rounded-xl shadow-md"
                            />
                            <div className="space-y-4 flex-1">
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{booking.vehicle.name}</h4>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                                        <MapPin size={14} />
                                        {booking.vehicle.location}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                                        <p className="text-xs text-slate-500 font-bold uppercase">Pickup</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{booking.dates.start}</p>
                                        <p className="text-xs text-slate-500">{booking.dates.pickupTime}</p>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                                        <p className="text-xs text-slate-500 font-bold uppercase">Return</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{booking.dates.end}</p>
                                        <p className="text-xs text-slate-500">{booking.dates.returnTime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Attachments */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                <FileText size={20} className="text-amber-500" />
                                Attachments
                            </h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {booking.attachments.map((file, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                        <FileText size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-slate-900 dark:text-white truncate">{file.name}</p>
                                        <p className="text-xs text-slate-500">{file.size} • {file.type}</p>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                        <Download size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Details (1Col) */}
                <div className="space-y-8">

                    {/* Customer Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                <User size={20} className="text-purple-500" />
                                Customer
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                                    {booking.customer.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-slate-900 dark:text-white">{booking.customer.name}</p>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                        {booking.customer.tier} Member
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail size={16} className="text-slate-400" />
                                    <span className="text-slate-700 dark:text-slate-300">{booking.customer.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone size={16} className="text-slate-400" />
                                    <span className="text-slate-700 dark:text-slate-300">{booking.customer.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar size={16} className="text-slate-400" />
                                    <span className="text-slate-700 dark:text-slate-300">Member since {booking.customer.memberSince}</span>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                View Full Profile
                            </button>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                <CreditCard size={20} className="text-emerald-500" />
                                Payment Summary
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Rental Rate (4 Days)</span>
                                <span className="font-medium text-slate-900 dark:text-white">$2,200.00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Taxes & Fees</span>
                                <span className="font-medium text-slate-900 dark:text-white">$250.00</span>
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex justify-between items-center">
                                <span className="font-bold text-slate-900 dark:text-white">Total Amount</span>
                                <span className="font-bold text-xl text-emerald-500">${booking.amount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
