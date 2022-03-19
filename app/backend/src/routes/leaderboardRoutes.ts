import { Router } from 'express';
import * as MatchController from '../controllers/Match';

const router = Router();

router.get('/home', MatchController.getHomeLeaderboard);

export default router;
