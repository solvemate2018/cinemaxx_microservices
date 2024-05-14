import { Router } from 'express';
import projectionController from '../controllers/projectionController';

const router = Router();

router.get('/', projectionController.getAllProjections);
router.post('/', projectionController.createProjection);
router.get('/:id', projectionController.getProjectionById);
router.put('/:id', projectionController.updateProjection);
router.delete('/:id', projectionController.deleteProjection);

export default router;