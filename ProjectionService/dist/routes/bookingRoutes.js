"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingController_1 = __importDefault(require("../controllers/bookingController"));
const authenticationMiddleware_1 = require("../middleware/authenticationMiddleware");
const router = (0, express_1.Router)();
router.get('/projections/:projectionId/bookings', authenticationMiddleware_1.authenticateJWT, (0, authenticationMiddleware_1.authorize)(["ADMIN"]), bookingController_1.default.getAllBookingsForProjection);
router.post('/projections/:projectionId/bookings', authenticationMiddleware_1.authenticateJWT, bookingController_1.default.createBookingForProjection);
router.get('/bookings/:bookingId', authenticationMiddleware_1.authenticateJWT, bookingController_1.default.getBookingById);
router.delete('/bookings/:bookingId', authenticationMiddleware_1.authenticateJWT, bookingController_1.default.deleteBookingById);
exports.default = router;
