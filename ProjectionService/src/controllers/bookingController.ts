import { Request, Response } from 'express';
import Booking from '../models/Booking';


const bookingController = {
    getAllBookingsForProjection: async (req: Request, res: Response) => {
        try {
          const projectionId = req.params.projectionId;
          const bookings = await Booking.find({ projectionId: projectionId });
          res.json(bookings);
        } catch (err: any) {
          res.status(500).json({ message: err.message });
        }
      },
    
  
      createBookingForProjection: async (req: Request, res: Response) => {
        try {
          const projectionId = req.params.projectionId;
          const booking = req.body;
          const newBooking = new Booking({ ...booking, projectionId: projectionId });
          const savedBooking = await newBooking.save();
          res.status(201).json(savedBooking);
        } catch (err: any) {
          res.status(500).json({ message: err.message });
        }
      },
    

      getBookingByIdForProjection: async (req: Request, res: Response) => {
        try {
          const projectionId = req.params.projectionId;
          const booking = await Booking.findOne({ _id: req.params.bookingId, projectionId: projectionId });
          if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
          }
          res.json(booking);
        } catch (err: any) {
          res.status(500).json({ message: err.message });
        }
      },
    

      updateBookingForProjection: async (req: Request, res: Response) => {
        try {
          const projectionId = req.params.projectionId;
          const updatedBooking = await Booking.findOneAndUpdate({ _id: req.params.bookingId, projectionId: projectionId }, req.body, { new: true });
          if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
          }
          res.json(updatedBooking);
        } catch (err: any) {
          res.status(500).json({ message: err.message });
        }
      },
    

      deleteBookingForProjection: async (req: Request, res: Response) => {
        try {
          const projectionId = req.params.projectionId;
          const deletedBooking = await Booking.findOneAndDelete({ _id: req.params.bookingId, projectionId: projectionId });
          if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
          }
          res.json({ message: 'Booking deleted successfully' });
        } catch (err: any) {
          res.status(500).json({ message: err.message });
        }
      },
    };

export default bookingController;