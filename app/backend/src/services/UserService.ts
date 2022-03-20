import { ILogin } from '../interfaces';
import User from '../database/models/users';
import { loginSchema } from '../schemas/user';
import { Token, checkPassword } from '../utils';

export default class UserService {
  private static tokenManager = Token;

  private static loginSchema = loginSchema;

  constructor(
    readonly userModel: typeof User,
  ) {}

  static authValidation(token:string | undefined) {
    if (!token) return { errorCode: 401, message: 'Token not found' };
    try {
      const user = UserService.tokenManager.verify(token);
      return user;
    } catch (_) {
      return { errorCode: 401, message: 'Invalid Token' };
    }
  }

  static validateLogin(user: ILogin) {
    const validation = UserService.loginSchema.validate(user);
    if (validation.error) {
      return { errorCode: 401, message: 'All fields must be filled' };
    }
    return {};
  }

  async login(loginInfo: ILogin) {
    const user = await this.userModel.findOne({ where: { email: loginInfo.email } });
    if (!user) return { errorCode: 401, message: 'Incorrect email or password' };
    const { password, username, email, id, role } = user;
    const passFlag = await checkPassword(loginInfo.password, password);
    if (!passFlag) {
      return { errorCode: 401, message: 'Incorrect email or password' };
    }
    const token = UserService.tokenManager.generate({ username, email, id, role });
    return { user: { id, username, role, email }, token };
  }
}
