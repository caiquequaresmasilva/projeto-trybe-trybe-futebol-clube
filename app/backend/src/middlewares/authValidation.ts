import { Request, Response, NextFunction } from 'express';
import { authValidation } from '../services/UserService';

export default async (req:Request, res:Response, next:NextFunction) => {
  const { authorization } = req.headers;
  const { errorCode, message } = authValidation(authorization);
  if (errorCode) return res.status(errorCode).json({ message });
  next();
};
