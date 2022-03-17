import { Request, Response } from 'express';
import * as ClubService from '../services/ClubService';

const getAll = async (req:Request, res:Response) => {
  const clubs = await ClubService.getAll();
  res.status(200).json(clubs);
};

const getById = () => null;

export { getAll, getById };
