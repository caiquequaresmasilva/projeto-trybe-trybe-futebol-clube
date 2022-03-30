import { ErrorGen } from '../utils';
import { IClub } from '../interfaces';
import Club from '../database/models/clubs';

export default class ClubService {
  constructor(
    private clubModel: typeof Club,
    private erroGen: ErrorGen,
  ) {}

  async getAll(): Promise<IClub[]> {
    return this.clubModel.findAll();
  }

  async getById(id: number | string) {
    const club = this.clubModel.findByPk(id);
    if (!club) return this.erroGen.notFound('Club not found');
    return club;
  }
}
