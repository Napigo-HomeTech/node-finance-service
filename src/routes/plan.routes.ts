import Router from 'koa-router';
import { validateQueries } from '../validators/queries.validator';
import { createPlanController, getPlansController } from '../controllers/plan.controller';

const router = new Router({ prefix: '/plans' });

router.get('/', validateQueries('get-paginated-plans'), getPlansController);
router.get('/:plan_id', () => {});

router.post('/', createPlanController);

export default router;
