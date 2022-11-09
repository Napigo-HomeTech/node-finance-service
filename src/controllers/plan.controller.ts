import { RouterContext } from 'koa-router';
import { IPaginatedPlansQuery } from 'src/interfaces/IPlan';

/**
 *
 * @param ctx
 */
export const getPlansController = async (ctx: RouterContext) => {
    const query = ctx.state.query as IPaginatedPlansQuery;

    ctx.body = {
        message: query
    };
};
