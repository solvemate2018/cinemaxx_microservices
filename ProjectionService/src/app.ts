import express from 'express';
import projectionRoutes from './routes/projectionRoutes';
import bookingRoutes from './routes/bookingRoutes';
import connectDB from './db';
import helmet from 'helmet';
import seedData from './data/dataSeeder';

const app = express();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    seedData();
    app.use(express.json());
    app.use(helmet());
    app.use('/', projectionRoutes);
    app.use('/', bookingRoutes);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
  });
  

export default app;
