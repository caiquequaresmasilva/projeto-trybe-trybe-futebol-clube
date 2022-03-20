import { Router } from 'express';
import authValidation from '../middlewares/authValidation';
import * as UserController from '../controllers/User';

const router = Router();

router.post('/', UserController.validateLogin, UserController.login);

router.use(authValidation);
router.get('/validate', UserController.getRole);

export default router;
