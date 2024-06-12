import { Request, Response } from 'express';
import Projection from '../models/Projection';
import logger from '../logging/logger';

const projectionController = {
  getAllProjections: async (req: Request, res: Response) => {
    try {
      const projections = await Projection.find();
      res.json(projections);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  getProjectionById: async (req: Request, res: Response) => {
    try {
      const projection = await Projection.findById(req.params.projectionId);
      if (!projection) {
        return res.status(404).json({ message: 'Projection not found' });
      }
      res.json(projection);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  
  getProjectionsByCinemaIdAndDateSortedByMovieId: async (req: Request, res: Response) => {
    try {
      const { date } = req.query;
      const parsedDate = new Date(date as string);
      const startOfDay = new Date(parsedDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(parsedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const projections = await (await Projection.find({ cinemaId: req.params.cinemaId, 
        startTime: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    })).sort(p => p.movieId);
      if (!projections) {
        return res.status(404).json({ message: 'Projections not found' });
      }
      res.json(projections);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  } 
};

export default projectionController;