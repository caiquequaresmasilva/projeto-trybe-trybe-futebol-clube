import Club from '../database/models/clubs';
import Match from '../database/models/matchs';
import { MatchService } from '../services';

export default () => new MatchService(Club, Match);
