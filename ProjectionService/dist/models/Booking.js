"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    userId: { type: Number, required: true },
    projectionId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Projection' },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, enum: ['requested', 'active', 'past'] },
    seats: { type: [], required: true }
});
exports.default = (0, mongoose_1.model)('Booking', bookingSchema);
