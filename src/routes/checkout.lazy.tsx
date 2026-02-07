import { createLazyFileRoute } from "@tanstack/react-router";
import CheckoutPage from "../features/landing/pages/CheckoutPage";

export const Route = createLazyFileRoute("/checkout")({
    component: CheckoutPage,
});
