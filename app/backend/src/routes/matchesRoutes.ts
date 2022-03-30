import { Router } from 'express';
import { matchControllerFactory } from '../factories';
import authValidation from '../middlewares/authValidation';

const matchesRoutes = Router();
const matchController = matchControllerFactory();

matchesRoutes.get('/', (req, res) => matchController.getAll(req, res));

matchesRoutes.use(authValidation);
matchesRoutes.post('/', (req, res, next) => matchController.create(req, res, next));
matchesRoutes.patch('/:id/finish', (req, res, next) => matchController.finishMatch(req, res, next));
matchesRoutes.patch('/:id', (req, res, next) => matchController.update(req, res, next));

export default matchesRoutes;
