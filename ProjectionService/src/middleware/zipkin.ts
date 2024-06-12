import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { ConsoleSpanExporter } from '@opentelemetry/tracing';

const containerName =
  process.env.HOSTNAME || process.env.HOST || "projection-service";

const zipkin_url = process.env.ZIPKIN_URL;

const sdk = new NodeSDK({
    traceExporter: new ZipkinExporter({serviceName: containerName, url: zipkin_url }),
    instrumentations: [getNodeAutoInstrumentations()],
  });

export default sdk;
