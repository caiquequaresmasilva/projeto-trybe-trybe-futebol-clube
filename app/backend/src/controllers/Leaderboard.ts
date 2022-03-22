import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  constructor(
    private lbService: LeaderboardService,
  ) {}

  async getLeaderboard(req:Request, res:Response) {
    const path = req.url.replace('/', '');
    const leaderboard = await this.lbService.getLeaderboard(path);
    res.status(200).json(leaderboard);
  }
}
