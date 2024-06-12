import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Projection from '../models/Projection';


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
          const requestedSeatIds = req.body.map((seat: any) => seat.id);
          const userId = req.user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
          const projection = await Projection.findById(projectionId);
          if(projection){
            const totalPrice = projection.price * requestedSeatIds.length;
            const seats = projection.seats.filter(seat => requestedSeatIds.includes(seat.id))
            if(seats.length == requestedSeatIds.length){
              projection.seats = projection.seats.map(seat => {
                if(requestedSeatIds.includes(seat.id)){
                  seat.status = 'Booked';
                  return seat
                }
                return seat;
              })
  
              await Projection.findOneAndUpdate({ _id: projection._id }, { seats: projection.seats });
              const newBooking = new Booking({ seats: seats, status: 'active', totalPrice: totalPrice, projectionId: projectionId, userId: userId});
              const savedBooking = await newBooking.save();
              res.status(201).json(savedBooking);
            }
            else{
              res.status(404).send('Some of the seats do not exist for this projection');
            }

          }
          else{
            res.status(404).send('Projection not found');
          }
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