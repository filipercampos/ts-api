import { Router } from 'express';
const router = Router();

import routes from './routes/index';

routes.forEach((r) => r.routes(router));

export default router;
