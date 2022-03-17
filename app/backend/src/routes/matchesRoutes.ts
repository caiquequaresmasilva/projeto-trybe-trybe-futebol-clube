import { Router } from 'express';
import * as MatchController from '../controllers/Match';

const router = Router();

router.get('/', MatchController.getAll);

export default router;
