import Router from 'koa-router';
import { getPlansController } from '../controllers/plan.controller';

const router = new Router({ prefix: '/plans' });

router.get('/', getPlansController);
router.get('/:plan_id', () => {});

export default router;
