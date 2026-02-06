import { createFileRoute, redirect } from "@tanstack/react-router";
import { PortalLayout } from "../features/admin/layouts/PortalLayout";
import { auth } from "../common/auth";

export const Route = createFileRoute("/portal")({
    beforeLoad: ({ location }) => {
        if (!auth.isAuthenticated()) {
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href,
                },
            });
        }

        // Strict Role Check: If user is renter, redirect them to renter portal
        const role = auth.getRole();
        if (role === 'renter') {
            throw redirect({ to: "/renter/dashboard" });
        }
    },
    component: PortalLayout,
});
