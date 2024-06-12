import * as bunyan from "bunyan";
import * as seq from "bunyan-seq";

const containerName =
  process.env.Name || process.env.HOST || "projection-service";

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

export default logger;
