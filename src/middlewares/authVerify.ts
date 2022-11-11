import { Next } from 'koa';
import { RouterContext } from 'koa-router';
import { httpError, HTTP_STATUS } from '../lib/npg-errors';
import jwt from 'jsonwebtoken';
import { AppConfig } from '../configs/app-config';
import { logger } from '../lib/npg-logger';
import { isEmpty } from 'lodash';

/**
 * This middleware extract our the user id value from the token set in
 * X-CSRF-Token request header and simple attached to the koa-state object to be pass around
 * the controller and services whoever need it.
 * @param ctx
 * @param next
 */
export const authVerify = async (ctx: RouterContext, next: Next) => {
    try {
        /**
         * Check if Bearer is found on the auth header value, instead of of a token without the
         * bearer prefix..
         */

        if (!ctx.headers.hasOwnProperty('x-csrf-token')) {
            throw new Error('csrftoken header not found');
        }
        const token = ctx.headers['x-csrf-token'] as string;

        const verified = jwt.verify(token, AppConfig.JWT.secret, {
            complete: true,
            algorithms: [AppConfig.JWT.alg as jwt.Algorithm],
            audience: AppConfig.JWT.audience,
            issuer: AppConfig.JWT.issuer
        });

        /**
         * Checking for Kid in header manually, as this is an extra steps for
         * token verification.
         */
        const kid = verified.header.kid;
        if (kid !== AppConfig.JWT.kid) {
            throw new Error('invalid kid in bearer token');
        }

        const decodedToken = jwt.decode(token);
        if (isEmpty(decodedToken?.sub)) {
            throw new Error('No sub claim found in the token');
        }

        ctx.state.userId = decodedToken?.sub;
        await next();
    } catch (err: any) {
        logger.error(err.message);
        httpError(ctx, HTTP_STATUS.StatusUnauthorized, 'Unauthorized');
    }
};
