import { createFileRoute } from "@tanstack/react-router";
import RenterBookings from "../features/renter/pages/RenterBookings";

export const Route = createFileRoute("/renter/bookings")({
  component: RenterBookings,
});
