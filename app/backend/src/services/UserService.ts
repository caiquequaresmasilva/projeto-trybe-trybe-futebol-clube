import { ILogin } from '../interfaces';
import User from '../database/models/users';
import { checkPassword, ErrorGen, UserValidations } from '../utils';

export default class UserService {
  constructor(
    private userModel: typeof User,
    private userValidations: UserValidations,
    private errorGen: ErrorGen,
  ) {}

  authValidation(token:string | undefined) {
    return this.userValidations.authValidation(token);
  }

  validateLogin(user: ILogin) {
    return this.userValidations.validateLogin(user);
  }

  async login(loginInfo: ILogin) {
    const user = await this.userModel.findOne({ where: { email: loginInfo.email } });
    if (!user) return this.errorGen.unauthorized('Incorrect email or password');
    const { password, username, email, id, role } = user;
    const passFlag = await checkPassword(loginInfo.password, password);
    if (!passFlag) {
      return this.errorGen.unauthorized('Incorrect email or password');
    }
    const token = this.userValidations.tokenManager.generate({ username, email, id, role });
    return { user: { id, username, role, email }, token };
  }
}
