import { Router } from 'express';
import { matchControllerFactory } from '../factories';
import authValidation from '../middlewares/authValidation';

const router = Router();
const matchController = matchControllerFactory();

router.get('/', (req, res) => matchController.getAll(req, res));

router.use(authValidation);
router.post('/', (req, res, next) => matchController.create(req, res, next));
router.patch('/:id/finish', (req, res, next) => matchController.finishMatch(req, res, next));
router.patch('/:id', (req, res, next) => matchController.update(req, res, next));

export default router;
