import Router from 'koa-router';
import { validateQueries } from '../validators/queries.validator';
import { getPlansController } from '../controllers/plan.controller';

const router = new Router({ prefix: '/plans' });

router.get('/', validateQueries('get-paginated-plans'), getPlansController);
router.get('/:plan_id', () => {});

export default router;
