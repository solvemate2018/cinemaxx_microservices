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
  
  createProjection: async (req: Request, res: Response) => {
    try {
      console.log(req.body)
      const newProjection = new Projection(req.body);
      const savedProjection = await newProjection.save();
      res.status(201).json(savedProjection);
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

  updateProjection: async (req: Request, res: Response) => {
    try {
      const updatedProjection = await Projection.findByIdAndUpdate(req.params.projectionId, req.body, { new: true });
      if (!updatedProjection) {
        return res.status(404).json({ message: 'Projection not found' });
      }
      res.json(updatedProjection);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteProjection: async (req: Request, res: Response) => {
    try {
      const deletedProjection = await Projection.findByIdAndDelete(req.params.projectionId);
      if (!deletedProjection) {
        return res.status(404).json({ message: 'Projection not found' });
      }
      res.json({ message: 'Projection deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default projectionController;