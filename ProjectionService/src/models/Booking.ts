import { Schema, model, Document, Types } from 'mongoose';

interface Booking extends Document {
    userId: Number,
    projectionId: Number,
    totalPrice: Number,
    status: String,
    seats: Number[]
}

const bookingSchema = new Schema<Booking>({
    userId: { type: Number, required: true },
    projectionId: { type: Schema.Types.ObjectId, ref: 'Projection' },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, enum: ['requested', 'active', 'past']  },
    seats: {type: [], required: true}
});

  

export default model<Booking>('Booking', bookingSchema);