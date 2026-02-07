import { motion, Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Star, Image as ImageIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CARS } from "../data/cars";
import { useState, useMemo } from "react";
import { Lightbox } from "../../../components/ui/Lightbox";

// Fleet cars shown in hero / fleet section (Economy & Full Size Van)
const fleetCars = [CARS[2], CARS[3]].filter((c): c is (typeof CARS)[number] => !!c);

/** Gallery images from the actual fleet cars (main + gallery for each) */
function getFleetGalleryImages(): string[] {
    const images: string[] = [];
    fleetCars.forEach((car) => {
        images.push(car.image);
        if (car.gallery?.length) images.push(...car.gallery);
    });
    return images;
}

export const Hero = () => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const fleetGalleryImages = useMemo(() => getFleetGalleryImages(), []);

    const scrollToFleet = (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section
            id="home"
            className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-slate-950 text-white pt-24 pb-16"
        >
            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury car background"
                    className="w-full h-full object-cover opacity-30 scale-110 lg:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Main Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        {/* Status/Pill */}
                        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6 p-1 pr-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                            <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">New</span>
                            <span className="text-slate-300 text-xs font-medium">2025 Luxury Fleet Now Available</span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-heading tracking-tight leading-[0.95] text-white mb-8"
                        >
                            Redefine Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-500">
                                Journey
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-slate-400 text-lg sm:text-xl max-w-xl leading-relaxed mb-10"
                        >
                            Experience the ultimate freedom with our curated collection of premium vehicles.
                            From urban efficiency to cross-country luxury, we move you to the next level.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <button
                                onClick={scrollToFleet}
                                className="w-full sm:w-auto btn-primary py-4 px-10 rounded-2xl flex items-center justify-center gap-3 group border border-red-500/50 shadow-2xl shadow-red-900/30 font-bold text-base transition-all hover:scale-[1.02]"
                            >
                                Book Your Ride
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => setIsGalleryOpen(true)}
                                className="w-full sm:w-auto py-4 px-10 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-all flex items-center justify-center gap-3"
                            >
                                <ImageIcon size={18} />
                                View Fleet Gallery
                            </button>
                        </motion.div>

                        {/* Trust Factors */}
                        <motion.div variants={itemVariants} className="mt-16 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-white font-bold">
                                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                    <span>4.9/5</span>
                                </div>
                                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Customer Rating</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-white font-bold">500+</p>
                                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Premium Cars</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-white font-bold">24/7</p>
                                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Concierge</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-white font-bold">Instant</p>
                                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Verification</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Visual Content / Featured Car Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="lg:col-span-5 hidden lg:block"
                    >
                        <div className="relative group">
                            {/* Animated Rings */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 to-transparent rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

                            <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 overflow-hidden shadow-2xl">
                                <img
                                    src={CARS[0]?.image}
                                    alt="Featured car"
                                    className="w-full rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                />

                                <div className="mt-6 p-4">
                                    <div className="flex justify-between items-end mb-6">
                                        <div>
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Featured Vehicle</p>
                                            <h3 className="text-2xl font-bold text-white">{CARS[0]?.name}</h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-white">${CARS[0]?.price}</p>
                                            <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Per Day</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                            <Zap size={16} className="text-red-500 mb-2" />
                                            <p className="text-white font-bold text-sm">3.1s</p>
                                            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">0-60 MPH</p>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                            <ShieldCheck size={16} className="text-blue-500 mb-2" />
                                            <p className="text-white font-bold text-sm">Full Cover</p>
                                            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Insurance</p>
                                        </div>
                                    </div>

                                    <Link
                                        to="/cars/$carId"
                                        params={{ carId: CARS[0]?.id || '' }}
                                        className="w-full py-4 bg-white text-slate-950 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                                    >
                                        View Details
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>

                            {/* Floating Badges */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 bg-slate-900 border border-white/10 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-white text-xs font-bold uppercase tracking-wider">Available Now</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
                >
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-red-500 to-transparent" />
                </motion.div>
            </div>

            {isGalleryOpen && fleetGalleryImages.length > 0 && (
                <Lightbox
                    images={fleetGalleryImages}
                    onClose={() => setIsGalleryOpen(false)}
                />
            )}
        </section>
    );
};
