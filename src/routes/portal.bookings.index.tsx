import { createFileRoute } from '@tanstack/react-router'
import { PortalBookings } from '../features/admin/pages/PortalBookings'

export const Route = createFileRoute('/portal/bookings/')({
    component: PortalBookings,
})
