import { Router } from 'express';
import { matchControllerFactory } from '../factories';
import authValidation from '../middlewares/authValidation';

const router = Router();
const matchController = matchControllerFactory();

router.get('/', (req, res) => matchController.getAll(req, res));

router.use(authValidation);
router.post('/', (req, res) => matchController.create(req, res));
router.patch('/:id/finish', (req, res) => matchController.finishMatch(req, res));
router.patch('/:id', (req, res) => matchController.update(req, res));

export default router;
