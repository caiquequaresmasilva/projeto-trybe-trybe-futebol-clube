import { Router } from 'express';
import * as MatchController from '../controllers/Match';
import authValidation from '../middlewares/authValidation';

const router = Router();

router.get('/', MatchController.getAll);

router.use(authValidation);
router.post('/', MatchController.create);
router.patch('/:id/finish', MatchController.finishMatch);
router.patch('/:id', MatchController.update);

export default router;
