"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingController_1 = __importDefault(require("../controllers/bookingController"));
const router = (0, express_1.Router)();
router.get('/api/projections/:projectionId/bookings', bookingController_1.default.getAllBookingsForProjection);
router.post('/api/projections/:projectionId/bookings', bookingController_1.default.createBookingForProjection);
router.get('/api/projections/:projectionId/bookings/:bookingId', bookingController_1.default.getBookingByIdForProjection);
router.put('/api/projections/:projectionId/bookings/:bookingId', bookingController_1.default.updateBookingForProjection);
router.delete('/api/projections/:projectionId/bookings/:bookingId', bookingController_1.default.deleteBookingForProjection);
exports.default = router;
