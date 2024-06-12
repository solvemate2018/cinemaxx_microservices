"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_node_1 = require("@opentelemetry/sdk-node");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const exporter_zipkin_1 = require("@opentelemetry/exporter-zipkin");
const containerName = process.env.HOSTNAME || process.env.HOST || "projection-service";
const zipkin_url = process.env.ZIPKIN_URL;
const sdk = new sdk_node_1.NodeSDK({
    traceExporter: new exporter_zipkin_1.ZipkinExporter({ serviceName: containerName, url: zipkin_url }),
    instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()],
});
exports.default = sdk;
