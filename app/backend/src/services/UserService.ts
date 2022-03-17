import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { readFileSync } from 'fs';
import IUser, { ILogin } from '../interfaces/User';
import User from '../database/models/users';
import { loginSchema } from '../schemas/user';

const JWT_SECRET = readFileSync('./jwt.evaluation.key', 'utf-8');

const checkPassword = (password: string, hash: string): Promise<boolean> => compare(password, hash);

const generateToken = (payload:IUser) : string => sign(payload, JWT_SECRET, {
  algorithm: 'HS256',
  expiresIn: '1d',
});

const authValidation = (token:string | undefined) => {
  if (!token) return { errorCode: 401, message: 'Token not found' };
  try {
    const user = verify(token, JWT_SECRET);
    return { role: (<JwtPayload>user).role };
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
  const token = generateToken({ username, email, id, role });
  return { user: { id, username, role, email }, token };
};

export { generateToken, login, validateLogin, authValidation };
