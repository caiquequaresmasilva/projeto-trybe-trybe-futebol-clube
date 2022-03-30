import { Router } from 'express';
import { UserController } from '../controllers';
import { userControllerFactory } from '../factories';
import authValidation from '../middlewares/authValidation';

const userController = userControllerFactory();

const loginRoutes = Router();

loginRoutes.post(
  '/',
  (req, res, next) => userController.validateLogin(req, res, next),

  (req, res, next) => userController.login(req, res, next),
);

loginRoutes.use(authValidation);
loginRoutes.get('/validate', UserController.getRole);

export default loginRoutes;
