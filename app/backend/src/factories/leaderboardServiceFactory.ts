import { LbTools } from '../utils';
import { LeaderboardService } from '../services';
import Club from '../database/models/clubs';
import Match from '../database/models/matchs';

export default () => new LeaderboardService(Club, Match, LbTools);
