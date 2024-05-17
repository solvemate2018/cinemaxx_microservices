"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectionRoutes_1 = __importDefault(require("./routes/projectionRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const db_1 = __importDefault(require("./db"));
const helmet_1 = __importDefault(require("helmet"));
const dataSeeder_1 = __importDefault(require("./data/dataSeeder"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, db_1.default)().then(() => {
    (0, dataSeeder_1.default)();
    app.use(express_1.default.json());
    app.use((0, helmet_1.default)());
    app.use('/', projectionRoutes_1.default);
    app.use('/', bookingRoutes_1.default);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
exports.default = app;
