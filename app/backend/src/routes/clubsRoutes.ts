import { Router } from 'express';
import * as ClubController from '../controllers/Club';

const router = Router();

router.get('/', ClubController.getAll);
router.get('/:id', ClubController.getById);

export default router;
