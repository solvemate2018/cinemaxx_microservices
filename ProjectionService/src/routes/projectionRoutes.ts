import { Router } from 'express';
import projectionController from '../controllers/projectionController';

const router = Router();

router.get('/api/projections/', projectionController.getAllProjections);
router.post('/api/projections/', projectionController.createProjection);
router.get('/api/projections/:projectionId', projectionController.getProjectionById);
router.put('/api/projections/:projectionId', projectionController.updateProjection);
router.delete('/api/projections/:projectionId', projectionController.deleteProjection);

export default router;