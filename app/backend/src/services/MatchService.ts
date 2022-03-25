import { ErrorGen } from '../utils';
import Club from '../database/models/clubs';
import Match from '../database/models/matchs';

export default class MatchService {
  constructor(
    private clubModel: typeof Club,
    private matchModel: typeof Match,
    private errorGen: ErrorGen,
  ) {}

  async getAll(inProgress: undefined | string) {
    const matchs = await this.matchModel.findAll({
      where: inProgress ? { inProgress: inProgress === 'true' } : {},
      attributes: { exclude: ['home_team', 'away_team'] },
      include: [
        { model: Club, as: 'homeClub', attributes: { exclude: ['id'] } },
        { model: Club, as: 'awayClub', attributes: { exclude: ['id'] } },
      ],
    });
    return matchs;
  }

  async update(id: string | number, data: Partial<Match>) {
    const match = await this.matchModel.findByPk(id);
    if (!match) return this.errorGen.notFound('Match not found');
    if (!match.inProgress) return this.errorGen.unauthorized('Match already finished');
    const [updated] = await this.matchModel.update(data, { where: { id } });
    return updated;
  }

  static validateMatch({ homeTeam, awayTeam }: Match) {
    return homeTeam !== awayTeam;
  }

  async validateTeams({ homeTeam, awayTeam }: Match) {
    const teams = await this.clubModel.findAll({ where: { id: [homeTeam, awayTeam] } });
    return teams.length === 2;
  }

  async create(data: Match) {
    if (!MatchService.validateMatch(data)) {
      return this.errorGen.unauthorized(
        'It is not possible to create a match with two equal teams',
      );
    }
    const teamsFlag = await this.validateTeams(data);
    if (!teamsFlag) {
      return this.errorGen.unauthorized('There is no team with such id!');
    }
    const { id } = await this.matchModel.create(data);
    return { ...data, id };
  }
}
