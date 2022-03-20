import { ClubService } from '../services';
import Club from '../database/models/clubs';

export default () => new ClubService(Club);
