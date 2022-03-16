import { NextFunction, Request, Response } from 'express';
import * as UserService from '../services/UserService';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserService.login({ email, password });
  if (user.errorCode) return res.status(user.errorCode).json({ message: user.message });
  res.status(200).json(user);
};

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const val = UserService.validateLogin({ email, password });
  if (val.errorCode) return res.status(val.errorCode).json({ message: val.message });
  next();
};

export { login, validateLogin };
