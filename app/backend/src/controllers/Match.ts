import { Request, Response } from 'express';
import * as MatchService from '../services/MatchService';

const getAll = async (req:Request, res:Response) => {
  const { inProgress } = req.query;
  const matches = await MatchService.getAll(inProgress as string | undefined);
  res.status(200).json(matches);
};

const getById = () => null;

export { getAll, getById };
