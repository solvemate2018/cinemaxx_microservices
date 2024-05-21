import * as amqp from 'amqplib';

const url = process.env.RABBITMQ_CONNECTION_STRING || 'amqp://guest:guest@localhost:5672/';

export async function connect(): Promise<amqp.Channel> {
  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();
  declareQueues(channel)
  return channel;
}


async function declareQueues(channel: amqp.Channel): Promise<void> {
    channel.assertExchange("cinema.exchange", "topic", {durable: true});
    
    channel.assertQueue("cinema.deleted");
    channel.assertQueue("cinema.hall.deleted");
    channel.assertQueue("cinema.hall.schedule.deleted");
    channel.assertQueue("cinema.hall.schedule.created");
    channel.assertQueue("cinema.hall.schedule.updated");
    channel.assertQueue("cinema.movie.deleted.updateProjections");
    channel.assertQueue("cinema.movie.updateDuration");

    channel.bindQueue("cinema.deleted", "cinema.exchange", "cinema.deleted");
    channel.bindQueue("cinema.hall.deleted", "cinema.exchange", "cinema.hall.deleted");
    channel.bindQueue("cinema.hall.schedule.deleted", "cinema.exchange", "cinema.hall.schedule.deleted");
    channel.bindQueue("cinema.hall.schedule.created", "cinema.exchange", "cinema.hall.schedule.created");
    channel.bindQueue("cinema.hall.schedule.updated", "cinema.exchange", "cinema.hall.schedule.updated");
    channel.bindQueue("cinema.movie.deleted.updateProjections", "cinema.exchange", "cinema.movie.deleted");
    channel.bindQueue("cinema.movie.updateDuration", "cinema.exchange", "cinema.movie.updateDuration");
}