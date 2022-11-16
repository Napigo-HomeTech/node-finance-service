import Router from 'koa-router';
import { validateQueries } from '../validators/queries.validator';
import { createPlanController, getPlanController, getPlansController, updatePlanTitleController } from '../controllers/plan.controller';
import { validateBody } from '../validators/postbody.validator';

const router = new Router({ prefix: '/plans' });

router.get('/', validateQueries('get-paginated-plans'), getPlansController);
router.get('/:plan_id', getPlanController);

router.post('/', createPlanController);

router.put('/title', validateBody('put-plan-title'), updatePlanTitleController);

export default router;
