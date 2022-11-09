import { RouterContext } from 'koa-router';
import { logger } from '../npg-logger';
import { HTTP_STATUS } from './helpers';

/**
 *
 * @param ctx
 * @param status
 */
const httpError = (ctx: RouterContext, status: number, message: string) => {
    logger.error(`HTTP Request exception with status of ${status} and error message: [${message}]`);
    ctx.status = status;
    ctx.body = {
        code: status,
        error: message
    };
};

export { httpError, HTTP_STATUS };
