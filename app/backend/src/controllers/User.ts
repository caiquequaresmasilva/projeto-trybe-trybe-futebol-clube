import { Request, Response } from 'express';
import * as UserService from '../services/UserService';

// class UserControler {
//   constructor(readonly userService: Object = UserService) {}

//   async login(req: Request, res: Response) {
//     const { email, password } = req.body;
//     const user = await this.userService.login({ email, password });
//     if (!user) return res.status(401).json({ message: 'Erro' });
//     res.status(200).json(user);
//   }
// }

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserService.login({ email, password });
  if (!user) return res.status(401).json({ message: 'Erro' });
  res.status(200).json(user);
};

const nulo = () => null;

export { login, nulo };
