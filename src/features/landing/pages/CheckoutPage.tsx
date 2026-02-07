import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
    CreditCard,
    ArrowLeft,
    ShieldCheck,
    CheckCircle2,
    Plus,
    Banknote,
    Building2,
    Tag,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../../common/utils";
import { parseBookingDate, type BookingState, type BookingFormData } from "../types/booking";
import { TachometerLoader } from "../../../components/ui/CarLoader";

const SERVICE_FEE = 45;

/** Sample voucher codes: code -> { type: 'percent' | 'fixed', value: number } */
const VOUCHERS: Record<string, { type: "percent"; value: number } | { type: "fixed"; value: number }> = {
    SAVE10: { type: "percent", value: 10 },
    WELCOME20: { type: "fixed", value: 20 },
    DRIVE15: { type: "percent", value: 15 },
    FLAT50: { type: "fixed", value: 50 },
};

type PaymentType = "card" | "pay_on_pickup" | "pay_at_counter";

interface PaymentMethod {
    id: string;
    type: string;
    last4: string;
    expiry: string;
}

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = (location.state as { booking?: BookingState })?.booking;

    const [step, setStep] = useState<"checkout" | "success">("checkout");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Auto-filled from booking (editable)
    const [details, setDetails] = useState<BookingFormData>({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+1",
        phone: "",
        age: "",
    });

    // Voucher
    const [voucherCode, setVoucherCode] = useState("");
    const [appliedVoucher, setAppliedVoucher] = useState<keyof typeof VOUCHERS | null>(null);
    const [voucherError, setVoucherError] = useState("");

    // Payment
    const [paymentType, setPaymentType] = useState<PaymentType>("card");
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
        { id: "1", type: "Visa", last4: "4242", expiry: "12/26" },
    ]);
    const [selectedPaymentId, setSelectedPaymentId] = useState("1");
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCard, setNewCard] = useState({ number: "", expiry: "", cvv: "", name: "" });

    useEffect(() => {
        if (!booking) {
            navigate({ to: "/" });
            return;
        }
        setDetails(booking.formData);
    }, [booking, navigate]);

    const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleNewCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCard((prev) => ({ ...prev, [name]: value }));
    };

    const applyVoucher = () => {
        const code = voucherCode.trim().toUpperCase();
        if (!code) {
            setVoucherError("Enter a voucher code");
            return;
        }
        if (VOUCHERS[code]) {
            setAppliedVoucher(code);
            setVoucherError("");
            toast.success("Voucher applied!");
        } else {
            setVoucherError("Invalid or expired code");
            setAppliedVoucher(null);
        }
    };

    const removeVoucher = () => {
        setAppliedVoucher(null);
        setVoucherCode("");
        setVoucherError("");
    };

    const handleAddCard = (e: React.FormEvent) => {
        e.preventDefault();
        const id = Math.random().toString(36).substr(2, 9);
        setPaymentMethods((prev) => [
            ...prev,
            { id, type: "Card", last4: newCard.number.slice(-4), expiry: newCard.expiry },
        ]);
        setSelectedPaymentId(id);
        setIsAddingCard(false);
        setNewCard({ number: "", expiry: "", cvv: "", name: "" });
        toast.success("Payment method added!");
    };

    const subtotal = (() => {
        if (!booking?.car || !booking?.pickupDate || !booking?.returnDate) return 0;
        const pickup = parseBookingDate(booking.pickupDate);
        const returnD = parseBookingDate(booking.returnDate);
        const diffTime = Math.abs(returnD.getTime() - pickup.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        return diffDays * booking.car.price + SERVICE_FEE;
    })();

    const discount = (() => {
        if (!appliedVoucher || !VOUCHERS[appliedVoucher]) return 0;
        const v = VOUCHERS[appliedVoucher];
        if (v.type === "percent") return (subtotal * v.value) / 100;
        return Math.min(v.value, subtotal);
    })();

    const total = Math.max(0, subtotal - discount);

    const handleConfirm = async () => {
        if (paymentType === "card" && !selectedPaymentId) {
            toast.error("Select or add a payment method.");
            return;
        }
        setIsSubmitting(true);
        await new Promise((r) => setTimeout(r, 2000));
        setIsSubmitting(false);
        setStep("success");
        toast.success("Reservation completed!");
    };

    if (!booking) return null;

    const pickupDate = parseBookingDate(booking.pickupDate);
    const returnDate = parseBookingDate(booking.returnDate);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-body">
            {/* Simple header */}
            <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium"
                    >
                        <ArrowLeft size={18} className="mr-2" /> Back to Fleet
                    </Link>
                    <h1 className="text-lg font-bold text-white">Checkout</h1>
                    <div className="w-20" />
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24">
                <AnimatePresence mode="wait">
                    {step === "checkout" && (
                        <motion.div
                            key="checkout"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 lg:grid-cols-[1fr,min(400px,100%)] gap-8 lg:gap-10 items-start"
                        >
                            {/* Left: Order details */}
                            <div className="space-y-6">
                                {/* Booking summary */}
                                <section className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                                    <h2 className="text-lg font-bold text-white mb-4">Booking Summary</h2>
                                    <div className="flex gap-4 mb-4">
                                        <img
                                            src={booking.car.image}
                                            alt={booking.car.name}
                                            className="w-24 h-24 object-cover rounded-xl"
                                        />
                                        <div>
                                            <p className="text-white font-bold">{booking.car.name}</p>
                                            <p className="text-slate-500 text-sm mt-1">
                                                {pickupDate.toLocaleDateString()} – {returnDate.toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Pick-up</span>
                                            <span className="text-white">{pickupDate.toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Return</span>
                                            <span className="text-white">{returnDate.toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </section>

                                {/* Contact details (auto-filled, editable) */}
                                <section className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                                    <h2 className="text-lg font-bold text-white mb-4">Contact & Driver Details</h2>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <input
                                            name="firstName"
                                            value={details.firstName}
                                            onChange={handleDetailsChange}
                                            placeholder="First name"
                                            className="bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 placeholder-slate-500"
                                        />
                                        <input
                                            name="lastName"
                                            value={details.lastName}
                                            onChange={handleDetailsChange}
                                            placeholder="Last name"
                                            className="bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 placeholder-slate-500"
                                        />
                                        <input
                                            name="email"
                                            type="email"
                                            value={details.email}
                                            onChange={handleDetailsChange}
                                            placeholder="Email"
                                            className="sm:col-span-2 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 placeholder-slate-500"
                                        />
                                        <input
                                            name="phone"
                                            type="tel"
                                            value={details.phone}
                                            onChange={handleDetailsChange}
                                            placeholder="Phone"
                                            className="sm:col-span-2 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 placeholder-slate-500"
                                        />
                                    </div>
                                </section>

                                {/* Voucher code */}
                                <section className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                                    <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <Tag size={20} className="text-red-500" /> Voucher / Promo Code
                                    </h2>
                                    {appliedVoucher ? (
                                        <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3">
                                            <span className="text-green-400 font-medium">{appliedVoucher} applied</span>
                                            <button
                                                type="button"
                                                onClick={removeVoucher}
                                                className="text-slate-400 hover:text-white text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input
                                                value={voucherCode}
                                                onChange={(e) => {
                                                    setVoucherCode(e.target.value.toUpperCase());
                                                    setVoucherError("");
                                                }}
                                                placeholder="e.g. SAVE10, WELCOME20"
                                                className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 placeholder-slate-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={applyVoucher}
                                                className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    )}
                                    {voucherError && <p className="text-red-400 text-xs mt-2">{voucherError}</p>}
                                    <p className="text-slate-500 text-xs mt-2">
                                        Try: SAVE10 (10% off), WELCOME20 ($20 off), DRIVE15 (15% off), FLAT50 ($50 off)
                                    </p>
                                </section>
                            </div>

                            {/* Right: Payment & total (sticky on desktop) */}
                            <div className="lg:sticky lg:top-24 space-y-6">
                            {/* Payment method */}
                            <section className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                                <h2 className="text-lg font-bold text-white mb-4">Payment Method</h2>

                                <div className="space-y-2">
                                    {/* Card */}
                                    <button
                                        type="button"
                                        onClick={() => setPaymentType("card")}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left",
                                            paymentType === "card"
                                                ? "border-red-500/50 bg-red-500/5"
                                                : "border-white/10 hover:border-white/20 bg-slate-950/50"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                                paymentType === "card" ? "border-red-500 bg-red-500" : "border-slate-600"
                                            )}
                                        >
                                            {paymentType === "card" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                        <CreditCard size={20} className="text-slate-400" />
                                        <span className="text-white font-medium">Credit / Debit Card</span>
                                    </button>

                                    {/* Pay on pickup */}
                                    <button
                                        type="button"
                                        onClick={() => setPaymentType("pay_on_pickup")}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left",
                                            paymentType === "pay_on_pickup"
                                                ? "border-red-500/50 bg-red-500/5"
                                                : "border-white/10 hover:border-white/20 bg-slate-950/50"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                                paymentType === "pay_on_pickup" ? "border-red-500 bg-red-500" : "border-slate-600"
                                            )}
                                        >
                                            {paymentType === "pay_on_pickup" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                        <Banknote size={20} className="text-slate-400" />
                                        <div className="text-left">
                                            <span className="text-white font-medium block">Pay on Pickup</span>
                                            <span className="text-slate-500 text-xs">Pay when you collect the vehicle (cash or card)</span>
                                        </div>
                                    </button>

                                    {/* Pay at counter / bank */}
                                    <button
                                        type="button"
                                        onClick={() => setPaymentType("pay_at_counter")}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left",
                                            paymentType === "pay_at_counter"
                                                ? "border-red-500/50 bg-red-500/5"
                                                : "border-white/10 hover:border-white/20 bg-slate-950/50"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                                paymentType === "pay_at_counter" ? "border-red-500 bg-red-500" : "border-slate-600"
                                            )}
                                        >
                                            {paymentType === "pay_at_counter" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                        <Building2 size={20} className="text-slate-400" />
                                        <div className="text-left">
                                            <span className="text-white font-medium block">Pay at Counter / Bank Transfer</span>
                                            <span className="text-slate-500 text-xs">Pay at our office or via bank transfer (details after booking)</span>
                                        </div>
                                    </button>
                                </div>

                                {paymentType === "card" && (
                                    <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Saved cards</p>
                                        {paymentMethods.map((method) => (
                                            <button
                                                key={method.id}
                                                type="button"
                                                onClick={() => setSelectedPaymentId(method.id)}
                                                className={cn(
                                                    "w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left",
                                                    selectedPaymentId === method.id
                                                        ? "border-red-500/50 bg-red-500/5"
                                                        : "border-white/10 hover:border-white/20"
                                                )}
                                            >
                                                <CreditCard size={16} className="text-slate-500" />
                                                <span className="text-white text-sm">{method.type} •••• {method.last4}</span>
                                                <span className="text-slate-500 text-xs">Exp {method.expiry}</span>
                                            </button>
                                        ))}
                                        {!isAddingCard ? (
                                            <button
                                                type="button"
                                                onClick={() => setIsAddingCard(true)}
                                                className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-white/10 rounded-lg text-slate-400 hover:text-white hover:border-white/20 text-sm"
                                            >
                                                <Plus size={16} /> Add new card
                                            </button>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="bg-slate-950 border border-white/10 rounded-lg p-4 space-y-3"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-bold text-slate-400 uppercase">New card</span>
                                                    <button type="button" onClick={() => setIsAddingCard(false)} className="text-slate-500 hover:text-white text-sm">Cancel</button>
                                                </div>
                                                <input
                                                    name="name"
                                                    value={newCard.name}
                                                    onChange={handleNewCardChange}
                                                    placeholder="Cardholder name"
                                                    className="w-full bg-slate-900 border border-white/5 rounded-md px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-red-500/50"
                                                />
                                                <input
                                                    name="number"
                                                    value={newCard.number}
                                                    onChange={handleNewCardChange}
                                                    placeholder="Card number"
                                                    className="w-full bg-slate-900 border border-white/5 rounded-md px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-red-500/50"
                                                />
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input
                                                        name="expiry"
                                                        value={newCard.expiry}
                                                        onChange={handleNewCardChange}
                                                        placeholder="MM/YY"
                                                        className="bg-slate-900 border border-white/5 rounded-md px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-red-500/50"
                                                    />
                                                    <input
                                                        name="cvv"
                                                        value={newCard.cvv}
                                                        onChange={handleNewCardChange}
                                                        placeholder="CVV"
                                                        className="bg-slate-900 border border-white/5 rounded-md px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-red-500/50"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={handleAddCard}
                                                    className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-bold transition-colors"
                                                >
                                                    Add card
                                                </button>
                                            </motion.div>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-4">
                                    <ShieldCheck size={14} className="text-green-500" /> Secure payment
                                </div>
                            </section>

                                {/* Totals */}
                                <section className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between text-slate-400">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        {appliedVoucher && (
                                            <div className="flex justify-between text-green-400">
                                                <span>Discount ({appliedVoucher})</span>
                                                <span>-${discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-white font-bold text-xl pt-3 border-t border-white/10">
                                            <span>Total</span>
                                            <span className="text-red-500">${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </section>

                                <button
                                    type="button"
                                    onClick={handleConfirm}
                                    disabled={isSubmitting}
                                    className="w-full btn-primary py-4 flex items-center justify-center gap-2 rounded-xl font-bold text-lg disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <TachometerLoader size={22} /> Finalizing...
                                        </>
                                    ) : (
                                        <>
                                            Confirm reservation
                                            <CheckCircle2 size={20} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === "success" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="text-green-500" size={48} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Reservation confirmed!</h2>
                            <p className="text-slate-400 mb-8">
                                Thanks, {details.firstName}. Your {booking.car.name} booking for {pickupDate.toLocaleDateString()} is confirmed.
                            </p>
                            <p className="text-slate-500 text-sm mb-8">Confirmation sent to {details.email}</p>
                            <Link
                                to="/"
                                className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-medium transition-colors"
                            >
                                Back to Fleet
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
