import projectionController from "../../../controllers/projectionController";
import Projection from "../../../models/Projection";
import moment from "moment";
import * as amqp from "amqplib";
import { ObjectId } from "mongodb";
import Seat from "../../../models/Seat";
import logger from "../../../logging/logger";

//Delete all the projections in that cinema
//CinemaId
export async function consumeCinemaDeleted(msg: amqp.Message | null): Promise<void> {
    logReceivedMessage("DELETED CINEMA", msg);
    const jsonObject = parseMessageContent(msg);
    if (jsonObject) {
      await deleteProjectionsByField("cinemaId", jsonObject.id, `cinema ${jsonObject.name}`);
    }
  }

//Delete all the projections in that cinema hall
//CinemaHallId
export async function consumeCinemaHallDeleted(msg: amqp.Message | null): Promise<void> {
    logReceivedMessage("DELETED CINEMA_HALL", msg);
    const jsonObject = parseMessageContent(msg);
    if (jsonObject) {
      await deleteProjectionsByField("cinemaHallId", jsonObject.id, `cinema hall ${jsonObject.name}`);
    }
  }

//Delete all the projections from that schedule
//ScheduleId
export async function consumeCinemaHallScheduleDeleted(msg: amqp.Message | null): Promise<void> {
    logReceivedMessage("DELETED CINEMA_HALL_SCHEDULE", msg);
    const jsonObject = parseMessageContent(msg);
    if (jsonObject) {
      await deleteProjectionsByField("scheduleId", jsonObject.id, `schedule ${jsonObject.name}`);
    }
  }

//Create projections based on the schedule
//The whole schedule
export async function consumeCinemaHallScheduleCreated(msg: amqp.Message | null): Promise<void> {
    logReceivedMessage("CREATED CINEMA_HALL_SCHEDULE", msg);
    const jsonObject = parseMessageContent(msg);
    if (jsonObject) {
      const projections = generateProjections(jsonObject);
      try {
        const generatedProjections = await Projection.insertMany(projections);
        logger.info(`Created ${generatedProjections.length} projections for schedule ${jsonObject.id}`);
      } catch (error) {
        logger.error("Error creating projections:", error);
      }
    }
  }
  

//Update all the projections based on the updated schedule
//Can't update them because the amount of the projections might have changed so we have to delete all of them and create new ones ;}
//The whole schedule
export async function consumeCinemaHallScheduleUpdated(msg: amqp.Message | null): Promise<void> {
    logReceivedMessage("UPDATED CINEMA_HALL_SCHEDULE", msg);
    const jsonObject = parseMessageContent(msg);
    if (jsonObject) {
      try {
        await deleteProjectionsByField("scheduleId", jsonObject.id, `schedule ${jsonObject.name}`);
        const projections = generateProjections(jsonObject);
        const generatedProjections = await Projection.insertMany(projections);
        logger.info(`Created ${generatedProjections.length} projections for schedule ${jsonObject.id}`);
      } catch (error) {
        logger.error("Error updating projections:", error);
      }
    }
  }
  

//Delete all projections with that movie
//movieId:
export async function consumeMovieDeleted(msg: amqp.Message | null): Promise<void> {
    logReceivedMessage("DELETED MOVIE", msg);
    const jsonObject = parseMessageContent(msg);
    if (jsonObject) {
      await deleteProjectionsByField("movieId", jsonObject.Id, `movie ${jsonObject.Title}`);
    }
  }
  

//Update all projections based on the new duration
//movieId: newDuration:
export async function consumeMovieDurationUpdated(msg: amqp.Message | null): Promise<void> {
    logReceivedMessage("UPDATED MOVIE_DURATION", msg);
    const jsonObject = parseMessageContent(msg);
    if (jsonObject) {
      const { Id, Duration } = jsonObject;
      try {
        const updatedCount = await Projection.updateMany(
          { movieId: Id },
          { $set: { endTime: { $add: ["$startTime", Duration * 60000] } } }
        );
        logger.info(`Updated endTime for ${updatedCount.modifiedCount} projections with movie id: ${Id}`);
      } catch (error) {
        logger.error("Error updating projection endTime:", error);
      }
    }
  }
  

// Utility function to log received messages
function logReceivedMessage(action: string, msg: any) {
    logger.info(`Received message for ${action}: ${msg?.content.toString()}`);
  }
  
  // Utility function to parse message content
  function parseMessageContent(msg: any) {
    return msg?.content ? JSON.parse(msg.content.toString()) : null;
  }

  async function deleteProjectionsByField(field: string, value: string, entityName: string): Promise<void> {
    const deleteCount = (await Projection.deleteMany({ [field]: value })).deletedCount;
    logger.info(`Deleted ${deleteCount} projections for ${entityName}`);
  }

  function generateProjections({
    id,
    movieId,
    startDate,
    endDate,
    duration,
    startTimes,
    daysOfWeek,
    hall,
  }: any): any[] {
    const projections: any[] = [];
    const startDateMoment = moment(startDate).startOf("day");
    const endDateMoment = moment(endDate).startOf("day");
    const price = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
    let seats: Seat[] = [];

    hall.seats.forEach((seat: any) => {
      seats.push({
        id: seat.id,
        row: seat.row,
        seat: seat.seatNumber,
        status: 'available'
      })
    });

    for (let date = startDateMoment; date.isSameOrBefore(endDateMoment); date.add(1, "day")) {
      const dayOfWeek = date.day();
      if (daysOfWeek && daysOfWeek.includes(dayOfWeek)) {
        startTimes?.forEach((_startTime: [any, any]) => {
            const [hour, minute] = _startTime;
          const projectionDateTime = moment(date).set({ hour, minute, second: 0 });
          projections.push(new Projection({
            _id: new ObjectId(),
            cinemaHallId: hall?.id || "",
            cinemaId: hall?.cinema.id || "",
            movieId: movieId || "",
            price,
            seats: seats,
            scheduleId: id,
            startTime: projectionDateTime.toDate(),
            endTime: calculateEndTime(projectionDateTime.toDate(), duration || 0),
          }));
        });
      }
    }
    return projections;
  }
  
  function calculateEndTime(startTime: Date, durationInMinutes: number): Date {
    return moment(startTime).add(durationInMinutes, "minutes").toDate();
  }
