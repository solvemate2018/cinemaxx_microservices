import { Schema, model, Document, Types } from 'mongoose';
import Seat from './Seat';

interface Booking extends Document {
    userId: Number,
    projectionId: Number,
    totalPrice: Number,
    status: String,
    seats: Seat[]
}

const bookingSchema = new Schema<Booking>({
    userId: { type: Number, required: true },
    projectionId: { type: Schema.Types.ObjectId, ref: 'Projection' },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, enum: ['requested', 'active', 'past']  },
    seats: {type: [], required: true}
});

  

export default model<Booking>('Booking', bookingSchema);