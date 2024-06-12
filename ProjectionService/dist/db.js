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
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logging/logger"));
const connectionString = process.env.MONGO_DB_CONNECTION_STRING;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let mongoURI = connectionString;
        if (!mongoURI) {
            const mongod = yield mongodb_memory_server_1.MongoMemoryServer.create();
            mongoURI = mongod.getUri();
        }
        logger_1.default.info(mongoURI);
        yield mongoose_1.default.connect(mongoURI);
        logger_1.default.info('MongoDB connected successfully');
    }
    catch (error) {
        logger_1.default.error('MongoDB connection error:', error);
        process.exit(1);
    }
});
exports.default = connectDB;
