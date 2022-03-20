import ClubController from '../controllers/Club';
import clubServiceFactory from './clubServiceFactory';

export default () => {
  const clubService = clubServiceFactory();
  return new ClubController(clubService);
};
