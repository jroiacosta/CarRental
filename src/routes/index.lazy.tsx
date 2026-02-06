import { createLazyFileRoute } from "@tanstack/react-router";
import LandingPage from "../features/landing/pages/LandingPage";

export const Route = createLazyFileRoute("/")({
    component: LandingPage,
});
