import { Schema, model, Document, Types } from 'mongoose';

interface Projection extends Document {
    id: Types.ObjectId,
    movieId: Number,
    cinemaHallId: Number,
    startTime: Date,
    endTime: Date,
    price: Number,
}

const projectionSchema = new Schema<Projection>({
    id: { type: Schema.Types.ObjectId, required: true },
    movieId: { type: Number, required: true },
    cinemaHallId: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    price: { type: Number, required: true, validate: {
        validator: (value: Number) => value > 1,
        message: 'Price must be higher then 1.',
      },
   }
});
  

export default model<Projection>('Projection', projectionSchema);