import { Router } from 'express';
import bookingController from '../controllers/bookingController';
import { authenticateJWT, authorize } from '../middleware/authenticationMiddleware';

const router = Router();

router.get('/projections/:projectionId/bookings', authenticateJWT, authorize(["ADMIN"]),  bookingController.getAllBookingsForProjection);
router.post('/projections/:projectionId/bookings', authenticateJWT, bookingController.createBookingForProjection);
router.get('/bookings/:bookingId', authenticateJWT, bookingController.getBookingById);
router.delete('/bookings/:bookingId', authenticateJWT, bookingController.deleteBookingById);

export default router;