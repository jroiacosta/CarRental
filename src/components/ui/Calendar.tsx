import { DayPicker } from "react-day-picker";
import { cn } from "../../common/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            captionLayout="dropdown"
            navLayout="around"
            startMonth={new Date(new Date().getFullYear() - 100, 0)}
            endMonth={new Date(new Date().getFullYear() + 20, 11)}
            className={cn("p-4 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl [color-scheme:dark]", className)}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "grid grid-cols-[auto_1fr_auto] gap-y-4 w-full relative items-center",
                month_caption: "flex justify-center items-center h-12",
                caption_label: "hidden",
                caption_dropdowns: "flex justify-center gap-2 z-10",
                dropdowns: "flex justify-center gap-2 z-10",
                dropdown: "bg-black/40 border border-white/5 text-white text-[11px] px-4 py-2 rounded-2xl cursor-pointer outline-none focus:border-red-500/50 hover:bg-black/60 transition-all font-bold uppercase tracking-[0.1em] appearance-none",
                dropdown_month: "relative inline-flex items-center",
                dropdown_year: "relative inline-flex items-center",
                months_dropdown: "relative inline-flex items-center",
                years_dropdown: "relative inline-flex items-center",
                nav: "absolute top-0 inset-x-0 flex items-center justify-between h-12 pointer-events-none",
                button_previous: cn(
                    "h-10 w-10 shrink-0 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 justify-self-end"
                ),
                button_next: cn(
                    "h-10 w-10 shrink-0 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 justify-self-start"
                ),
                month_grid: "w-full border-collapse col-span-3",
                weekdays: "flex justify-between mb-4 px-2",
                weekday: "text-slate-500 w-9 font-bold text-[11px] uppercase tracking-widest text-center",
                week: "flex justify-between w-full mt-1",
                day: "h-10 w-10 text-center text-sm p-0 relative focus-within:relative focus-within:z-20 transition-all",
                day_button: cn(
                    "h-10 w-10 p-0 font-bold text-slate-400 hover:bg-white/5 hover:text-white rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-center"
                ),
                selected: cn(
                    "bg-red-600 !text-white hover:bg-red-500 shadow-lg shadow-red-600/40 font-black rounded-2xl scale-95"
                ),
                today: cn(
                    "text-white relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-white after:rounded-full after:shadow-[0_0_8px_white]"
                ),
                outside: "text-slate-800 opacity-20",
                disabled: "text-slate-900 opacity-10 cursor-not-allowed",
                range_middle: "bg-red-600/10 text-red-100",
                hidden: "invisible",
                ...classNames,
            }}
            components={{
                Chevron: ({ orientation }) => (
                    orientation === 'left' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />
                )
            }}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };


