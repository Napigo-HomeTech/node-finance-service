import { RouterContext } from 'koa-router';
import { httpError, HTTP_STATUS } from '../lib/npg-errors';
import { IDocPlan, IPaginatedPlansQuery, IPlanFormUpdateRequest } from '../interfaces/IPlan';
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

/**
 *
 * @param ctx
 */
const getPlanController = async (ctx: RouterContext) => {
    const { plan_id } = ctx.params;
    try {
        const plan = await planServices.getPlan(plan_id);
        const respPayload: IHTTPBaseResponse<IDocPlan> = {
            code: 200,
            data: plan,
            status: 'SUCCESS'
        };
        sendResponse(ctx, HTTP_STATUS.StatusOK, respPayload);
    } catch (err: any) {
        logger.error(err.message);
        httpError(ctx, HTTP_STATUS.StatusBadRequest, 'Could not retrieved plan with id : ' + plan_id);
    }
};

/**
 *
 * @param ctx
 */
const updatePlanFormController = async (ctx: RouterContext) => {
    const payload = ctx.state.body as IPlanFormUpdateRequest;
    try {
        /**
         * @TODO
         */
        const result = await planServices.updatePlan(payload);
        const respPayload: IHTTPBaseResponse<{ _id: string }> = {
            code: 200,
            data: { _id: result },
            status: 'SUCCESS'
        };
        sendResponse(ctx, HTTP_STATUS.StatusOK, respPayload);
    } catch (err: any) {
        logger.error(err.message);
        httpError(ctx, HTTP_STATUS.StatusBadRequest, 'Could not update plan with id : ' + payload._id);
    }
};

/**
 *
 * @param ctx
 */
const deletePlanController = async (ctx: RouterContext) => {
    const { plan_id } = ctx.params;
    try {
        const result = await planServices.softDeletePlan(plan_id);

        const respPayload: IHTTPBaseResponse<{ _id: string }> = {
            code: 200,
            data: { _id: result },
            status: 'DELETED'
        };
        sendResponse(ctx, HTTP_STATUS.StatusOK, respPayload);
    } catch (err: any) {
        logger.error(err.message);
        httpError(ctx, HTTP_STATUS.StatusBadRequest, 'Could not delete plan with id : ' + plan_id);
    }
};

export { getPlansController, createPlanController, getPlanController, updatePlanFormController, deletePlanController };
