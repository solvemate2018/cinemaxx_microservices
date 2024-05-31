import { Router } from 'express';
import projectionController from '../controllers/projectionController';

const router = Router();

router.get('/projections/', projectionController.getAllProjections);
router.get('/projections/:projectionId', projectionController.getProjectionById);

export default router;