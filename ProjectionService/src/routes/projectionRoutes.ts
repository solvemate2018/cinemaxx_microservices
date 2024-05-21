import { Router } from 'express';
import projectionController from '../controllers/projectionController';

const router = Router();

router.get('/api/projections/', projectionController.getAllProjections);
router.get('/api/projections/:projectionId', projectionController.getProjectionById);

export default router;