import { MatchController } from '../controllers';
import matchServiceFactory from './matchServiceFactory';

export default () => {
  const matchService = matchServiceFactory();
  return new MatchController(matchService);
};
