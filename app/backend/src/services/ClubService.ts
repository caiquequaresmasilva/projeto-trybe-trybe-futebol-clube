import { IClub } from '../interfaces';
import Club from '../database/models/clubs';

export default class ClubService {
  constructor(
    private clubModel: typeof Club,
  ) {}

  async getAll(): Promise<IClub[]> {
    const clubs = await this.clubModel.findAll();
    return clubs;
  }

  async getById(id: number | string) { return this.clubModel.findByPk(id); }
}
