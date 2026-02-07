import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Fuel, Gauge, Zap, Star } from "lucide-react";
import { MouseEvent, useState, useMemo } from "react";

import { CARS } from "../data/cars";
import { Link } from "@tanstack/react-router";

const fleetCars = [CARS[2], CARS[3]].filter((c): c is typeof CARS[0] => !!c);
const CATEGORIES = ["ALL", ...Array.from(new Set(fleetCars.map((c) => c.category)))];

function Card({ car, index }: { car: typeof CARS[0]; index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300 flex flex-col h-full"
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
                }}
            />

            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1 text-xs font-bold shadow-sm text-white border border-white/10">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    {car.rating}
                </div>
                <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="relative p-6 z-10 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white font-heading group-hover:text-red-500 transition-colors">
                            {car.name}
                        </h3>
                        <p className="text-slate-400 text-sm font-medium tracking-wide">
                            {car.category}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-red-500">
                            ${car.price}
                        </p>
                        <p className="text-xs text-slate-500">/ day</p>
                    </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-2 my-6 py-4 border-y border-white/5 bg-white/5 rounded-lg">
                    <div className="text-center px-2">
                        <Gauge className="w-4 h-4 mx-auto text-slate-500 mb-2 group-hover:text-red-500 transition-colors" />
                        <p className="text-sm font-bold text-white mb-0.5">{car.stats.accel}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">0-60</p>
                    </div>
                    <div className="text-center px-2 border-l border-white/5">
                        <Zap className="w-4 h-4 mx-auto text-slate-500 mb-2 group-hover:text-red-500 transition-colors" />
                        <p className="text-sm font-bold text-white mb-0.5">{car.stats.speed}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Max</p>
                    </div>
                    <div className="text-center px-2 border-l border-white/5">
                        <Fuel className="w-4 h-4 mx-auto text-slate-500 mb-2 group-hover:text-red-500 transition-colors" />
                        <p className="text-sm font-bold text-white mb-0.5">{car.stats.power}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Power</p>
                    </div>
                </div>

                <Link
                    to="/cars/$carId"
                    params={{ carId: car.id }}
                    className="w-full btn-primary py-3 bg-red-600/90 hover:bg-red-500 transition-all border-none shadow-lg shadow-red-900/20 group-hover:translate-y-[-2px] block text-center"
                >
                    Rent Now
                </Link>
            </div>
        </motion.div>
    );
}


export const FeaturedCars = () => {
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const filteredCars = useMemo(
        () =>
            selectedCategory === "ALL"
                ? fleetCars
                : fleetCars.filter((c) => c.category === selectedCategory),
        [selectedCategory]
    );

    return (
        <section id="fleet" className="py-24 bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white">
                        Our Vehicle Fleet
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl">
                        We provide our customers with reliable, comfortable rides. That’s why we keep our fleet to two clear choices: economy/compact and full-size van.
                    </p>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors ${selectedCategory === cat
                                ? "bg-white text-slate-950 border border-white"
                                : "bg-transparent text-slate-400 border border-white/20 hover:border-white/40 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {filteredCars.map((car, index) => (
                        <Card key={car.id} car={car} index={index} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <button className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors">
                        View All Cars
                    </button>
                </div>


            </div>
        </section>
    );
};
