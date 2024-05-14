import { Schema, model, Document, Types } from 'mongoose';

interface Booking extends Document {
    id: Types.ObjectId,
    userId: Number,
    projectionId: Number,
    tickets: Array<Schema.Types.ObjectId>,
    totalPrice: Number,
    status: String,
}

const bookingSchema = new Schema<Booking>({
    id: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Number, required: true },
    projectionId: { type: Number, required: true },
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }], 
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, enum: ['requested', 'active', 'past']  }
});

  

export default model<Booking>('Booking', bookingSchema);