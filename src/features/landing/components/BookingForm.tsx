import { useParams, useNavigate } from "@tanstack/react-router";
import { cn } from "../../../common/utils";
import { Send, User, Mail, Phone, Calendar as CalendarIcon } from "lucide-react";
import { CARS } from "../data/cars";
import { useState } from "react";
import { toast } from "sonner";
import { DatePicker } from "../../../components/ui/DatePicker";
import { FileDropzone } from "../../../components/ui/FileDropzone";
import type { BookingState } from "../types/booking";

export const BookingForm = ({ carName }: { carName: string }) => {
    const { carId } = useParams({ strict: false });
    const navigate = useNavigate();
    const car = CARS.find((c) => c.id === carId);

    const [pickupDate, setPickupDate] = useState<Date>();
    const [returnDate, setReturnDate] = useState<Date>();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+1",
        phone: "",
        age: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!pickupDate || !returnDate) {
            toast.error("Please select both pick-up and return dates.");
            return;
        }
        if (!car) {
            toast.error("Car not found.");
            return;
        }

        const toDateString = (d: Date) =>
            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

        const booking: BookingState = {
            car: {
                id: car.id,
                name: car.name,
                price: car.price,
                image: car.image,
            },
            pickupDate: toDateString(pickupDate),
            returnDate: toDateString(returnDate),
            formData,
        };

        navigate({
            to: "/checkout",
            state: { booking } as Record<string, unknown>,
        });
    };

    return (
        <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-xl sticky top-24 min-h-[500px] flex flex-col">
            <div className="mb-6 pb-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white mb-1">Book This Car</h3>
                <p className="text-slate-400 text-sm">Fill out the form to request {carName}.</p>
            </div>

            <form className="space-y-4 flex-1" onSubmit={handleSubmit}>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                        Rental Period
                    </label>
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
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                        Driver Information
                    </label>
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/50 transition-colors">
                                <User size={16} className="text-slate-500" />
                                <input
                                    required
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="First Name"
                                    className="bg-transparent text-white text-sm w-full outline-none placeholder-slate-600"
                                />
                            </div>
                            <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/50 transition-colors">
                                <input
                                    required
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Last Name"
                                    className="bg-transparent text-white text-sm w-full outline-none placeholder-slate-600"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/50 transition-colors">
                            <Mail size={16} className="text-slate-500" />
                            <input
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                type="email"
                                placeholder="Email Address"
                                className="bg-transparent text-white text-sm w-full outline-none placeholder-slate-600"
                            />
                        </div>

                        <div className="flex gap-2">
                            <select
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleInputChange}
                                className="bg-slate-950 border border-white/10 rounded-lg px-3 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                            >
                                <option value="+1">🇺🇸 +1</option>
                                <option value="+44">🇬🇧 +44</option>
                                <option value="+63">🇵🇭 +63</option>
                                <option value="+971">🇦🇪 +971</option>
                            </select>
                            <div className="flex-1 flex items-center gap-3 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/50 transition-colors">
                                <Phone size={16} className="text-slate-500" />
                                <input
                                    required
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    type="tel"
                                    placeholder="Mobile Number"
                                    className="bg-transparent text-white text-sm w-full outline-none placeholder-slate-600"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/50 transition-colors">
                            <CalendarIcon size={16} className="text-slate-500" />
                            <input
                                required
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                type="number"
                                placeholder="Driver's Age"
                                min="18"
                                max="99"
                                className="bg-transparent text-white text-sm w-full outline-none placeholder-slate-600"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <FileDropzone
                        label="Upload Driver's License"
                        onFileSelect={(file) => console.log("License:", file)}
                    />
                    <FileDropzone
                        label="Upload Insurance"
                        onFileSelect={(file) => console.log("Insurance:", file)}
                    />
                </div>

                <button
                    type="submit"
                    className={cn(
                        "w-full btn-primary py-4 flex items-center justify-center gap-2 mt-4",
                        "hover:translate-y-[-2px] transition-transform"
                    )}
                >
                    Check Availability & Continue
                    <Send size={16} />
                </button>
            </form>
        </div>
    );
};
