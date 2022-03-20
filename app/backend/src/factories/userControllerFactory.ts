import UserController from '../controllers/User';
import userServiceFactory from './userServiceFactory';

export default () => {
  const userService = userServiceFactory();
  return new UserController(userService);
};
