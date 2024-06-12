import express from 'express';
import projectionRoutes from './routes/projectionRoutes';
import bookingRoutes from './routes/bookingRoutes';
import connectDB from './db';
import helmet from 'helmet';
import seedData from './data/dataSeeder';
import { consumeRabbitMqMessages } from './integrations/RabbitMq/rabbitMqConsumer';
import logger from './logging/logger';
import sdk from './middleware/zipkin';

const app = express();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    seedData();
    consumeRabbitMqMessages();
    process.env.ZIPKIN_URL && sdk.start();
    app.use(express.json());
    app.use(helmet());
    app.use('/', projectionRoutes);
    app.use('/', bookingRoutes);
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
      });
  });
  

export default app;
