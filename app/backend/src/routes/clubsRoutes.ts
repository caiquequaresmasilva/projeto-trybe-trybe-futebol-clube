import { Router } from 'express';
import { clubControllerFactory } from '../factories';

const clubsRoutes = Router();
const clubController = clubControllerFactory();

clubsRoutes.get('/', (req, res) => clubController.getAll(req, res));
clubsRoutes.get('/:id', (req, res, next) => clubController.getById(req, res, next));

export default clubsRoutes;
