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
const logger_1 = __importDefault(require("../logging/logger"));
const projectionController = {
    getAllProjections: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const projections = yield Projection_1.default.find();
            res.json(projections);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }),
    getProjectionById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const projection = yield Projection_1.default.findById(req.params.projectionId);
            if (!projection) {
                return res.status(404).json({ message: 'Projection not found' });
            }
            res.json(projection);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }),
    getProjectionsByCinemaIdAndDateSortedByMovieId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { date } = req.query;
            const parsedDate = new Date(date);
            const startOfDay = new Date(parsedDate);
            startOfDay.setHours(0, 0, 0, 0);
            logger_1.default.info(parsedDate);
            logger_1.default.info(req.params.cinemaId);
            const endOfDay = new Date(parsedDate);
            endOfDay.setHours(23, 59, 59, 999);
            const projections = yield (yield Projection_1.default.find({ cinemaId: req.params.cinemaId,
                startTime: {
                    $gte: startOfDay,
                    $lt: endOfDay,
                },
            })).sort(p => p.movieId);
            if (!projections) {
                return res.status(404).json({ message: 'Projections not found' });
            }
            res.json(projections);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    })
};
exports.default = projectionController;
