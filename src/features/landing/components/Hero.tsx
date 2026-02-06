import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, PlayCircle, Star, Gauge, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { Lightbox } from "../../../components/ui/Lightbox";

import { CARS } from "../data/cars";
import { Link } from "@tanstack/react-router";

// Filter only Hero cars if needed, or use specific IDs. 
// User requested to match Premium Selection cars (Mercedes & McLaren)
const cars = CARS.slice(2, 4);

export const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % cars.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const nextCar = () => setCurrentIndex((prev) => (prev + 1) % cars.length);
    const prevCar = () => setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);

    const currentCar = cars[currentIndex] || cars[0];

    if (!currentCar) return null; // Safe guard

    return (
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-950 text-white min-h-screen flex items-center">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 -z-10 w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px] opacity-30" />
            <div className="absolute bottom-0 left-0 -z-10 w-[60%] h-[60%] bg-red-500/10 rounded-full blur-[120px] opacity-30" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Content */}
                    <motion.div
                        key={`content-${currentCar.id}`}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        <div className="flex-1 min-h-[400px] flex flex-col justify-center"> {/* Container for stable height */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-medium text-slate-300 mb-6 w-fit">
                                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                <span>Premium Collection</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold font-heading mb-6 tracking-tight leading-[1.1] min-h-[3.3em]"> {/* Min height for 2-3 lines */}
                                Drive the <br />
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentCar.gradient}`}>
                                    {currentCar.name}
                                </span>
                            </h1>

                            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed min-h-[3.5em]"> {/* Min height for description */}
                                {currentCar.tagline}. Experience the pinnacle of automotive engineering with our exclusive fleet.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Link
                                    to="/cars/$carId"
                                    params={{ carId: currentCar.id }}
                                    className="btn-primary flex items-center justify-center gap-2 group shadow-red-500/25 shadow-lg border border-red-500/50 hover:shadow-red-500/40 w-full sm:w-auto"
                                >
                                    Rent This Car
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </Link>
                                <button
                                    onClick={() => setLightboxOpen(true)}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white border border-white/20 hover:bg-white/5 transition-all group backdrop-blur-sm w-full sm:w-auto"
                                >
                                    <PlayCircle size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                                    View Gallery
                                </button>
                            </div>
                        </div>

                        {/* Carousel Controls - Fixed Position logic */}
                        <div className="mt-auto pt-12 flex items-center gap-6 justify-center lg:justify-start w-full">
                            <button onClick={prevCar} className="p-4 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 text-slate-400 hover:text-white transition-all group">
                                <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                            </button>

                            <div className="flex gap-2">
                                {cars.map((_, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? 'w-12 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                                    />
                                ))}
                            </div>

                            <button onClick={nextCar} className="p-4 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 text-slate-400 hover:text-white transition-all group">
                                <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Content - Carousel Image */}
                    <div className="relative h-[450px] lg:h-[600px] w-full flex items-center justify-center perspective-[1000px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentCar.id}
                                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="absolute w-full h-full flex flex-col items-center justify-center"
                            >
                                {/* Glow effect */}
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] rounded-full blur-[100px] opacity-30 bg-gradient-to-r ${currentCar.gradient}`} />

                                {/* Image - Moved up slightly to make room for stats */}
                                <img
                                    src={currentCar.image}
                                    alt={currentCar.name}
                                    className="relative z-10 w-full h-[80%] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                                />

                                {/* Stats Floating Card - Positioned relative to image container to avoid overlap */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative z-20 mt-4 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl flex gap-8 items-center max-w-sm mx-auto"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/5 rounded-lg">
                                            <Zap className="w-5 h-5 text-yellow-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">0-60 mph</p>
                                            <p className="text-xl font-bold font-heading">{currentCar.stats.accel}</p>
                                        </div>
                                    </div>
                                    <div className="w-px h-10 bg-white/10" />
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/5 rounded-lg">
                                            <Gauge className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Top Speed</p>
                                            <p className="text-xl font-bold font-heading">{currentCar.stats.speed}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            {/* Lightbox for Hero */}
            {lightboxOpen && currentCar && (
                <Lightbox
                    images={[currentCar.image, ...(currentCar.gallery || [])]}
                    onClose={() => setLightboxOpen(false)}
                />
            )}
        </section>
    );
};
