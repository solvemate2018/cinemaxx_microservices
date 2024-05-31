import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const connectionString = process.env.MONGO_DB_CONNECTION_STRING;
const connectDB = async () => {
  try {
    let mongoURI = connectionString;
    
    if (!mongoURI) {
      const mongod = await MongoMemoryServer.create();
      mongoURI = mongod.getUri();
    }
    console.log(mongoURI);
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
