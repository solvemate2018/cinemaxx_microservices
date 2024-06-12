import * as amqp from "amqplib";
import { connect } from "./rabbitMqFactory";
import { consumeCinemaDeleted, consumeCinemaHallDeleted, consumeCinemaHallScheduleCreated, consumeCinemaHallScheduleDeleted, consumeCinemaHallScheduleUpdated, consumeMovieDeleted, consumeMovieDurationUpdated } from "./utils/rabbitMqConsumerHelper";
import logger from "../../logging/logger";

async function consumeMessage(
  channel: amqp.Channel,
  queueName: string,
  callback: (msg: amqp.Message | null) => void
): Promise<void> {
  await channel.prefetch(1);
  await channel.consume(queueName, callback, { noAck: true });
}

async function connectWithRetry(maxRetries: number, delayMs: number) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const channel = await connect();
      logger.info("Connection successful!");
      return channel;
    } catch (error: any) {
      attempt++;
      logger.warn(`Connection failed on attempt ${attempt}: ${error.message}`);
      if (attempt < maxRetries) {
        logger.info(`Retrying in ${delayMs / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      } else {
        logger.error("All attempts to connect have failed.");
        throw error;
      }
    }
  }
}

export async function consumeRabbitMqMessages(): Promise<void> {
  connectWithRetry(5, 2000)
      .then(async channel => {
        if(channel){
        await consumeMessage(channel, "cinema.deleted", consumeCinemaDeleted);
        await consumeMessage(
            channel,
            "cinema.hall.deleted",
            consumeCinemaHallDeleted
        );
        await consumeMessage(
            channel,
            "cinema.hall.schedule.deleted",
            consumeCinemaHallScheduleDeleted
        );
        await consumeMessage(
            channel,
            "cinema.hall.schedule.created",
            consumeCinemaHallScheduleCreated
        );
        await consumeMessage(
            channel,
            "cinema.hall.schedule.updated",
            consumeCinemaHallScheduleUpdated
        );
        await consumeMessage(channel, "cinema.movie.deleted.updateProjections", consumeMovieDeleted);
        await consumeMessage(
            channel,
            "cinema.movie.updateDuration",
            consumeMovieDurationUpdated
        );
      }})
      .catch(error => {
        logger.error("Failed to establish connection:", error);
      });
}

