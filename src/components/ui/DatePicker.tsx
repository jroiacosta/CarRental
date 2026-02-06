import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../common/utils";
import { Calendar } from "./Calendar";

import { Matcher } from "react-day-picker";

interface DatePickerProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    label?: string;
    placeholder?: string;
    disabled?: Matcher | Matcher[];
}

export function DatePicker({ date, setDate, label, placeholder = "Pick a date", disabled }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            {label && <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">{label}</label>}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between bg-slate-950 border border-white/10 rounded-lg p-3 text-left font-normal transition-colors hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50",
                    !date && "text-slate-500"
                )}
            >
                <span className={cn("text-sm", !date && "text-slate-500")}>
                    {date ? format(date, "PPP") : <span>{placeholder}</span>}
                </span>
                <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 left-0 z-[9999] w-auto bg-slate-900 border border-white/10 rounded-xl shadow-2xl p-2"
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleSelect}
                            disabled={disabled}
                            initialFocus
                            captionLayout="dropdown"
                            fromYear={new Date().getFullYear()}
                            toYear={new Date().getFullYear() + 10}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
