"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectionController_1 = __importDefault(require("../controllers/projectionController"));
const router = (0, express_1.Router)();
router.get('/api/projections/', projectionController_1.default.getAllProjections);
router.post('/api/projections/', projectionController_1.default.createProjection);
router.get('/api/projections/:projectionId', projectionController_1.default.getProjectionById);
router.put('/api/projections/:projectionId', projectionController_1.default.updateProjection);
router.delete('/api/projections/:projectionId', projectionController_1.default.deleteProjection);
exports.default = router;
