import { Router } from 'express';
import * as UserController from '../controllers/User';

const router = Router();

router.post('/', UserController.validateLogin, UserController.login);

export default router;
