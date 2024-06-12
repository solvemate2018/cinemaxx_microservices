import { Router } from 'express';
import projectionController from '../controllers/projectionController';

const router = Router();

router.get('/projections/', projectionController.getAllProjections);
router.get('/projections/:projectionId', projectionController.getProjectionById);
router.get('/cinemas/:cinemaId/projections', projectionController.getProjectionsByCinemaIdAndDateSortedByMovieId);

export default router;