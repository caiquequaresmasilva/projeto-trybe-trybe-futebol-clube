import { Router } from 'express';
import { clubControllerFactory } from '../factories';

const router = Router();
const clubController = clubControllerFactory();

router.get('/', (req, res) => clubController.getAll(req, res));
router.get('/:id', (req, res, next) => clubController.getById(req, res, next));

export default router;
