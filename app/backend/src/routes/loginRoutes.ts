import { Router } from 'express';
import * as UserController from '../controllers/User';

const router = Router();

router.post('/', UserController.login);

export default router;
