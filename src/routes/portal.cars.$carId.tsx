import { createFileRoute } from '@tanstack/react-router'
import { PortalCarDetails } from '../features/admin/pages/PortalCarDetails'

export const Route = createFileRoute('/portal/cars/$carId')({
    component: PortalCarDetails,
})
