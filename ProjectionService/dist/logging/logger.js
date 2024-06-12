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
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = __importStar(require("bunyan"));
const seq = __importStar(require("bunyan-seq"));
const containerName = process.env.Name || process.env.HOST || "projection-service";
const seq_url = process.env.SEQ_URL;
const logger = bunyan.createLogger({
    name: containerName,
    streams: seq_url
        ? [
            {
                level: "info",
                stream: process.stdout,
            },
            seq.createStream({
                serverUrl: seq_url,
                level: "info",
            }),
        ]
        : [
            {
                level: "info",
                stream: process.stdout,
            },
        ],
});
exports.default = logger;
