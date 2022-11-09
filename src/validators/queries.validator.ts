import { Next } from 'koa';
import { RouterContext } from 'koa-router';
import { httpError, HTTP_STATUS } from '../lib/npg-errors';
import * as yup from 'yup';

/**
 * ---------------------------------------------------------------------------
 * Validator for GET /plans - paginated
 * ---------------------------------------------------------------------------
 */
const validatePaginatedPlansQuery_schema = yup.object().shape({
    page: yup.number().required().positive().integer(),
    limit: yup.number().required().positive().integer()
});

const QuerySchemaValidatorMap = {
    'get-paginated-plans': validatePaginatedPlansQuery_schema
};

export const validateQueries = (name: keyof typeof QuerySchemaValidatorMap) => {
    return async function (ctx: RouterContext, next: Next) {
        try {
            const queries = ctx.query;
            const result = await QuerySchemaValidatorMap[name].validate(queries);
            ctx.state.query = result;
            await next();
        } catch (err: any) {
            if (err instanceof yup.ValidationError) {
                const valError = err as yup.ValidationError;
                httpError(ctx, HTTP_STATUS.StatusBadRequest, valError.errors.join('|'));
                return;
            }
            httpError(ctx, HTTP_STATUS.StatusBadRequest, err.message);
        }
    };
};
