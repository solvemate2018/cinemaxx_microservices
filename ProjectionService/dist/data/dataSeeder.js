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
const Projection_1 = __importDefault(require("../models/Projection"));
const Booking_1 = __importDefault(require("../models/Booking"));
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Booking_1.default.deleteMany({});
    yield Projection_1.default.deleteMany({});
    const now = new Date();
    const addHours = (date, hours) => {
        const newDate = new Date(date);
        newDate.setHours(date.getHours() + hours);
        return newDate;
    };
    // Seed Projection data
    const projections = [
        { movieId: 101, cinemaHallId: 1, startTime: addHours(now, 2), endTime: addHours(now, 4), price: 12.50 },
        { movieId: 102, cinemaHallId: 2, startTime: addHours(now, 5), endTime: addHours(now, 7.5), price: 15.00 },
        { movieId: 103, cinemaHallId: 3, startTime: addHours(now, 8), endTime: addHours(now, 10.25), price: 10.00 },
        { movieId: 104, cinemaHallId: 1, startTime: addHours(now, 10), endTime: addHours(now, 12), price: 8.00 },
        { movieId: 105, cinemaHallId: 2, startTime: addHours(now, 13), endTime: addHours(now, 15.5), price: 11.50 }
    ];
    const projectionDocs = yield Projection_1.default.insertMany(projections);
    console.log('Projection data seeded successfully!');
    // Seed Booking data
    const bookings = [
        { userId: 1, projectionId: projectionDocs[0]._id, totalPrice: 25.00, status: 'requested', seats: [5, 6, 7] },
        { userId: 2, projectionId: projectionDocs[1]._id, totalPrice: 30.00, status: 'active', seats: [10, 11, 12] },
        { userId: 3, projectionId: projectionDocs[2]._id, totalPrice: 15.00, status: 'past', seats: [1, 2, 3] },
        { userId: 4, projectionId: projectionDocs[3]._id, totalPrice: 20.00, status: 'requested', seats: [20, 21] },
        { userId: 5, projectionId: projectionDocs[4]._id, totalPrice: 45.00, status: 'active', seats: [25, 26, 27, 28] }
    ];
    yield Booking_1.default.insertMany(bookings);
    console.log('Booking data seeded successfully!');
});
exports.default = seedData;
