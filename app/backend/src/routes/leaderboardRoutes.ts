import { Router } from 'express';
import * as MatchController from '../controllers/Match';

const router = Router();
router.get('/', MatchController.getLeaderboard);
router.get('/home', MatchController.getLeaderboard);
router.get('/away', MatchController.getLeaderboard);

export default router;
