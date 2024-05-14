"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ticketSchema = new mongoose_1.Schema({
    bookingId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    seatId: { type: Number, required: true },
    price: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)('Ticket', ticketSchema);
