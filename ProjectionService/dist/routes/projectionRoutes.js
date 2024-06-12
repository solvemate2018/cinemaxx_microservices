"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectionController_1 = __importDefault(require("../controllers/projectionController"));
const router = (0, express_1.Router)();
router.get('/projections/', projectionController_1.default.getAllProjections);
router.get('/projections/:projectionId', projectionController_1.default.getProjectionById);
router.get('/cinemas/:cinemaId/projections', projectionController_1.default.getProjectionsByCinemaIdAndDateSortedByMovieId);
exports.default = router;
