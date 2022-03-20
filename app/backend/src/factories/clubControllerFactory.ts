import { ClubController } from '../controllers';
import clubServiceFactory from './clubServiceFactory';

export default () => {
  const clubService = clubServiceFactory();
  return new ClubController(clubService);
};
