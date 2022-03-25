import UserService from '../services/UserService';
import User from '../database/models/users';
import userValidationsFactory from './userValidationsFactory';
import errorGenFactory from './errorGenFactory';

export default () => {
  const userValidations = userValidationsFactory();
  const errorGen = errorGenFactory();
  const user = User;
  return new UserService(user, userValidations, errorGen);
};
