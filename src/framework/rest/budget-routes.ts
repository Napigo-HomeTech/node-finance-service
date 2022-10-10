import Router from 'koa-router';
import { getBudgetsHandler, postBudgetsHandler } from './handlers';

const router = new Router({ prefix: '/budgets' });

router.get('/:id', getBudgetsHandler);
router.get('/', getBudgetsHandler);
router.post('/', postBudgetsHandler);

export default router;
