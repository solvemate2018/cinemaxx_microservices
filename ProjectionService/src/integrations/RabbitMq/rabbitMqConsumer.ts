import * as amqp from "amqplib";
import { connect } from "./rabbitMqFactory";
import { consumeCinemaDeleted, consumeCinemaHallDeleted, consumeCinemaHallScheduleCreated, consumeCinemaHallScheduleDeleted, consumeCinemaHallScheduleUpdated, consumeMovieDeleted, consumeMovieDurationUpdated } from "./utils/rabbitMqConsumerHelper";

async function consumeMessage(
  channel: amqp.Channel,
  queueName: string,
  callback: (msg: amqp.Message | null) => void
): Promise<void> {
  await channel.prefetch(1);
  await channel.consume(queueName, callback, { noAck: true });
}

export async function consumeRabbitMqMessages(): Promise<void> {
  const channel = await connect();

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

  console.log("Waiting for messages...");
}

