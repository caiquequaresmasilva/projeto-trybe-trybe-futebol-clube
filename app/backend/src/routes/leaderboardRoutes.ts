import { Router } from 'express';
import { leaderboardControllerFactory } from '../factories';

const LeaderboardRoutes = Router();
const lbController = leaderboardControllerFactory();

LeaderboardRoutes.get('/', (req, res) => lbController.getLeaderboard(req, res));
LeaderboardRoutes.get('/home', (req, res) => lbController.getLeaderboard(req, res));
LeaderboardRoutes.get('/away', (req, res) => lbController.getLeaderboard(req, res));

export default LeaderboardRoutes;
