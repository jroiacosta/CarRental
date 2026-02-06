import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "../../common/utils";
import { Calendar } from "./Calendar";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

interface DatePickerProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    label?: string;
    placeholder?: string;
    disabled?: any;
}

export function DatePicker({ date, setDate, label, placeholder = "Select date", disabled }: DatePickerProps) {
    return (
        <div className="w-full">
            {label && <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">{label}</label>}

            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <PopoverButton
                            className={cn(
                                "w-full flex items-center gap-3 bg-slate-950 border border-white/10 rounded-xl p-3 text-sm transition-all duration-300 outline-none text-left",
                                open ? "border-red-500/50 ring-2 ring-red-500/10" : "hover:border-white/20",
                                !date ? "text-slate-500" : "text-white font-medium"
                            )}
                        >
                            <CalendarIcon size={16} className={cn("transition-colors", open ? "text-red-500" : "text-slate-500")} />
                            <span className="flex-1 truncate">
                                {date ? format(date, "PPP") : placeholder}
                            </span>
                            {date && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDate(undefined);
                                    }}
                                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                                >
                                    <X size={14} className="text-slate-500 hover:text-white" />
                                </button>
                            )}
                        </PopoverButton>

                        <AnimatePresence>
                            {open && (
                                <PopoverPanel
                                    static
                                    as={motion.div}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute z-[60] mt-3 left-0 sm:left-auto sm:right-0"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(newDate) => {
                                            setDate(newDate);
                                            if (newDate) close();
                                        }}
                                        disabled={disabled}
                                        initialFocus
                                    />
                                </PopoverPanel>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </Popover>
        </div>
    );
}

