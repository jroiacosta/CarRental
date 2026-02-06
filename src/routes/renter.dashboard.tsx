import { createFileRoute } from "@tanstack/react-router";
import RenterDashboard from "../features/renter/pages/RenterDashboard";

export const Route = createFileRoute("/renter/dashboard")({
    component: RenterDashboard,
});
