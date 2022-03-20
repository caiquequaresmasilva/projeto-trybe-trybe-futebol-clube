import { Router } from 'express';
import { matchControllerFactory } from '../factories';

const router = Router();
const matchController = matchControllerFactory();

router.get('/', (req, res) => matchController.getLeaderboard(req, res));
router.get('/home', (req, res) => matchController.getLeaderboard(req, res));
router.get('/away', (req, res) => matchController.getLeaderboard(req, res));

export default router;
