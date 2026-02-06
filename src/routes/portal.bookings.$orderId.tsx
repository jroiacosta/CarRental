import { createFileRoute } from '@tanstack/react-router'
import { PortalBookingDetails } from '../features/admin/pages/PortalBookingDetails'

export const Route = createFileRoute('/portal/bookings/$orderId')({
  component: PortalBookingDetails,
})
