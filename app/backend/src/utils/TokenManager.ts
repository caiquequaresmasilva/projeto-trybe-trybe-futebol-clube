import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { IUser } from '../interfaces';

export default class TokenManager {
  constructor(
    private readonly JWT_SECRET:string,
  ) {}

  verify(token:string) { return verify(token, this.JWT_SECRET) as JwtPayload; }

  generate(payload:IUser) {
    return sign(payload, this.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
  }
}
