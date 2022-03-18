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

const update = async (id: string | number, data: object) => {
  const [updated] = await Match.update(data, { where: { id } });
  if (!updated) return { errorCode: 404, message: 'Team not found' };
  return updated;
};

const create = async (data: Match) => {
  const { id } = await Match.create(data);
  return { ...data, id };
};

export { getAll, update, create };
