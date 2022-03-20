import { Router } from 'express';
import { clubControllerFactory } from '../factories';

const router = Router();
const clubController = clubControllerFactory();

router.get('/', (req, res) => clubController.getAll(req, res));
router.get('/:id', (req, res) => clubController.getById(req, res));

export default router;
