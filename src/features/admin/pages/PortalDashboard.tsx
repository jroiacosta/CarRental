import { motion } from "framer-motion";
import {
    TrendingUp,
    Users,
    ArrowUpRight,
    ArrowDownRight,
    CheckCircle2,
    Activity,
    DollarSign,
    Filter
} from "lucide-react";
import { cn } from "../../../common/utils";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { ReactNode } from "react";

// Mock Data for Nivo Line Chart
const revenueData = [
    {
        id: "Revenue",
        color: "hsl(348, 70%, 50%)",
        data: [
            { x: "Mon", y: 1200 },
            { x: "Tue", y: 2100 },
            { x: "Wed", y: 1800 },
            { x: "Thu", y: 3500 },
            { x: "Fri", y: 2800 },
            { x: "Sat", y: 4200 },
            { x: "Sun", y: 3800 },
        ]
    }
];

// Mock Data for Nivo Pie Chart
const fleetStatusData = [
    { id: "Active", label: "Active", value: 45, color: "hsl(142, 70%, 50%)" },
    { id: "Available", label: "Available", value: 30, color: "hsl(217, 91%, 60%)" },
    { id: "Maintenance", label: "Maintenance", value: 15, color: "hsl(38, 92%, 50%)" },
];

const stats = [
    { title: "Total Revenue", value: "$124,592", change: "+12.5%", trend: "up", icon: DollarSign, color: "text-red-500", bg: "bg-red-500/10" },
    { title: "Active Rentals", value: "45", change: "+4", trend: "up", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Fleet Health", value: "98.2%", change: "+0.5%", trend: "up", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "New Customers", value: "28", change: "+14.2%", trend: "up", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
];

const bookings = [
    { id: "#ORD-7782", customer: "John Wick", car: "Porsche 911 GT3 RS", dates: "Feb 10 - Feb 12", amount: "$1,850", status: "Confirmed" },
    { id: "#ORD-9921", customer: "Sarah Connor", car: "Mercedes-AMG GT", dates: "Feb 14 - Feb 18", amount: "$2,450", status: "Pending" },
    { id: "#ORD-8823", customer: "Tony Stark", car: "Tesla Model S Plaid", dates: "Now - Feb 05", amount: "$1,200", status: "Active" },
    { id: "#ORD-1122", customer: "Bruce Wayne", car: "BMW M4 Comp", dates: "Feb 20 - Feb 22", amount: "$950", status: "Cancelled" },
    { id: "#ORD-2233", customer: "Ellen Ripley", car: "Ford Mustang GT", dates: "Feb 25 - Feb 28", amount: "$750", status: "Confirmed" },
];

const GlassCard = ({ children, className, delay = 0 }: { children: ReactNode, className?: string, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className={cn(
            "bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 rounded-3xl shadow-xl overflow-hidden",
            className
        )}
    >
        {children}
    </motion.div>
);

export const PortalDashboard = () => {
    return (
        <div className="space-y-8 font-sans transition-colors duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-heading tracking-tight">Fleet Analytics</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Real-time performance monitoring and fleet management.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold shadow-sm cursor-pointer">
                        <Filter size={18} />
                        Filter Events
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all font-bold shadow-lg shadow-red-500/20 cursor-pointer">
                        <Activity size={18} />
                        Live Reports
                    </button>
                </div>
            </div>

            {/* Optimized Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Row 1: KPI Stats (Full Width on Desktop) */}
                {stats.map((stat, i) => (
                    <GlassCard key={stat.title} delay={i * 0.1} className="p-6 group cursor-pointer hover:border-red-500/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("p-3 rounded-2xl", stat.bg, stat.color)}>
                                <stat.icon size={24} />
                            </div>
                            <span className={cn(
                                "flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest",
                                stat.trend === "up" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400" : "text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400"
                            )}>
                                {stat.change}
                                {stat.trend === "up" ? <ArrowUpRight size={10} className="ml-1" /> : <ArrowDownRight size={10} className="ml-1" />}
                            </span>
                        </div>
                        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{stat.title}</h3>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white font-heading">{stat.value}</p>
                    </GlassCard>
                ))}

                {/* Row 2: Analytics Row */}
                {/* Revenue Chart - 3/4 Span */}
                <GlassCard className="md:col-span-2 lg:col-span-3 h-[400px] p-6 lg:p-8 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Revenue Trends</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Weekly financial performance overview</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full">
                            <TrendingUp size={14} />
                            <span className="text-xs font-bold">+24%</span>
                        </div>
                    </div>
                    <div className="flex-1 min-h-0">
                        <ResponsiveLine
                            data={revenueData}
                            margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                            xScale={{ type: 'point' }}
                            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                            curve="monotoneX"
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Days of Week',
                                legendOffset: 36,
                                legendPosition: 'middle'
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Revenue ($)',
                                legendOffset: -40,
                                legendPosition: 'middle'
                            }}
                            colors={{ scheme: 'set1' }}
                            pointSize={10}
                            pointColor={{ theme: 'background' }}
                            pointBorderWidth={2}
                            pointBorderColor={{ from: 'serieColor' }}
                            pointLabelYOffset={-12}
                            enableArea={true}
                            areaOpacity={0.15}
                            useMesh={true}
                            theme={{
                                axis: {
                                    ticks: { text: { fill: "currentColor", opacity: 0.5, fontSize: 10 } },
                                    legend: { text: { fill: "currentColor", opacity: 0.7, fontSize: 12, fontWeight: 'bold' } }
                                },
                                grid: { line: { stroke: "currentColor", opacity: 0.1 } },
                                tooltip: {
                                    container: {
                                        background: '#1e293b',
                                        color: '#ffffff',
                                        fontSize: 12,
                                        borderRadius: 8,
                                    },
                                },
                            }}
                        />
                    </div>
                </GlassCard>

                {/* Fleet Distribution - 1/4 Span */}
                <GlassCard className="h-[400px] p-6 lg:p-8 flex flex-col md:col-span-2 lg:col-span-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-4">Fleet Status</h3>
                    <div className="flex-1 min-h-0">
                        <ResponsivePie
                            data={fleetStatusData}
                            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                            innerRadius={0.6}
                            padAngle={2}
                            cornerRadius={8}
                            activeOuterRadiusOffset={8}
                            borderWidth={1}
                            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                            enableArcLabels={false}
                            enableArcLinkLabels={true}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="currentColor"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: 'color' }}
                            colors={{ datum: 'data.color' }}
                            theme={{
                                tooltip: {
                                    container: {
                                        background: '#1e293b',
                                        color: '#ffffff',
                                        fontSize: 12,
                                        borderRadius: 8,
                                    },
                                },
                                labels: { text: { fontSize: 11, fontWeight: 'bold' } }
                            }}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    justify: false,
                                    translateX: 0,
                                    translateY: 30,
                                    itemsSpacing: 0,
                                    itemWidth: 70,
                                    itemHeight: 18,
                                    itemTextColor: 'currentColor',
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 0.6,
                                    symbolSize: 10,
                                    symbolShape: 'circle'
                                }
                            ]}
                        />
                    </div>
                </GlassCard>

                {/* Row 3: Operations Table (Expanded Full Width) */}
                <GlassCard className="lg:col-span-4 p-8 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading tracking-tight">Recent Operations</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Activity and transaction log for the last 24 hours.</p>
                        </div>
                        <button className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl uppercase tracking-widest hover:opacity-90 transition-all">Global Log</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="flex flex-col gap-4 p-5 rounded-3xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100/50 dark:border-slate-800/30 hover:border-red-500/30 transition-all group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Activity size={40} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                        {booking.customer.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{booking.customer}</p>
                                        <p className="font-mono text-[10px] text-slate-500 tracking-tighter">{booking.id}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-[8px]">Vehicle</p>
                                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-1">{booking.car}</p>
                                </div>

                                <div className="pt-2 mt-auto flex items-center justify-between border-t border-slate-100 dark:border-slate-800/50">
                                    <span className={cn(
                                        "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border",
                                        booking.status === "Confirmed" && "text-emerald-500 border-emerald-500/20 bg-emerald-500/5",
                                        booking.status === "Pending" && "text-amber-500 border-amber-500/20 bg-amber-500/5",
                                        booking.status === "Active" && "text-blue-500 border-blue-500/20 bg-blue-500/5",
                                        booking.status === "Cancelled" && "text-red-500 border-red-500/20 bg-red-500/5",
                                    )}>{booking.status}</span>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">{booking.amount}</p>
                                </div>
                            </div>
                        ))}

                        {/* Summary View Mock Link */}
                        <div className="flex flex-col items-center justify-center p-5 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-500/50 transition-all cursor-pointer group">
                            <TrendingUp size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-widest">Analytics</span>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
