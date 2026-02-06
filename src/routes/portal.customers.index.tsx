import { createFileRoute } from '@tanstack/react-router'
import { PortalCustomers } from '../features/admin/pages/PortalCustomers'

export const Route = createFileRoute('/portal/customers/')({
    component: PortalCustomers,
})
