import { LeaderboardController } from '../controllers';
import leaderboardServiceFactory from './leaderboardServiceFactory';

export default () => {
  const lbService = leaderboardServiceFactory();
  return new LeaderboardController(lbService);
};
