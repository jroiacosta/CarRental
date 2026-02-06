import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

interface LightboxProps {
    images: string[];
    onClose: () => void;
    initialIndex?: number;
}

export const Lightbox = ({ images, onClose, initialIndex = 0 }: LightboxProps) => {
    const [imgIndex, setImgIndex] = useState(initialIndex);

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setImgIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setImgIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard support for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nextImage, prevImage, onClose]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 select-none"
                onClick={onClose}
            >
                {/* Close Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-50"
                >
                    <X size={24} />
                </button>

                {/* Previous Button - Visible on mobile now */}
                <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 lg:left-8 p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-20"
                >
                    <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>

                {/* Next Button - Visible on mobile now */}
                <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 lg:right-8 p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-20"
                >
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>

                {/* Main Image */}
                <motion.img
                    key={imgIndex}
                    src={images[imgIndex]}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl relative z-10"
                    onClick={(e) => e.stopPropagation()} // Prevent close on image click
                />

                {/* Index Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setImgIndex(idx); }}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${idx === imgIndex ? 'bg-red-500 w-8' : 'bg-white/30 hover:bg-white/60'}`}
                        />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
