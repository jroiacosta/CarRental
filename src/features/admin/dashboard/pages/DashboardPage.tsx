import { BookingsChart } from "../components/BookingsChart";
import { DashboardStats } from "../components/DashboardStats";
import { RevenueChart } from "../components/RevenueChart";

const DashboardPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-heading text-slate-900">Dashboard</h1>
                <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
            </div>

            <DashboardStats />

            <div className="grid lg:grid-cols-2 gap-6">
                <RevenueChart />
                <BookingsChart />
            </div>

            {/* Recent Activity Mock */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 font-heading">Recent Bookings</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-semibold">
                            <tr>
                                <th className="px-6 py-3">Car</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="px-6 py-3 font-medium text-slate-900">Tesla Model 3</td>
                                    <td className="px-6 py-3 text-slate-600">Alice Smith</td>
                                    <td className="px-6 py-3">
                                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                            Confirmed
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-slate-600">$350.00</td>
                                    <td className="px-6 py-3 text-slate-400">Oct 24, 2026</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
