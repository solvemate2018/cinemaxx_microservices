import { Schema, model, Document, Types } from 'mongoose';

interface Ticket extends Document {
    id: Types.ObjectId,
    bookingId: Types.ObjectId,
    seatId: Number,
    price: number,
}

const ticketSchema = new Schema<Ticket>({
    id: { type: Schema.Types.ObjectId, required: true },
    bookingId: { type: Schema.Types.ObjectId, required: true },
    seatId: { type: Number, required: true },
    price: { type: Number, required: true }, 
});

  

export default model<Ticket>('Ticket', ticketSchema);