import { UserValidations } from '../utils';
import { loginSchema } from '../schemas/user';
import tokenManagerFactory from './tokenManagerFactory';
import errorGenFactory from './errorGenFactory';

export default () => {
  const tokenManager = tokenManagerFactory();
  const errorGen = errorGenFactory();
  const loginValidation = loginSchema;
  return new UserValidations(tokenManager, loginValidation, errorGen);
};
