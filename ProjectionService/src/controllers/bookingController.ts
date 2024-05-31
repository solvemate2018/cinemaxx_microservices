import { Request, Response } from 'express';
import Booking from '../models/Booking';


const bookingController = {
  //Used by admin
    getAllBookingsForProjection: async (req: Request, res: Response) => {
        try {
          const projectionId = req.params.projectionId;
          const bookings = await Booking.find({ projectionId: projectionId });
          res.json(bookings);
        } catch (err: any) {
          res.status(500).json({ message: err.message });
        }
      },
    
  //Used by user to make reservations
  //Needs to validate UserID or get it from context
  //Needs to validate Seats
      createBookingForProjection: async (req: Request, res: Response) => {
        try {
          const projectionId = req.params.projectionId;
          const booking = req.body;
          const userId = req.user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
          const newBooking = new Booking({ ...booking, projectionId: projectionId, userId: userId});
          const savedBooking = await newBooking.save();
          res.status(201).json(savedBooking);
        } catch (err: any) {
          res.status(500).json({ message: err.message });
        }
      },
    
    //Used by user 
    getBookingById: async (req: Request, res: Response) => {
        try {
          const booking = await Booking.findOne({ _id: req.params.bookingId });
          const userId = req.user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
          }

          if(userId && booking.userId !== parseInt(userId)){
            return res.status(403).json({ message: `Can't get booking that is not yours!` });
          }
          
          res.json(booking);
        } catch (err: any) {
          res.status(500).json({ message: err.message });
        }
      },
    
      //Used by user
      //Don't have to validate anything
      deleteBookingById: async (req: Request, res: Response) => {
        try {
          const userId = req.user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          const booking = await Booking.findOne({_id: req.params.bookingId });
          if(booking && userId && booking.userId === parseInt(userId)){
            await Booking.findOneAndDelete({ _id: req.params.bookingId });
            res.json({ message: 'Booking deleted successfully' });
          }
          else if(booking && userId){
            res.status(403).json({ message: "You can't delete booking that is not yours." });
          }
          else{
            res.status(404).json({ message: "Booking not found." });
          }

        } catch (err: any) {
          res.status(500).json({ message: err.message });
        }
      },
    };

export default bookingController;