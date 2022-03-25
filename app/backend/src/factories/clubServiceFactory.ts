import { ClubService } from '../services';
import Club from '../database/models/clubs';
import errorGenFactory from './errorGenFactory';

export default () => {
  const club = Club;
  const errorGen = errorGenFactory();
  return new ClubService(club, errorGen);
};
