import Match from '../database/models/matchs';
import { LbTools } from '../utils';
import Club from '../database/models/clubs';
import { IClubMatches, IStatistics } from '../interfaces';

export default class LeaderboardService {
  constructor(
    private clubModel: typeof Club,
    private matchModel: typeof Match,
    private lbTools: typeof LbTools,

  ) {}

  generateFindParams(path: string) {
    return {
      model: this.matchModel,
      as: `${path}Matches`,
      attributes: ['homeTeamGoals', 'awayTeamGoals'],
      where: { inProgress: false },
    };
  }

  generateIncludeParam(path:string) {
    if (!path) {
      return [this.generateFindParams('away'), this.generateFindParams('home')];
    }
    return [this.generateFindParams(path)];
  }

  async getLeaderboard(path: string):Promise<IStatistics[]> {
    const include = this.generateIncludeParam(path);
    const matchs: IClubMatches[] = await this.clubModel.findAll({ include });
    const leaderboard = this.lbTools.generateLeaderboard(matchs, path);
    return leaderboard;
  }
}
