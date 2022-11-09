import { serviceStatusController } from '../controllers/service.controller';
import Router from 'koa-router';

const router = new Router({ prefix: '/service' });
router.get('/status', serviceStatusController);

export default router;
