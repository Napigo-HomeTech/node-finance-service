import { Next } from 'koa';
import { RouterContext } from 'koa-router';
import { logger } from '../lib/npg-logger';

export const routerLogging = async (ctx: RouterContext, next: Next) => {
    logger.http(`incoming request from ${ctx.state.userId} - [${ctx.method}] path: ${ctx.path} body: ${JSON.stringify(ctx.request.body)}`);
    await next();
};
