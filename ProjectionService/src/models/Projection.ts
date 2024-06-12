import { Schema, model, Document, Types } from 'mongoose';
import Seat from './Seat';

interface Projection extends Document {
    movieId: number,
    cinemaHallId: number,
    cinemaId: number,
    scheduleId: number,
    startTime: Date,
    endTime: Date,
    price: number,
    seats: Seat[]
}

const projectionSchema = new Schema<Projection>({
    movieId: { type: Number, required: true },
    cinemaHallId: { type: Number, required: true },
    cinemaId: { type: Number, required: true },
    scheduleId: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    seats: { type: [], required: true },
    price: { type: Number, required: true, validate: {
        validator: (value: Number) =>  value.valueOf() > 1,
        message: 'Price must be higher then 1.',
      },
   }
});
  

export default model<Projection>('Projection', projectionSchema);