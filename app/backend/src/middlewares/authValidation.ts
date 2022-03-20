import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces';
import { authValidation } from '../services/UserService';

export default async (req:RequestWithUser, res:Response, next:NextFunction) => {
  const { authorization } = req.headers;
  const val = authValidation(authorization);
  if (val.errorCode) return res.status(val.errorCode).json({ message: val.message });
  req.user = val;
  next();
};
