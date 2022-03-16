import { sign } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { ILogin } from '../interfaces/User';
import User from '../database/models/users';

const JWT_SECRET = readFileSync('./jwt.evaluation.key', 'utf-8');

// class UserService {
//   constructor(
//     readonly UserModel: typeof User,
//   ) {}

//   static generateToken(payload: User) : string {
//     return sign(payload, JWT_SECRET, {
//       algorithm: 'HS256',
//       expiresIn: '1d',
//     });
//   }

//   public async login(login: ILogin) {
//     const user = await this.UserModel.findOne({ where: { ...login } });
//     if (!user) return false;
//     const token = UserService.generateToken(user);
//     return { user, token };
//   }
// }

const generateToken = (payload:ILogin) : string => sign(payload, JWT_SECRET, {
  algorithm: 'HS256',
  expiresIn: '1d',
});

const login = async (loginInfo: ILogin) => {
  const user = await User.findOne({ where: { ...loginInfo } });
  if (!user) return false;
  const token = generateToken(loginInfo);
  return { user, token };
};

export { generateToken, login };
