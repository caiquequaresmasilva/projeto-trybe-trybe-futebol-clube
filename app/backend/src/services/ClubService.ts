import { IClub } from '../interfaces';
import Club from '../database/models/clubs';

const getAll = async (): Promise<IClub[]> => {
  const clubs = await Club.findAll();
  return clubs;
};

const getById = async (id: number | string) => Club.findByPk(id);

export { getAll, getById };
