import { Router } from 'express';
import bookingController from '../controllers/bookingController';

const router = Router();

router.get('/api/projections/:projectionId/bookings', bookingController.getAllBookingsForProjection);
router.post('/api/projections/:projectionId/bookings', bookingController.createBookingForProjection);
router.get('/api/projections/:projectionId/bookings/:bookingId', bookingController.getBookingByIdForProjection);
router.put('/api/projections/:projectionId/bookings/:bookingId', bookingController.updateBookingForProjection);
router.delete('/api/projections/:projectionId/bookings/:bookingId', bookingController.deleteBookingForProjection);

export default router;