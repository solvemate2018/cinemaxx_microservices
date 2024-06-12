"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Booking_1 = __importDefault(require("../models/Booking"));
const Projection_1 = __importDefault(require("../models/Projection"));
const bookingController = {
    //Used by admin
    getAllBookingsForProjection: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const projectionId = req.params.projectionId;
            const bookings = yield Booking_1.default.find({ projectionId: projectionId });
            res.json(bookings);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }),
    //Used by user to make reservations
    //Needs to validate UserID or get it from context
    //Needs to validate Seats
    createBookingForProjection: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const projectionId = req.params.projectionId;
            const requestedSeatIds = req.body.map((seat) => seat.id);
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
            const projection = yield Projection_1.default.findById(projectionId);
            if (projection) {
                const totalPrice = projection.price * requestedSeatIds.length;
                const seats = projection.seats.filter(seat => requestedSeatIds.includes(seat.id));
                if (seats.length == requestedSeatIds.length) {
                    projection.seats = projection.seats.map(seat => {
                        if (requestedSeatIds.includes(seat.id)) {
                            seat.status = 'Booked';
                            return seat;
                        }
                        return seat;
                    });
                    yield Projection_1.default.findOneAndUpdate({ _id: projection._id }, { seats: projection.seats });
                    const newBooking = new Booking_1.default({ seats: seats, status: 'active', totalPrice: totalPrice, projectionId: projectionId, userId: userId });
                    const savedBooking = yield newBooking.save();
                    res.status(201).json(savedBooking);
                }
                else {
                    res.status(404).send('Some of the seats do not exist for this projection');
                }
            }
            else {
                res.status(404).send('Projection not found');
            }
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }),
    //Used by user 
    getBookingById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const booking = yield Booking_1.default.findOne({ _id: req.params.bookingId });
            const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            if (userId && booking.userId !== parseInt(userId)) {
                return res.status(403).json({ message: `Can't get booking that is not yours!` });
            }
            res.json(booking);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }),
    //Used by user
    //Don't have to validate anything
    deleteBookingById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        try {
            const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
            const booking = yield Booking_1.default.findOne({ _id: req.params.bookingId });
            if (booking && userId && booking.userId === parseInt(userId)) {
                yield Booking_1.default.findOneAndDelete({ _id: req.params.bookingId });
                res.json({ message: 'Booking deleted successfully' });
            }
            else if (booking && userId) {
                res.status(403).json({ message: "You can't delete booking that is not yours." });
            }
            else {
                res.status(404).json({ message: "Booking not found." });
            }
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }),
};
exports.default = bookingController;
