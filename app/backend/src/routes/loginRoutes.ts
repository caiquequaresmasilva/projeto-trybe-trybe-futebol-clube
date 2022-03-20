import { Router } from 'express';
import UserController from '../controllers/User';
import { userControllerFactory } from '../factories';
import authValidation from '../middlewares/authValidation';

const userController = userControllerFactory();

const router = Router();

router.post('/', UserController.validateLogin, (req, res) => userController.login(req, res));

router.use(authValidation);
router.get('/validate', UserController.getRole);

export default router;
