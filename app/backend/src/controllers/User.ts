import { Request, Response } from 'express';
import * as UserService from '../services/UserService';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserService.login({ email, password });
  if (user.errorCode) return res.status(user.errorCode).json({ message: user.message });
  res.status(200).json(user);
};

const nulo = () => null;

export { login, nulo };
