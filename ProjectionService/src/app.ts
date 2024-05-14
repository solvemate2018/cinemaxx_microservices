// @ts-nocheck
import express from 'express';
import projectionRoutes from './routes/projectionRoutes';
import connectDB from './db';

const app = express();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.use(express.json());
    app.use('/api/projections', projectionRoutes);
  
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
  });
  

export default app;
