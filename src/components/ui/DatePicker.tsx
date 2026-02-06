import { format } from "date-fns";
import { cn } from "../../common/utils";

interface DatePickerProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    label?: string;
    placeholder?: string;
    disabled?: { before?: Date } | any; // Loose type to accept the existing Matcher shape without importing it
}

export function DatePicker({ date, setDate, label, disabled }: DatePickerProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            // Create date from "YYYY-MM-DD" string in local time
            const parts = e.target.value.split('-').map(Number);
            if (parts.length === 3) {
                const [year, month, day] = parts;
                setDate(new Date(year!, month! - 1, day));
            }
        } else {
            setDate(undefined);
        }
    };

    // formatted value for input: YYYY-MM-DD
    const inputValue = date ? format(date, "yyyy-MM-dd") : "";

    // Calculate min date from disabled prop if it has 'before'
    // The previous component used 'before' to disable all dates before a certain date.
    // In native input, this corresponds to the 'min' attribute.
    // We add 1 day because 'before: today' means today is valid, but 'before: today' physically implies < today.
    // Actually, let's look at BookingForm: disabled={{ before: today }}. React Day Picker 'before' disables everything *before* that date.
    // So 'min' should be that date.
    // But wait, if disabled is { before: today }, it means today is enabled?
    // In React Day Picker, { before: new Date() } disables dates before now.
    // So 'min' attribute should be new Date().

    let minDate: string | undefined;
    if (disabled?.before) {
        minDate = format(disabled.before, "yyyy-MM-dd");
    }

    return (
        <div className="w-full">
            {label && <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">{label}</label>}
            <input
                type="date"
                value={inputValue}
                onChange={handleChange}
                min={minDate}
                className={cn(
                    "w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-red-500/50 transition-colors uppercase",
                    !date && "text-slate-500" // Placeholder style if supported
                )}
                style={{ colorScheme: 'dark' }} // Forces browser native picker to be dark mode
            />
        </div>
    );
}
