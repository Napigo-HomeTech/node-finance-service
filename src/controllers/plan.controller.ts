import { RouterContext } from 'koa-router';
import { httpError, HTTP_STATUS } from '../lib/npg-errors';
import { IPaginatedPlansQuery } from '../interfaces/IPlan';
import { logger } from '../lib/npg-logger';
import * as planServices from '../services/plan.service';
import { sendGETResponse } from '../helpers/http-response.helper';

/**
 *
 * @param ctx
 */
const getPlansController = async (ctx: RouterContext) => {
    const { limit, page } = ctx.state.query as IPaginatedPlansQuery;
    try {
        const result = await planServices.getPaginatedUserPlans(ctx.state.userId, page, limit);
        sendGETResponse(ctx, result);
    } catch (err: any) {
        logger.error(err.message);
        httpError(ctx, HTTP_STATUS.StatusBadGateway, err.message);
    }
};

export { getPlansController };
