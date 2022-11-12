import { RouterContext } from 'koa-router';

/**
 *
 * @param ctx
 * @param payload
 * @param headers
 */
export const sendResponse = (ctx: RouterContext, status: number, payload: any, headers: any = {}) => {
    ctx.status = status;
    ctx.set(headers);
    ctx.body = payload;
};
