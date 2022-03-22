import { Router } from 'express';
import { leaderboardControllerFactory } from '../factories';

const router = Router();
const lbController = leaderboardControllerFactory();

router.get('/', (req, res) => lbController.getLeaderboard(req, res));
router.get('/home', (req, res) => lbController.getLeaderboard(req, res));
router.get('/away', (req, res) => lbController.getLeaderboard(req, res));

export default router;
