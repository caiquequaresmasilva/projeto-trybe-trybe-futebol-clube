import { NextFunction, Request, Response } from 'express';
import { ServiceError } from '../interfaces';
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

  async create(req:Request, res:Response, next:NextFunction) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    const createdMatch = await this.matchService.create(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } as Match,
    );
    if ((<ServiceError>createdMatch).error) {
      return next((<ServiceError>createdMatch).error);
    }
    res.status(201).json(createdMatch);
  }

  async finishMatch(req:Request, res:Response, next:NextFunction) {
    const { id } = req.params;
    const finish = await this.matchService.update(id, { inProgress: false });
    if ((<ServiceError>finish).error) {
      return next((<ServiceError>finish).error);
    }
    res.status(200).json('ok');
  }

  async update(req:Request, res:Response, next:NextFunction) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const data = homeTeamGoals || awayTeamGoals
      ? { homeTeamGoals, awayTeamGoals } : { inProgress: false };
    const updated = await this.matchService.update(id, data);
    if ((<ServiceError>updated).error) {
      return next((<ServiceError>updated).error);
    }
    res.status(200).json('ok');
  }
}
