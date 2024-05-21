import { Request, Response } from 'express';
import Projection from '../models/Projection';

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
};

export default projectionController;