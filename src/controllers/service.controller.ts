import { RouterContext } from 'koa-router';

/**
 *
 * @param ctx
 */
export const serviceStatusController = (ctx: RouterContext) => {
    ctx.status = 200;
    ctx.body = {
        message: 'server online'
    };
};
