import { NextFunction, Request, Response } from 'express';
import { ServiceError } from '../interfaces';
import { ClubService } from '../services';

export default class ClubController {
  constructor(
    private clubService: ClubService,
  ) {}

  async getAll(req:Request, res:Response) {
    const clubs = await this.clubService.getAll();
    res.status(200).json(clubs);
  }

  async getById(req:Request, res:Response, next:NextFunction) {
    const { id } = req.params;
    const club = await this.clubService.getById(id);
    if ((<ServiceError>club).error) return next((<ServiceError>club).error);
    res.status(200).json(club);
  }
}
