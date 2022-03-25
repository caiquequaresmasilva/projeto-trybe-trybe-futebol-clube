import { Request, Response, NextFunction } from 'express';
import { ExtendedError } from '../interfaces';

export default (error: ExtendedError, req: Request, res: Response, _next: NextFunction) => {
  const status = typeof error.code === 'number' ? error.code : 500;
  res.status(status).json({ message: error.message });
};
