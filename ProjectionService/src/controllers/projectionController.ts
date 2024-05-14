import { Request, Response } from 'express';
import Projection from '../models/projection';

const projectionController = {
  getAllProjections: async (req: Request, res: Response) => {
    try {
      const projections = await Projection.find();
      res.json(projections);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  
  createProjection: async (req: Request, res: Response) => {
    try {
      const projections = await Projection.find();
      res.json(projections);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  getProjectionById: async (req: Request, res: Response) => {
    try {
      const projections = await Projection.find();
      res.json(projections);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  updateProjection: async (req: Request, res: Response) => {
    try {
      const projections = await Projection.find();
      res.json(projections);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteProjection: async (req: Request, res: Response) => {
    try {
      const projections = await Projection.find();
      res.json(projections);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default projectionController;