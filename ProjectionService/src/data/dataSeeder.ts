import Projection from '../models/Projection';
import Booking from '../models/Booking';
import logger from '../logging/logger';

const seedData = async () => {
    await Booking.deleteMany({});
    await Projection.deleteMany({});

const now = new Date();

const addHours = (date: Date, hours: number) => {
  const newDate = new Date(date);
  newDate.setHours(date.getHours() + hours);
  return newDate;
};

// Seed Projection data
const projections = [
  { movieId: 1, cinemaHallId: 1, cinemaId: 1, scheduleId: 1, startTime: addHours(now, 2), endTime: addHours(now, 4), price: 12.50 },
  { movieId: 2, cinemaHallId: 2, cinemaId: 1, scheduleId: 2, startTime: addHours(now, 5), endTime: addHours(now, 7.5), price: 15.00 },
  { movieId: 3, cinemaHallId: 3, cinemaId: 2, scheduleId: 3, startTime: addHours(now, 8), endTime: addHours(now, 10.25), price: 10.00 },
  { movieId: 4, cinemaHallId: 1, cinemaId: 1, scheduleId: 4, startTime: addHours(now, 10), endTime: addHours(now, 12), price: 8.00 },
  { movieId: 5, cinemaHallId: 2, cinemaId: 1, scheduleId: 5, startTime: addHours(now, 13), endTime: addHours(now, 15.5), price: 11.50 }
];

    const projectionDocs = await Projection.insertMany(projections);
    logger.info('Projection data seeded successfully!');

    // Seed Booking data
    const bookings = [
      { userId: 1, projectionId: projectionDocs[0]._id, totalPrice: 25.00, status: 'active', seats: [5, 6, 7] },
      { userId: 2, projectionId: projectionDocs[1]._id, totalPrice: 30.00, status: 'active', seats: [10, 11, 12] },
      { userId: 3, projectionId: projectionDocs[2]._id, totalPrice: 15.00, status: 'active', seats: [1, 2, 3] },
      { userId: 4, projectionId: projectionDocs[3]._id, totalPrice: 20.00, status: 'active', seats: [20, 21] },
      { userId: 5, projectionId: projectionDocs[4]._id, totalPrice: 45.00, status: 'active', seats: [25, 26, 27, 28] }
    ];

    await Booking.insertMany(bookings);
    logger.info('Booking data seeded successfully!');
}

export default seedData;