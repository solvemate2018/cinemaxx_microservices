"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectionSchema = new mongoose_1.Schema({
    movieId: { type: Number, required: true },
    cinemaHallId: { type: Number, required: true },
    cinemaId: { type: Number, required: true },
    scheduleId: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    seats: { type: [], required: true },
    price: { type: Number, required: true, validate: {
            validator: (value) => value.valueOf() > 1,
            message: 'Price must be higher then 1.',
        },
    }
});
exports.default = (0, mongoose_1.model)('Projection', projectionSchema);
