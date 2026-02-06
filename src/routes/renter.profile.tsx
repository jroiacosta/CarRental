import { createFileRoute } from '@tanstack/react-router'
import { RenterProfile } from '../features/renter/pages/RenterProfile'

export const Route = createFileRoute('/renter/profile')({
  component: RenterProfile,
})
