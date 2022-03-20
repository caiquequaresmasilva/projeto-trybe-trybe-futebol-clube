import { UserController } from '../controllers';
import userServiceFactory from './userServiceFactory';

export default () => {
  const userService = userServiceFactory();
  return new UserController(userService);
};
