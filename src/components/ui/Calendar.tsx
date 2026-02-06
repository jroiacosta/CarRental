import { DayPicker } from "react-day-picker";
import { cn } from "../../common/utils";

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
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium text-white hidden",
                caption_dropdowns: "flex justify-center gap-2", // Increased gap
                dropdown: "bg-slate-950 border border-white/20 text-white text-sm p-1.5 rounded-lg cursor-pointer outline-none focus:border-red-500 hover:border-white/40 hover:bg-slate-900 transition-all shadow-sm appearance-none",
                dropdown_month: "mr-1",
                dropdown_year: "ml-1",
                nav: "space-x-1 flex items-center absolute right-1", // Positioning nav buttons correctly if they exist, though dropdowns usually replace them
                nav_button: cn(
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity text-slate-400 hover:text-white"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                    "text-slate-500 rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-800/50 [&:has([aria-selected])]:bg-slate-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn(
                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-slate-300 hover:bg-slate-800 rounded-md transition-colors"
                ),
                day_range_end: "day-range-end",
                day_selected:
                    "bg-red-600 text-white hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white rounded-md",
                day_today: "bg-slate-800 text-white font-bold border border-red-500/50", // Highlight today more clearly
                day_outside:
                    "day-outside text-slate-600 opacity-50 aria-selected:bg-slate-800/50 aria-selected:text-slate-500 aria-selected:opacity-30",
                day_disabled: "text-slate-700 opacity-30 cursor-not-allowed", // Clearer disabled state
                day_range_middle:
                    "aria-selected:bg-slate-800 aria-selected:text-slate-100",
                day_hidden: "invisible",
                ...classNames,
            }}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };
