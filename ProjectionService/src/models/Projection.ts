import { Schema, model, Document, Types } from 'mongoose';

interface Projection extends Document {
    movieId: Number,
    cinemaHallId: Number,
    cinemaId: Number,
    scheduleId: Number,
    startTime: Date,
    endTime: Date,
    price: Number,
}

const projectionSchema = new Schema<Projection>({
    movieId: { type: Number, required: true },
    cinemaHallId: { type: Number, required: true },
    cinemaId: { type: Number, required: true },
    scheduleId: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    price: { type: Number, required: true, validate: {
        validator: (value: Number) =>  value.valueOf() > 1,
        message: 'Price must be higher then 1.',
      },
   }
});
  

export default model<Projection>('Projection', projectionSchema);