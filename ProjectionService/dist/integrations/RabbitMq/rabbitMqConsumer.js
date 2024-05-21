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
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeRabbitMqMessages = void 0;
const rabbitMqFactory_1 = require("./rabbitMqFactory");
const rabbitMqConsumerHelper_1 = require("./utils/rabbitMqConsumerHelper");
function consumeMessage(channel, queueName, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield channel.prefetch(1);
        yield channel.consume(queueName, callback, { noAck: true });
    });
}
function consumeRabbitMqMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        const channel = yield (0, rabbitMqFactory_1.connect)();
        yield consumeMessage(channel, "cinema.deleted", rabbitMqConsumerHelper_1.consumeCinemaDeleted);
        yield consumeMessage(channel, "cinema.hall.deleted", rabbitMqConsumerHelper_1.consumeCinemaHallDeleted);
        yield consumeMessage(channel, "cinema.hall.schedule.deleted", rabbitMqConsumerHelper_1.consumeCinemaHallScheduleDeleted);
        yield consumeMessage(channel, "cinema.hall.schedule.created", rabbitMqConsumerHelper_1.consumeCinemaHallScheduleCreated);
        yield consumeMessage(channel, "cinema.hall.schedule.updated", rabbitMqConsumerHelper_1.consumeCinemaHallScheduleUpdated);
        yield consumeMessage(channel, "cinema.movie.deleted.updateProjections", rabbitMqConsumerHelper_1.consumeMovieDeleted);
        yield consumeMessage(channel, "cinema.movie.updateDuration", rabbitMqConsumerHelper_1.consumeMovieDurationUpdated);
        console.log("Waiting for messages...");
    });
}
exports.consumeRabbitMqMessages = consumeRabbitMqMessages;
