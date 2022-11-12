import { RouterContext } from 'koa-router';
import { httpError, HTTP_STATUS } from '../lib/npg-errors';
import { IPaginatedPlansQuery } from '../interfaces/IPlan';
import { logger } from '../lib/npg-logger';
import * as planServices from '../services/plan.service';
import { sendResponse } from '../helpers/http-response.helper';
import { IHTTPBaseResponse } from 'src/interfaces/IHttpResponses';

/**
 *
 * @param ctx
 */
const getPlansController = async (ctx: RouterContext) => {
    const { limit, page } = ctx.state.query as IPaginatedPlansQuery;
    try {
        const result = await planServices.getPaginatedUserPlans(ctx.state.userId, page, limit);
        sendResponse(ctx, 200, result);
    } catch (err: any) {
        logger.error(err.message);
        httpError(ctx, HTTP_STATUS.StatusBadGateway, err.message);
    }
};

/**
 *
 * @param ctx
 */
const createPlanController = async (ctx: RouterContext) => {
    const { userId } = ctx.state;
    try {
        const planId = await planServices.createPlan(userId);
        const respPayload: IHTTPBaseResponse<{ plan_id: string }> = {
            code: 200,
            data: { plan_id: planId },
            status: 'SUCCESS'
        };
        sendResponse(ctx, 200, respPayload);
    } catch (err: any) {
        logger.error(err.message);
        httpError(ctx, HTTP_STATUS.StatusBadRequest, 'Couldnt create a new plan');
    }
};

export { getPlansController, createPlanController };
