import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginPage from "../features/auth/pages/LoginPage";
import { auth } from "../common/auth";

export const Route = createFileRoute("/login")({
    beforeLoad: () => {
        if (auth.isAuthenticated()) {
            throw redirect({ to: "/portal/dashboard" });
        }
    },
    component: LoginPage,
});
