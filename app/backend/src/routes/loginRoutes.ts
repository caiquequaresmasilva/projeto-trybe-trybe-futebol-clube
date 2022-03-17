import { Router } from 'express';
import * as UserController from '../controllers/User';

const router = Router();

router.post('/', UserController.validateLogin, UserController.login);
router.get('/validate', UserController.authValidation);

export default router;
