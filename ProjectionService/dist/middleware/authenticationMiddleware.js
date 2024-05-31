"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_secret = process.env.JWT_SECRET_KEY;
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, jwt_secret ? jwt_secret : 'some_default_value_that_can_be_used_when_nothing_is_seted', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            console.log("User authenticated successfully!");
            next();
        });
    }
    else {
        console.log("User authentication failed!");
        res.sendStatus(401);
    }
};
exports.authenticateJWT = authenticateJWT;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.sendStatus(403);
        }
        const hasRole = roles.some(role => { var _a; return role === ((_a = req.user) === null || _a === void 0 ? void 0 : _a['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']); });
        if (!hasRole) {
            console.log("User attempting to access endpoint without access!");
            return res.sendStatus(403);
        }
        next();
    };
};
exports.authorize = authorize;
