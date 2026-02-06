import { createFileRoute } from '@tanstack/react-router'
import { PortalDashboard } from '../features/admin/pages/PortalDashboard'

export const Route = createFileRoute('/portal/dashboard')({
  component: PortalDashboard,
})

