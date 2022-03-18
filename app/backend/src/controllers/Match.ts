import { Request, Response } from 'express';
import Match from '../database/models/matchs';
import * as MatchService from '../services/MatchService';

const getAll = async (req:Request, res:Response) => {
  const { inProgress } = req.query;
  const matches = await MatchService.getAll(inProgress as string | undefined);
  res.status(200).json(matches);
};

const create = async (req:Request, res:Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  const createdMatch = await MatchService.create(
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } as Match,
  );
  if (createdMatch.errorCode) {
    return res.status(createdMatch.errorCode).json({ message: createdMatch.message });
  }
  res.status(201).json(createdMatch);
};

const finishMatch = async (req:Request, res:Response) => {
  const { id } = req.params;
  const finish = await MatchService.update(id, { inProgress: false });
  if (typeof finish !== 'number') {
    return res.status(finish.errorCode).json({ message: finish.message });
  }
  res.status(200).end();
};
export { getAll, create, finishMatch };
