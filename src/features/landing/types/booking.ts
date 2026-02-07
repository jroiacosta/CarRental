/** Shape of driver info from the booking form (used for checkout auto-fill). */
export interface BookingFormData {
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    phone: string;
    age: string;
}

/** Minimal car info needed for checkout (id, name, price, image). */
export interface BookingCar {
    id: string;
    name: string;
    price: number;
    image: string;
}

/** State passed from booking form to checkout page via router. Dates are YYYY-MM-DD to avoid timezone issues. */
export interface BookingState {
    car: BookingCar;
    pickupDate: string; // YYYY-MM-DD (local calendar date)
    returnDate: string; // YYYY-MM-DD (local calendar date)
    formData: BookingFormData;
}

/** Parse a YYYY-MM-DD string as local date (no timezone shift). */
export function parseBookingDate(dateStr: string): Date {
    const parts = dateStr.split("-").map(Number);
    const y = parts[0] ?? 0;
    const m = (parts[1] ?? 1) - 1;
    const d = parts[2] ?? 1;
    return new Date(y, m, d);
}
