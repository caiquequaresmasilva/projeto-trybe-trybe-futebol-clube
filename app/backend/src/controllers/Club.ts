import { Request, Response } from 'express';
import * as ClubService from '../services/ClubService';

const getAll = async (req:Request, res:Response) => {
  const clubs = await ClubService.getAll();
  res.status(200).json(clubs);
};

const getById = async (req:Request, res:Response) => {
  const { id } = req.params;
  const club = await ClubService.getById(id);
  if (!club) return res.status(404).json({ message: 'Club not found' });
  res.status(200).json(club);
};

export { getAll, getById };
