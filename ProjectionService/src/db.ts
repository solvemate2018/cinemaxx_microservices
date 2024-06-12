import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import logger from './logging/logger';

const connectionString = process.env.MONGO_DB_CONNECTION_STRING;
const connectDB = async () => {
  try {
    let mongoURI = connectionString;
    
    if (!mongoURI) {
      const mongod = await MongoMemoryServer.create();
      mongoURI = mongod.getUri();
    }
    logger.info(mongoURI);
    await mongoose.connect(mongoURI);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
