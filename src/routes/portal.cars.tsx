import { createFileRoute } from '@tanstack/react-router'
import { PortalCars } from '../features/admin/pages/PortalCars'

export const Route = createFileRoute('/portal/cars')({
    component: PortalCars,
})
