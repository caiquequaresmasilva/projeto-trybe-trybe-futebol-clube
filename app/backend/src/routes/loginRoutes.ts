import { Router } from 'express';
import { UserController } from '../controllers';
import { userControllerFactory } from '../factories';
import authValidation from '../middlewares/authValidation';

const userController = userControllerFactory();

const router = Router();

router.post(
  '/',
  (req, res, next) => userController.validateLogin(req, res, next),

  (req, res, next) => userController.login(req, res, next),
);

router.use(authValidation);
router.get('/validate', UserController.getRole);

export default router;
