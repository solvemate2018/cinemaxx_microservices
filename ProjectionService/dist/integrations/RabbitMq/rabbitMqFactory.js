"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.connect = void 0;
const amqp = __importStar(require("amqplib"));
const url = process.env.RABBITMQ_CONNECTION_STRING || 'amqp://guest:guest@localhost:5672/';
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield amqp.connect(url);
        const channel = yield connection.createChannel();
        declareQueues(channel);
        return channel;
    });
}
exports.connect = connect;
function declareQueues(channel) {
    return __awaiter(this, void 0, void 0, function* () {
        channel.assertExchange("cinema.exchange", "topic", { durable: true });
        channel.assertQueue("cinema.deleted");
        channel.assertQueue("cinema.hall.deleted");
        channel.assertQueue("cinema.hall.schedule.deleted");
        channel.assertQueue("cinema.hall.schedule.created");
        channel.assertQueue("cinema.hall.schedule.updated");
        channel.assertQueue("cinema.movie.deleted.updateProjections");
        channel.assertQueue("cinema.movie.updateDuration");
        channel.bindQueue("cinema.deleted", "cinema.exchange", "cinema.deleted");
        channel.bindQueue("cinema.hall.deleted", "cinema.exchange", "cinema.hall.deleted");
        channel.bindQueue("cinema.hall.schedule.deleted", "cinema.exchange", "cinema.hall.schedule.deleted");
        channel.bindQueue("cinema.hall.schedule.created", "cinema.exchange", "cinema.hall.schedule.created");
        channel.bindQueue("cinema.hall.schedule.updated", "cinema.exchange", "cinema.hall.schedule.updated");
        channel.bindQueue("cinema.movie.deleted.updateProjections", "cinema.exchange", "cinema.movie.deleted");
        channel.bindQueue("cinema.movie.updateDuration", "cinema.exchange", "cinema.movie.updateDuration");
    });
}
