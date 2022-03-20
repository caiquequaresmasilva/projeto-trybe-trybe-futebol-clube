import { ILogin } from '../interfaces';
import User from '../database/models/users';
import { loginSchema } from '../schemas/user';
import { Token, checkPassword } from '../utils';

const authValidation = (token:string | undefined) => {
  if (!token) return { errorCode: 401, message: 'Token not found' };
  try {
    const user = Token.verify(token);
    return user;
  } catch (_) {
    return { errorCode: 401, message: 'Invalid Token' };
  }
};

const validateLogin = (user: ILogin) => {
  const validation = loginSchema.validate(user);
  if (validation.error) {
    return { errorCode: 401, message: 'All fields must be filled' };
  }
  return {};
};

const login = async (loginInfo: ILogin) => {
  const user = await User.findOne({ where: { email: loginInfo.email } });
  if (!user) return { errorCode: 401, message: 'Incorrect email or password' };
  const { password, username, email, id, role } = user;
  const passFlag = await checkPassword(loginInfo.password, password);
  if (!passFlag) {
    return { errorCode: 401, message: 'Incorrect email or password' };
  }
  const token = Token.generate({ username, email, id, role });
  return { user: { id, username, role, email }, token };
};

export { login, validateLogin, authValidation };
