import { RouterContext } from 'koa-router';

/**
 *
 * @param ctx
 * @param payload
 * @param headers
 */
export const sendGETResponse = (ctx: RouterContext, payload: any, headers: any = {}) => {
    ctx.status = 200;
    ctx.set(headers);
    ctx.body = payload;
};
