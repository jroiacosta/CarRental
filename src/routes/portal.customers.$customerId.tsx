import { createFileRoute } from '@tanstack/react-router'
import { PortalCustomerDetails } from '../features/admin/pages/PortalCustomerDetails'

export const Route = createFileRoute('/portal/customers/$customerId')({
  component: PortalCustomerDetails,
})
