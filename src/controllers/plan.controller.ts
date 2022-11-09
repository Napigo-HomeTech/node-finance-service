import { RouterContext } from 'koa-router';

/**
 *
 * @param ctx
 */
export const getPlansController = async (ctx: RouterContext) => {
    const { userId } = ctx.state;

    ctx.body = {
        message: userId
    };
};
