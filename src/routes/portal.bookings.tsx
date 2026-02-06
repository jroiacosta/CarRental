import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/portal/bookings')({
    component: () => <Outlet />,
})
