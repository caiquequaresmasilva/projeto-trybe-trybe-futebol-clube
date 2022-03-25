import { Response, NextFunction } from 'express';
import { userValidationsFactory } from '../factories';
import { RequestWithUser } from '../interfaces';

const userValidations = userValidationsFactory();

export default async (req:RequestWithUser, res:Response, next:NextFunction) => {
  const { authorization } = req.headers;
  const val = userValidations.authValidation(authorization);
  if (val.error) return next(val.error);
  req.user = val;
  next();
};
