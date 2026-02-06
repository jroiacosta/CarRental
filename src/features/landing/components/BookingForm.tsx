import { Send, User, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DatePicker } from "../../../components/ui/DatePicker";
import { FileDropzone } from "../../../components/ui/FileDropzone";
import { TachometerLoader } from "../../../components/ui/CarLoader";

export const BookingForm = ({ carName }: { carName: string }) => {
    const [pickupDate, setPickupDate] = useState<Date>();
    const [returnDate, setReturnDate] = useState<Date>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Helper to get start of today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!pickupDate || !returnDate) {
            toast.error("Please select both pick-up and return dates.");
            return;
        }

        setIsSubmitting(true);

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        toast.success(`Request for ${carName} submitted successfully! We will contact you shortly.`);

        // Optional: Reset form here
        setPickupDate(undefined);
        setReturnDate(undefined);
    };

    return (
        <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-xl sticky top-24">
            <div className="mb-6 pb-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white mb-1">Book This Car</h3>
                <p className="text-slate-400 text-sm">Fill out the form to request {carName}.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Rental Period</label>
                    <div className="grid grid-cols-1 gap-4">
                        <DatePicker
                            date={pickupDate}
                            setDate={setPickupDate}
                            label="Pick-Up"
                            disabled={{ before: today }}
                        />
                        <DatePicker
                            date={returnDate}
                            setDate={setReturnDate}
                            label="Return"
                            disabled={pickupDate ? { before: pickupDate } : { before: today }}
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Personal Info</label>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/50 transition-colors">
                            <User size={16} className="text-slate-500" />
                            <input required type="text" placeholder="Full Name" className="bg-transparent text-white text-sm w-full outline-none placeholder-slate-600" />
                        </div>
                        <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/50 transition-colors">
                            <Mail size={16} className="text-slate-500" />
                            <input required type="email" placeholder="Email Address" className="bg-transparent text-white text-sm w-full outline-none placeholder-slate-600" />
                        </div>
                        <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/50 transition-colors">
                            <Phone size={16} className="text-slate-500" />
                            <input required type="tel" placeholder="Phone Number" className="bg-transparent text-white text-sm w-full outline-none placeholder-slate-600" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <FileDropzone
                        label="Upload Driver's License"
                        onFileSelect={(file) => console.log('License:', file)}
                    />
                    <FileDropzone
                        label="Upload Insurance"
                        onFileSelect={(file) => console.log('Insurance:', file)}
                    />
                </div>

                <button
                    disabled={isSubmitting}
                    className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-4 hover:translate-y-[-2px] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                    {isSubmitting ? (
                        <>
                            <TachometerLoader size={20} />
                            Sending...
                        </>
                    ) : (
                        <>
                            Submit Request
                            <Send size={16} />
                        </>
                    )}
                </button>

                <p className="text-xs text-slate-500 text-center mt-4">
                    *We will contact you shortly to confirm availability.
                </p>
            </form>
        </div>
    );
};
