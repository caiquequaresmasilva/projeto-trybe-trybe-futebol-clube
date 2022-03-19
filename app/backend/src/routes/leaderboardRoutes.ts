import { Router } from 'express';
import * as MatchController from '../controllers/Match';

const router = Router();

router.get('/home', MatchController.getHomeLeaderboard);
router.get('/away', MatchController.getAwayLeaderboard);

export default router;
