import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import Appointmentscontroller from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new Appointmentscontroller();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;