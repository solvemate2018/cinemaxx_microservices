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
    createProjection: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const newProjection = new Projection_1.default(req.body);
            const savedProjection = yield newProjection.save();
            res.status(201).json(savedProjection);
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
    updateProjection: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedProjection = yield Projection_1.default.findByIdAndUpdate(req.params.projectionId, req.body, { new: true });
            if (!updatedProjection) {
                return res.status(404).json({ message: 'Projection not found' });
            }
            res.json(updatedProjection);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }),
    deleteProjection: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletedProjection = yield Projection_1.default.findByIdAndDelete(req.params.projectionId);
            if (!deletedProjection) {
                return res.status(404).json({ message: 'Projection not found' });
            }
            res.json({ message: 'Projection deleted successfully' });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }),
};
exports.default = projectionController;
