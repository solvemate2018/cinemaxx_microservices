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
exports.consumeMovieDurationUpdated = exports.consumeMovieDeleted = exports.consumeCinemaHallScheduleUpdated = exports.consumeCinemaHallScheduleCreated = exports.consumeCinemaHallScheduleDeleted = exports.consumeCinemaHallDeleted = exports.consumeCinemaDeleted = void 0;
const Projection_1 = __importDefault(require("../../../models/Projection"));
const moment_1 = __importDefault(require("moment"));
const mongodb_1 = require("mongodb");
const logger_1 = __importDefault(require("../../../logging/logger"));
//Delete all the projections in that cinema
//CinemaId
function consumeCinemaDeleted(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        logReceivedMessage("DELETED CINEMA", msg);
        const jsonObject = parseMessageContent(msg);
        if (jsonObject) {
            yield deleteProjectionsByField("cinemaId", jsonObject.id, `cinema ${jsonObject.name}`);
        }
    });
}
exports.consumeCinemaDeleted = consumeCinemaDeleted;
//Delete all the projections in that cinema hall
//CinemaHallId
function consumeCinemaHallDeleted(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        logReceivedMessage("DELETED CINEMA_HALL", msg);
        const jsonObject = parseMessageContent(msg);
        if (jsonObject) {
            yield deleteProjectionsByField("cinemaHallId", jsonObject.id, `cinema hall ${jsonObject.name}`);
        }
    });
}
exports.consumeCinemaHallDeleted = consumeCinemaHallDeleted;
//Delete all the projections from that schedule
//ScheduleId
function consumeCinemaHallScheduleDeleted(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        logReceivedMessage("DELETED CINEMA_HALL_SCHEDULE", msg);
        const jsonObject = parseMessageContent(msg);
        if (jsonObject) {
            yield deleteProjectionsByField("scheduleId", jsonObject.id, `schedule ${jsonObject.name}`);
        }
    });
}
exports.consumeCinemaHallScheduleDeleted = consumeCinemaHallScheduleDeleted;
//Create projections based on the schedule
//The whole schedule
function consumeCinemaHallScheduleCreated(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        logReceivedMessage("CREATED CINEMA_HALL_SCHEDULE", msg);
        const jsonObject = parseMessageContent(msg);
        if (jsonObject) {
            const projections = generateProjections(jsonObject);
            try {
                const generatedProjections = yield Projection_1.default.insertMany(projections);
                logger_1.default.info(`Created ${generatedProjections.length} projections for schedule ${jsonObject.id}`);
            }
            catch (error) {
                logger_1.default.error("Error creating projections:", error);
            }
        }
    });
}
exports.consumeCinemaHallScheduleCreated = consumeCinemaHallScheduleCreated;
//Update all the projections based on the updated schedule
//Can't update them because the amount of the projections might have changed so we have to delete all of them and create new ones ;}
//The whole schedule
function consumeCinemaHallScheduleUpdated(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        logReceivedMessage("UPDATED CINEMA_HALL_SCHEDULE", msg);
        const jsonObject = parseMessageContent(msg);
        if (jsonObject) {
            try {
                yield deleteProjectionsByField("scheduleId", jsonObject.id, `schedule ${jsonObject.name}`);
                const projections = generateProjections(jsonObject);
                const generatedProjections = yield Projection_1.default.insertMany(projections);
                logger_1.default.info(`Created ${generatedProjections.length} projections for schedule ${jsonObject.id}`);
            }
            catch (error) {
                logger_1.default.error("Error updating projections:", error);
            }
        }
    });
}
exports.consumeCinemaHallScheduleUpdated = consumeCinemaHallScheduleUpdated;
//Delete all projections with that movie
//movieId:
function consumeMovieDeleted(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        logReceivedMessage("DELETED MOVIE", msg);
        const jsonObject = parseMessageContent(msg);
        if (jsonObject) {
            yield deleteProjectionsByField("movieId", jsonObject.Id, `movie ${jsonObject.Title}`);
        }
    });
}
exports.consumeMovieDeleted = consumeMovieDeleted;
//Update all projections based on the new duration
//movieId: newDuration:
function consumeMovieDurationUpdated(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        logReceivedMessage("UPDATED MOVIE_DURATION", msg);
        const jsonObject = parseMessageContent(msg);
        if (jsonObject) {
            const { Id, Duration } = jsonObject;
            try {
                const updatedCount = yield Projection_1.default.updateMany({ movieId: Id }, { $set: { endTime: { $add: ["$startTime", Duration * 60000] } } });
                logger_1.default.info(`Updated endTime for ${updatedCount.modifiedCount} projections with movie id: ${Id}`);
            }
            catch (error) {
                logger_1.default.error("Error updating projection endTime:", error);
            }
        }
    });
}
exports.consumeMovieDurationUpdated = consumeMovieDurationUpdated;
// Utility function to log received messages
function logReceivedMessage(action, msg) {
    logger_1.default.info(`Received message for ${action}: ${msg === null || msg === void 0 ? void 0 : msg.content.toString()}`);
}
// Utility function to parse message content
function parseMessageContent(msg) {
    return (msg === null || msg === void 0 ? void 0 : msg.content) ? JSON.parse(msg.content.toString()) : null;
}
function deleteProjectionsByField(field, value, entityName) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteCount = (yield Projection_1.default.deleteMany({ [field]: value })).deletedCount;
        logger_1.default.info(`Deleted ${deleteCount} projections for ${entityName}`);
    });
}
function generateProjections({ id, movieId, startDate, endDate, duration, startTimes, daysOfWeek, hall, }) {
    const projections = [];
    const startDateMoment = (0, moment_1.default)(startDate).startOf("day");
    const endDateMoment = (0, moment_1.default)(endDate).startOf("day");
    const price = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
    let seats = [];
    hall.seats.forEach((seat) => {
        seats.push({
            id: seat.id,
            row: seat.row,
            seat: seat.seatNumber,
            status: 'available'
        });
    });
    for (let date = startDateMoment; date.isSameOrBefore(endDateMoment); date.add(1, "day")) {
        const dayOfWeek = date.day();
        if (daysOfWeek && daysOfWeek.includes(dayOfWeek)) {
            startTimes === null || startTimes === void 0 ? void 0 : startTimes.forEach((_startTime) => {
                const [hour, minute] = _startTime;
                const projectionDateTime = (0, moment_1.default)(date).set({ hour, minute, second: 0 });
                projections.push(new Projection_1.default({
                    _id: new mongodb_1.ObjectId(),
                    cinemaHallId: (hall === null || hall === void 0 ? void 0 : hall.id) || "",
                    cinemaId: (hall === null || hall === void 0 ? void 0 : hall.cinema.id) || "",
                    movieId: movieId || "",
                    price,
                    seats: seats,
                    scheduleId: id,
                    startTime: projectionDateTime.toDate(),
                    endTime: calculateEndTime(projectionDateTime.toDate(), duration || 0),
                }));
            });
        }
    }
    return projections;
}
function calculateEndTime(startTime, durationInMinutes) {
    return (0, moment_1.default)(startTime).add(durationInMinutes, "minutes").toDate();
}
