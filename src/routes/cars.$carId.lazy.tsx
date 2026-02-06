import { createLazyFileRoute } from '@tanstack/react-router';
import CarDetailsPage from '../features/landing/pages/CarDetailsPage';

export const Route = createLazyFileRoute('/cars/$carId')({
    component: CarDetailsPage,
});
