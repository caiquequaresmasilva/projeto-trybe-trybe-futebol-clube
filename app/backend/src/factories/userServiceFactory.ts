import UserService from '../services/UserService';
import User from '../database/models/users';

export default () => new UserService(User);
