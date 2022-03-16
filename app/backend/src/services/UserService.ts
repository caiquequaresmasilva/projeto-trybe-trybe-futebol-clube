import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { readFileSync } from 'fs';
import { ILogin } from '../interfaces/User';
import User from '../database/models/users';

const JWT_SECRET = readFileSync('./jwt.evaluation.key', 'utf-8');

const checkPassword = (password: string, hash: string): Promise<boolean> => compare(password, hash);

const generateToken = (payload:ILogin) : string => sign(payload, JWT_SECRET, {
  algorithm: 'HS256',
  expiresIn: '1d',
});

const login = async (loginInfo: ILogin) => {
  const user = await User.findOne({ where: { email: loginInfo.email } });
  if (!user) return { errorCode: 401, message: 'Incorrect email or password' };
  const { password,username,email,id,role } = user;
  if (!checkPassword(loginInfo.password, password)) {
    return { errorCode: 401, message: 'Incorrect email or password' };
  }
  const token = generateToken(loginInfo);
  return { user:{ id,username,role,email}, token };
};

export { generateToken, login };
