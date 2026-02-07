import { motion } from "framer-motion";
import { ArrowRight, Car, ChevronDown } from "lucide-react";
import { CARS } from "../data/cars";
import { Link } from "@tanstack/react-router";

const fleetCars = [CARS[2], CARS[3]].filter(Boolean);

export const Hero = () => {
    const [car1, car2] = fleetCars;
    if (!car1 || !car2) return null;

    const scrollToFleet = (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950 text-white pt-24 pb-16 lg:pt-28 lg:pb-20"
        >
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-slate-800/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-slate-700/20 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Headline only */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading tracking-tight leading-[1.08] text-white">
                            Elevate Your
                            <br />
                            Travel Experience
                        </h1>
                    </motion.div>

                    {/* Right: 2 cars only, equal cards */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="grid grid-cols-2 gap-3 sm:gap-4"
                    >
                        <Link
                            to="/cars/$carId"
                            params={{ carId: car1.id }}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
                        >
                            <img
                                src={car1.image}
                                alt={car1.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
                                <Car size={14} className="opacity-80" />
                                <span className="font-semibold text-sm truncate">{car1.name}</span>
                            </div>
                        </Link>
                        <Link
                            to="/cars/$carId"
                            params={{ carId: car2.id }}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
                        >
                            <img
                                src={car2.image}
                                alt={car2.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
                                <Car size={14} className="opacity-80" />
                                <span className="font-semibold text-sm truncate">{car2.name}</span>
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Slogan + description + BOOK NOW (below hero content) */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mt-12 lg:mt-16 grid lg:grid-cols-2 gap-8 lg:gap-16 items-end"
                >
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-heading">
                            Practical Meets Spacious
                        </h2>
                        <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
                            Whether you need an economy car for city runs or a full-size van for the family, we’ve got you covered. Reliable vehicles, clear pricing, and support when you need it.
                        </p>
                    </div>
                    <div className="flex justify-center lg:justify-end">
                        <button
                            onClick={scrollToFleet}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-950 font-bold text-sm uppercase tracking-wider hover:bg-slate-200 transition-colors"
                        >
                            Book Now
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col items-center pt-12 lg:pt-16"
                >
                    <span className="text-slate-500 text-xs font-medium uppercase tracking-widest mb-1">Scroll Down</span>
                    <ChevronDown size={20} className="text-slate-500 animate-bounce" />
                </motion.div>
            </div>
        </section>
    );
};
