import { createFileRoute } from '@tanstack/react-router'
import { PortalSettings } from '../features/admin/pages/PortalSettings'

export const Route = createFileRoute('/portal/settings')({
  component: PortalSettings,
})
