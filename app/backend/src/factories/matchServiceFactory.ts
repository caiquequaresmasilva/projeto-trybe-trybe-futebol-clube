import Club from '../database/models/clubs';
import Match from '../database/models/matchs';
import { MatchService } from '../services';
import errorGenFactory from './errorGenFactory';

export default () => {
  const club = Club;
  const match = Match;
  const errorGen = errorGenFactory();
  return new MatchService(club, match, errorGen);
};
