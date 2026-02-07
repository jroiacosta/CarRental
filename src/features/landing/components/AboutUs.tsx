import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, Car as CarIcon, Star, Heart, TrendingUp } from "lucide-react";
import { APP_CONFIG } from "../../../config/constants";

const BentoCard = ({
    children,
    className = "",
    delay = 0
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className={`bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-[2rem] p-8 hover:border-red-500/30 transition-colors group ${className}`}
    >
        {children}
    </motion.div>
);

export const AboutUs = () => {
    return (
        <section id="details" className="py-32 relative overflow-hidden bg-slate-950">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
                    >
                        Our Story
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold font-heading text-white mb-6"
                    >
                        Driving Excellence Since 2025
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        At {APP_CONFIG.COMPANY_NAME}, we believe every journey deserves a premium touch.
                        We don't just rent cars; we provide the freedom to move with confidence and style.
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[240px]">

                    {/* Main Brand Card - Large */}
                    <BentoCard className="md:col-span-6 lg:col-span-8 lg:row-span-2 relative overflow-hidden flex flex-col justify-end">
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop"
                                alt="Experience"
                                className="w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-red-900/40">
                                <Heart size={28} />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">The Next Level of Mobility</h3>
                            <p className="text-slate-400 text-lg max-w-lg">
                                We've redefined the car rental experience by focusing on the details that matter most to you: speed, reliability, and sheer comfort.
                            </p>
                        </div>
                    </BentoCard>

                    {/* Stats Card */}
                    <BentoCard delay={0.1} className="md:col-span-3 lg:col-span-4 lg:row-span-1 bg-gradient-to-br from-red-600/10 to-transparent flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-2">
                            <TrendingUp className="text-red-500" size={24} />
                            <span className="text-white font-bold text-4xl">15+</span>
                        </div>
                        <p className="text-slate-400 font-medium">Years of Trust & Experience</p>
                    </BentoCard>

                    {/* Trust/Safety Card */}
                    <BentoCard delay={0.2} className="md:col-span-3 lg:col-span-4 lg:row-span-1 flex flex-col justify-center">
                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500 mb-4">
                            <ShieldCheck size={20} />
                        </div>
                        <h4 className="text-white font-bold mb-2">Premium Security</h4>
                        <p className="text-slate-500 text-sm">Every vehicle undergoes rigorous safety inspections before every rental.</p>
                    </BentoCard>

                    {/* Feature Card 1: Economy */}
                    <BentoCard delay={0.3} className="md:col-span-3 lg:col-span-4 lg:row-span-2 flex flex-col">
                        <div className="p-3 bg-red-500/10 rounded-xl text-red-500 w-fit mb-6">
                            <CarIcon size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">City Masters</h3>
                        <p className="text-slate-400 text-sm mb-6 flex-grow">
                            Our Economy & Compact fleet is designed for the modern urbanite. Efficiency meets urban style.
                        </p>
                        <div className="space-y-4 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2 text-white font-semibold text-sm">
                                <Star size={14} className="text-red-500 fill-red-500" />
                                Top Rated Compacts
                            </div>
                            <ul className="text-xs text-slate-500 space-y-2">
                                <li>• Toyota Corolla (2024)</li>
                                <li>• Honda Civic Sport</li>
                                <li>• VW Golf R-Line</li>
                            </ul>
                        </div>
                    </BentoCard>

                    {/* Feature Card 2: Vans */}
                    <BentoCard delay={0.4} className="md:col-span-3 lg:col-span-4 lg:row-span-2 flex flex-col">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 w-fit mb-6">
                            <Users size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Group Explorers</h3>
                        <p className="text-slate-400 text-sm mb-6 flex-grow">
                            Spacious full-size vans for those who travel together. Perfect for family tours and corporate events.
                        </p>
                        <div className="space-y-4 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2 text-white font-semibold text-sm">
                                <Zap size={14} className="text-blue-500 fill-blue-500" />
                                Ultimate Capacity
                            </div>
                            <ul className="text-xs text-slate-500 space-y-2">
                                <li>• Mercedes Sprinter (2025)</li>
                                <li>• Ford Transit Elite</li>
                                <li>• Chevy Express Lux</li>
                            </ul>
                        </div>
                    </BentoCard>

                    {/* Call to Action Small Card */}
                    <BentoCard delay={0.5} className="md:col-span-6 lg:col-span-4 lg:row-span-2 bg-red-600 flex flex-col justify-center items-center text-center group/cta border-none">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Start?</h3>
                        <p className="text-red-100 text-sm mb-8 opacity-80">Book your perfect ride in less than 2 minutes.</p>
                        <button className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-sm hover:scale-105 transition-transform shadow-xl">
                            Explore Fleet
                        </button>
                    </BentoCard>

                </div>
            </div>
        </section>
    );
};
