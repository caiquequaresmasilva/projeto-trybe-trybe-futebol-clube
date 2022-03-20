import MatchController from '../controllers/Match';
import matchServiceFactory from './matchServiceFactory';

export default () => {
  const matchService = matchServiceFactory();
  return new MatchController(matchService);
};
