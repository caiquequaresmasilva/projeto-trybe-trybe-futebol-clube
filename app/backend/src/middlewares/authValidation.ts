import { Response, NextFunction } from 'express';
import { UserService } from '../services';
import { RequestWithUser } from '../interfaces';

export default async (req:RequestWithUser, res:Response, next:NextFunction) => {
  const { authorization } = req.headers;
  const val = UserService.authValidation(authorization);
  if (val.errorCode) return res.status(val.errorCode).json({ message: val.message });
  req.user = val;
  next();
};
