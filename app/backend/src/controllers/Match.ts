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
  res.status(201).json(createdMatch);
};

export { getAll, create };
