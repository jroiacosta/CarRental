import { createFileRoute, redirect } from "@tanstack/react-router";
import { RenterLayout } from "../features/renter/layouts/RenterLayout";
import { auth } from "../common/auth";

export const Route = createFileRoute("/renter")({
    beforeLoad: ({ location }) => {
        if (!auth.isAuthenticated()) {
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href,
                },
            });
        }

        // Strict Role Check: If user is admin, redirect them to portal
        const role = auth.getRole();
        if (role === 'admin') {
            throw redirect({ to: "/portal/dashboard" });
        }
    },
    component: RenterLayout,
});
