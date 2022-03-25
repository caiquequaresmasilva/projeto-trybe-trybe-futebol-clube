import { ObjectSchema } from 'joi';
import { ILogin, ServiceError } from '../interfaces';
import TokenManager from './TokenManager';
import ErrorGen from './ErrorGen';

export default class UserValidations {
  constructor(
    readonly tokenManager: TokenManager,
    private readonly loginValidation: ObjectSchema,
    private readonly errorGen: ErrorGen,
  ) {}

  authValidation(token:string | undefined) {
    if (!token) return this.errorGen.unauthorized('Token not found');
    try {
      const user = this.tokenManager.verify(token);
      return user;
    } catch (_) {
      return this.errorGen.unauthorized('Invalid Token');
    }
  }

  validateLogin(user: ILogin):ServiceError {
    const validation = this.loginValidation.validate(user);
    if (validation.error) {
      return this.errorGen.unauthorized('All fields must be filled');
    }
    return { error: false };
  }
}
