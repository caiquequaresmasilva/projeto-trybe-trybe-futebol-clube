import { readFileSync } from 'fs';
import { TokenManager } from '../utils';

export default () => {
  const JWT_SECRET = readFileSync('./jwt.evaluation.key', 'utf-8');
  return new TokenManager(JWT_SECRET);
};
