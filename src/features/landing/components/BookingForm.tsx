import { Send, User, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { DatePicker } from "../../../components/ui/DatePicker";

export const BookingForm = ({ carName }: { carName: string }) => {
    const [pickupDate, setPickupDate] = useState<Date>();
    const [returnDate, setReturnDate] = useState<Date>();

    // Helper to get start of today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
        <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-xl sticky top-24">
            <div className="mb-6 pb-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white mb-1">Book This Car</h3>
                <p className="text-slate-400 text-sm">Fill out the form to request {carName}.</p>
            </div>

            <form className="space-y-4">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Rental Period</label>
                    <div className="grid grid-cols-1 gap-4">
                        <DatePicker
                            date={pickupDate}
                            setDate={setPickupDate}
                            placeholder="Pick-up Date"
                            disabled={{ before: today }}
                        />
                        <DatePicker
                            date={returnDate}
                            setDate={setReturnDate}
                            placeholder="Return Date"
                            disabled={pickupDate ? { before: pickupDate } : { before: today }}
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Personal Info</label>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/50 transition-colors">
                            <User size={16} className="text-slate-500" />
                            <input type="text" placeholder="Full Name" className="bg-transparent text-white text-sm w-full outline-none placeholder-slate-600" />
                        </div>
                        <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/50 transition-colors">
                            <Mail size={16} className="text-slate-500" />
                            <input type="email" placeholder="Email Address" className="bg-transparent text-white text-sm w-full outline-none placeholder-slate-600" />
                        </div>
                        <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/50 transition-colors">
                            <Phone size={16} className="text-slate-500" />
                            <input type="tel" placeholder="Phone Number" className="bg-transparent text-white text-sm w-full outline-none placeholder-slate-600" />
                        </div>
                    </div>
                </div>

                <button className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-4 hover:translate-y-[-2px] transition-transform">
                    Submit Request
                    <Send size={16} />
                </button>

                <p className="text-xs text-slate-500 text-center mt-4">
                    *We will contact you shortly to confirm availability.
                </p>
            </form>
        </div>
    );
};
