import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { RequestWithUser, ServiceError } from '../interfaces';
import { UserService } from '../services';

export default class UserController {
  constructor(private userService: UserService) {
  }

  async validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const val = this.userService.validateLogin({ email, password });
    if (val.error) return next(val.error);
    next();
  }

  static async getRole(req: RequestWithUser, res: Response) {
    const { user: { role } } : JwtPayload = req;
    res.status(200).json(role);
  }

  async login(req: Request, res: Response, next:NextFunction) {
    const { email, password } = req.body;
    const user = await this.userService.login({ email, password });
    if ((<ServiceError>user).error) return next((<ServiceError>user).error);
    res.status(200).json(user);
  }
}
