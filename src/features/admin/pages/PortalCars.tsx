import { Plus, Filter, Fuel, Gauge, Zap, Edit, Trash2 } from "lucide-react";
import { cn } from "../../../common/utils";

const cars = [
    {
        id: 1,
        name: "Porsche 911 GT3 RS",
        plate: "CA 8829X",
        status: "Active",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop",
        category: "Sports",
        price: 1200,
        fuel: "Premium",
        speed: "198 mph"
    },
    {
        id: 2,
        name: "Mercedes-AMG GT",
        plate: "NY 2210Z",
        status: "Available",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60",
        category: "Luxury",
        price: 950,
        fuel: "Premium",
        speed: "193 mph"
    },
    {
        id: 3,
        name: "Tesla Model S Plaid",
        plate: "TX 4492A",
        status: "Maintenance",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=60",
        category: "Electric",
        price: 800,
        fuel: "Electric",
        speed: "200 mph"
    },
    {
        id: 4,
        name: "BMW M4 Competition",
        plate: "FL 9921K",
        status: "Available",
        image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&auto=format&fit=crop&q=60",
        category: "Sports",
        price: 850,
        fuel: "Premium",
        speed: "180 mph"
    },
    {
        id: 5,
        name: "Range Rover Sport",
        plate: "WA 3321L",
        status: "Active",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=60",
        category: "SUV",
        price: 600,
        fuel: "Diesel",
        speed: "140 mph"
    },
];

export const PortalCars = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">Fleet Management</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage your vehicle inventory and status.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg shadow-red-900/20">
                        <Plus size={18} />
                        Add Vehicle
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <div key={car.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                        <div className="relative h-48 overflow-hidden">
                            <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute top-4 right-4">
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border shadow-sm",
                                    car.status === "Active" && "bg-blue-500/80 text-white border-white/20",
                                    car.status === "Available" && "bg-emerald-500/80 text-white border-white/20",
                                    car.status === "Maintenance" && "bg-amber-500/80 text-white border-white/20",
                                )}>
                                    {car.status}
                                </span>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-bold font-heading text-lg">{car.name}</p>
                                <p className="text-slate-300 text-xs font-mono">{car.plate}</p>
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-100 dark:border-slate-800">
                                <div className="text-center">
                                    <Fuel size={16} className="mx-auto text-slate-400 mb-1" />
                                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{car.fuel}</p>
                                </div>
                                <div className="text-center border-l border-slate-100 dark:border-slate-800">
                                    <Gauge size={16} className="mx-auto text-slate-400 mb-1" />
                                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{car.category}</p>
                                </div>
                                <div className="text-center border-l border-slate-100 dark:border-slate-800">
                                    <Zap size={16} className="mx-auto text-slate-400 mb-1" />
                                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{car.speed}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-lg font-bold text-red-600 dark:text-red-500">${car.price}</p>
                                    <p className="text-xs text-slate-500">per day</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                        <Edit size={18} />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
