import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { RequestWithUser } from '../interfaces';
import { UserService } from '../services';

export default class UserController {
  constructor(private userService: UserService) {
  }

  static async validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const val = UserService.validateLogin({ email, password });
    if (val.errorCode) return res.status(val.errorCode).json({ message: val.message });
    next();
  }

  teste() {
    console.log(this.userService);
  }

  static async getRole(req: RequestWithUser, res: Response) {
    const { user: { role } } : JwtPayload = req;
    res.status(200).json(role);
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(this.userService);
    const user = await this.userService.login({ email, password });
    if (user.errorCode) return res.status(user.errorCode).json({ message: user.message });
    res.status(200).json(user);
  }
}
