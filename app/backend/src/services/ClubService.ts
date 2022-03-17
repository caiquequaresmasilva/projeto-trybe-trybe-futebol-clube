import IClub from '../interfaces/Club';
import Club from '../database/models/clubs';

const getAll = async (): Promise<IClub[]> => {
  const clubs = await Club.findAll();
  return clubs;
};

const getById = () => null;

export { getAll, getById };
