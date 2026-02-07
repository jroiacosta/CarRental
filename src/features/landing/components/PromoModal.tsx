import { motion, AnimatePresence } from "framer-motion";
import { X, Tag, ArrowRight, Sparkles, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { APP_CONFIG } from "../../../config/constants";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop";

export const PromoModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const promo = APP_CONFIG.PROMOTION;
    const imageSrc = promo.image && !imageError ? promo.image : FALLBACK_IMAGE;

    useEffect(() => {
        if (!promo.enabled) return undefined;
        const timer = setTimeout(() => setIsOpen(true), 1500);
        return () => clearTimeout(timer);
    }, [promo.enabled]);

    if (!promo.enabled) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 16 }}
                        transition={{ type: "spring", damping: 28, stiffness: 300 }}
                        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 flex flex-col md:flex-row"
                    >
                        {/* Image section – fixed dimensions so it always shows */}
                        <div className="relative w-full md:w-[45%] min-h-[220px] md:min-h-[360px] bg-slate-800 shrink-0">
                            <img
                                src={imageSrc}
                                alt="Limited offer – premium fleet"
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={() => setImageError(true)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent md:bg-gradient-to-r md:from-slate-900 md:via-slate-900/60 md:to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:bottom-6">
                                <span className="inline-flex items-center gap-1.5 bg-red-500/90 text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-red-900/40">
                                    <Zap size={12} />
                                    Limited offer
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative flex-1 p-6 sm:p-8 flex flex-col justify-center min-w-0">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span className="inline-flex items-center gap-1.5 bg-red-500/15 text-red-400 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-500/25">
                                    <Sparkles size={12} />
                                    Exclusive
                                </span>
                                <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">
                                    Ends soon
                                </span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-heading leading-tight tracking-tight">
                                {promo.title}
                            </h3>
                            <p className="text-slate-400 text-sm sm:text-base mb-6 leading-relaxed">
                                {promo.message}
                            </p>

                            {promo.discountCode && (
                                <div className="mb-6 p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                                            <Tag size={20} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                                                Use at checkout
                                            </p>
                                            <p className="text-white font-mono font-bold text-lg truncate">
                                                {promo.discountCode}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            navigator.clipboard.writeText(promo.discountCode ?? "");
                                        }}
                                        className="shrink-0 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider hover:bg-red-500/30 hover:text-red-300 transition-colors border border-red-500/20"
                                    >
                                        Copy
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-base shadow-lg shadow-red-950/40 border border-red-500/30 group"
                            >
                                {promo.buttonText}
                                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
