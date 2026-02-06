import { Car, CreditCard, Users, Calendar } from "lucide-react";

export const DashboardStats = () => {
    const stats = [
        {
            label: "Total Cars",
            value: "125",
            change: "+12%",
            icon: Car,
            color: "bg-blue-500",
            trend: "up"
        },
        {
            label: "Active Bookings",
            value: "42",
            change: "+8%",
            icon: Calendar,
            color: "bg-green-500",
            trend: "up"
        },
        {
            label: "Total Revenue",
            value: "$24,500",
            change: "+24%",
            icon: CreditCard,
            color: "bg-purple-500",
            trend: "up"
        },
        {
            label: "New Customers",
            value: "18",
            change: "-2%",
            icon: Users,
            color: "bg-orange-500",
            trend: "down"
        },
    ];

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 text-${stat.color.replace('bg-', '')}`}>
                            <stat.icon size={20} className={stat.color.replace('bg-', 'text-')} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className={stat.trend === 'up' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                            {stat.change}
                        </span>
                        <span className="text-slate-400">vs last month</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
