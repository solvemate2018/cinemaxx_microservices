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
    createBookingForProjection: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const projectionId = req.params.projectionId;
            const booking = req.body;
            const newBooking = new Booking_1.default(Object.assign(Object.assign({}, booking), { projectionId: projectionId }));
            const savedBooking = yield newBooking.save();
            res.status(201).json(savedBooking);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }),
    //Used by user 
    getBookingByIdForProjection: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const projectionId = req.params.projectionId;
            const booking = yield Booking_1.default.findOne({ _id: req.params.bookingId, projectionId: projectionId });
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.json(booking);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }),
    //Used by user
    updateBookingForProjection: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const projectionId = req.params.projectionId;
            const updatedBooking = yield Booking_1.default.findOneAndUpdate({ _id: req.params.bookingId, projectionId: projectionId }, req.body, { new: true });
            if (!updatedBooking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.json(updatedBooking);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }),
    //Used by user
    deleteBookingForProjection: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const projectionId = req.params.projectionId;
            const deletedBooking = yield Booking_1.default.findOneAndDelete({ _id: req.params.bookingId, projectionId: projectionId });
            if (!deletedBooking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.json({ message: 'Booking deleted successfully' });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }),
};
exports.default = bookingController;
