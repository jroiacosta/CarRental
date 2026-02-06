import { APP_CONFIG } from "../../../config/constants";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Fuel, Gauge, Zap, ArrowRight, Star, CheckCircle2, ShieldCheck, Car as CarIcon, Users } from "lucide-react";
import { MouseEvent } from "react";

import { CARS } from "../data/cars";
import { Link } from "@tanstack/react-router";

const cars = [CARS[2], CARS[3]].filter((c): c is typeof CARS[0] => !!c);

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

function InfoSection() {
    return (
        <div id="details" className="mt-32 border-t border-white/10 pt-24">
            <div className="text-center mb-16">
                <span className="text-red-500 font-bold tracking-widest uppercase text-xs mb-2 block">About Us</span>
                <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
                    {APP_CONFIG.COMPANY_NAME}
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    We Move You to the Next Level! A trusted car rental service proudly serving {APP_CONFIG.CONTACT.ADDRESS.FULL}.
                    We provide reliable, comfortable, and affordable vehicles to keep you moving with confidence.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Economy Card */}
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition-colors">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                            <CarIcon size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">Economy / Compact</h3>
                            <p className="text-slate-400 text-sm">Ideal for city driving & everyday travel</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="flex items-center gap-2 text-white font-semibold mb-3">
                                <CheckCircle2 size={16} className="text-red-500" /> Features
                            </h4>
                            <p className="text-slate-400 ml-6 text-sm">Toyota Corolla, Honda Civic • 4-5 Passengers</p>
                        </div>

                        <div>
                            <h4 className="flex items-center gap-2 text-white font-semibold mb-3">
                                <CheckCircle2 size={16} className="text-red-500" /> Rates
                            </h4>
                            <ul className="ml-6 space-y-1 text-slate-400 text-sm">
                                <li>Daily: <span className="text-white">$55–$65</span></li>
                                <li>Weekly: <span className="text-white">$350–$400</span></li>
                                <li>Monthly: <span className="text-white">$1,250–$1,400</span></li>
                                <li>Security Deposit: $250</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Van Card */}
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition-colors">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                            <Users size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">Full-Size Van</h3>
                            <p className="text-slate-400 text-sm">Perfect for group travel, tours & events</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="flex items-center gap-2 text-white font-semibold mb-3">
                                <CheckCircle2 size={16} className="text-red-500" /> Features
                            </h4>
                            <p className="text-slate-400 ml-6 text-sm">Mercedes-Benz Sprinter (2025) • Up to 12 Passengers</p>
                        </div>

                        <div>
                            <h4 className="flex items-center gap-2 text-white font-semibold mb-3">
                                <CheckCircle2 size={16} className="text-red-500" /> Mileage Policy
                            </h4>
                            <ul className="ml-6 space-y-1 text-slate-400 text-sm">
                                <li>150 miles / day</li>
                                <li>1,000 miles / week</li>
                                <li>3,000 miles / month</li>
                                <li>Additional: $0.30/mile</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Details */}
            <div className="mt-12 bg-white/5 rounded-2xl p-8 max-w-5xl mx-auto border border-white/5">
                <h4 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                    <ShieldCheck size={24} className="text-red-500" /> Rental Requirements
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-400 text-sm">
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 bg-red-500 rounded-full" />
                        Min. Age: 21 Years Old
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 bg-red-500 rounded-full" />
                        Valid Driver’s License
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 bg-red-500 rounded-full" />
                        Insurance Required
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 bg-red-500 rounded-full" />
                        No Smoking / Off-road
                    </div>
                </div>
            </div>
        </div>
    )
}

export const FeaturedCars = () => {
    return (
        <section id="fleet" className="py-24 bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-1 w-12 bg-red-600 rounded-full" />
                            <span className="text-red-500 font-bold tracking-wider uppercase text-xs">Our Fleet</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-4">
                            Premium Selection
                        </h2>
                        <p className="text-slate-400 max-w-xl text-lg">
                            Explore our hand-picked collection of the world's finest vehicles, available for your immediate enjoyment.
                        </p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-white border border-white/10 px-6 py-3 rounded-full hover:bg-white/5 transition-all group backdrop-blur-sm">
                        View All Cars <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-red-500" />
                    </button>
                </div>

                {/* Cars Grid - Centered for 2 items */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {cars.map((car, index) => (
                        <Card key={car.id} car={car} index={index} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <button className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors">
                        View All Cars
                    </button>
                </div>

                {/* Company Info Section */}
                <InfoSection />

            </div>
        </section>
    );
};
