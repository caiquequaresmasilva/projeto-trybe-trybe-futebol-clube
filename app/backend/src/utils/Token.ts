import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { IUser } from '../interfaces';

const Token = {
  JWT_SECRET: readFileSync('./jwt.evaluation.key', 'utf-8'),

  verify(token:string) { return verify(token, this.JWT_SECRET) as JwtPayload; },

  generate(payload:IUser) {
    return sign(payload, this.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
  },
};

export default Token;
