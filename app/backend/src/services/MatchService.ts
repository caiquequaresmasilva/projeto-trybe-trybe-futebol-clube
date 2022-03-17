import Club from '../database/models/clubs';
import Match from '../database/models/matchs';

const getAll = async (inProgress: undefined | string) => {
  const matchs = await Match.findAll({
    where: inProgress ? { inProgress: inProgress === 'true' } : {},
    attributes: { exclude: ['home_team', 'away_team'] },
    include: [
      { model: Club, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Club, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });
  return matchs;
};

const getById = () => null;

export { getAll, getById };
