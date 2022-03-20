import { Request, Response } from 'express';
import Match from '../database/models/matchs';
import { MatchService } from '../services';

export default class MatchController {
  constructor(
    private matchService: MatchService,
  ) {}

  async getAll(req:Request, res:Response) {
    const { inProgress } = req.query;
    const matches = await this.matchService.getAll(inProgress as string | undefined);
    res.status(200).json(matches);
  }

  async create(req:Request, res:Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    const createdMatch = await this.matchService.create(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } as Match,
    );
    if (createdMatch.errorCode) {
      return res.status(createdMatch.errorCode).json({ message: createdMatch.message });
    }
    res.status(201).json(createdMatch);
  }

  async finishMatch(req:Request, res:Response) {
    const { id } = req.params;
    const finish = await this.matchService.update(id, { inProgress: false });
    if (typeof finish !== 'number') {
      return res.status(finish.errorCode).json({ message: finish.message });
    }
    res.status(200).json('ok');
  }

  async update(req:Request, res:Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const data = homeTeamGoals || awayTeamGoals
      ? { homeTeamGoals, awayTeamGoals } : { inProgress: false };
    const up = await this.matchService.update(id, data);
    if (typeof up !== 'number') {
      return res.status(up.errorCode).json({ message: up.message });
    }
    res.status(200).json('ok');
  }

  async getLeaderboard(req:Request, res:Response) {
    const path = req.url.replace('/', '');
    const leaderboard = await this.matchService.getLeaderboard(path);
    res.status(200).json(leaderboard);
  }
}
