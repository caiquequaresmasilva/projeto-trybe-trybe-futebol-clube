import { Request, Response } from 'express';
import { ClubService } from '../services';

export default class ClubController {
  constructor(
    private clubService: ClubService,
  ) {}

  async getAll(req:Request, res:Response) {
    const clubs = await this.clubService.getAll();
    res.status(200).json(clubs);
  }

  async getById(req:Request, res:Response) {
    const { id } = req.params;
    const club = await this.clubService.getById(id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.status(200).json(club);
  }
}
