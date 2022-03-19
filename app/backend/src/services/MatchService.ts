import { IClubHomeMatches } from '../interfaces/Club';
import { generateHomeLeaderboard } from '../utils';
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
  const match = await Match.findByPk(id);
  if (!match) return { errorCode: 404, message: 'Match not found' };
  if (!match.inProgress) return { errorCode: 401, message: 'Match already finished' };
  const [updated] = await Match.update(data, { where: { id } });
  return updated;
};

const validateMatch = ({ homeTeam, awayTeam }: Match) => homeTeam !== awayTeam;

const validateTeams = async ({ homeTeam, awayTeam }: Match) => {
  const teams = await Club.findAll({ where: { id: [homeTeam, awayTeam] } });
  return teams.length === 2;
};

const create = async (data: Match) => {
  if (!validateMatch(data)) {
    return { errorCode: 401, message: 'It is not possible to create a match with two equal teams' };
  }
  const teamsFlag = await validateTeams(data);
  if (!teamsFlag) {
    return { errorCode: 401, message: 'There is no team with such id!' };
  }
  const { id } = await Match.create(data);
  return { ...data, id };
};

const getHomeLeaderboard = async () => {
  const matchs: IClubHomeMatches[] = await Club.findAll({
    include: [
      { model: Match,
        as: 'homeMatches',
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
        where: { inProgress: false },
      },
    ],
  });
  const leaderboard = generateHomeLeaderboard(matchs);
  return leaderboard;
};

export { getAll, update, create, getHomeLeaderboard };
