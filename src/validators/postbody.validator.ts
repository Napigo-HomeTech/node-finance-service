import * as yup from 'yup';
import { Next } from 'koa';
import { RouterContext } from 'koa-router';
import { httpError, HTTP_STATUS } from '../lib/npg-errors';

/**
 * ---------------------------------------------------------------------------
 * Validator for PUT /plans/title
 * ---------------------------------------------------------------------------
 */
const validatePutPlanTitleBody_schema = yup.object().shape({
    plan_id: yup.string().required(),
    title: yup.string().required()
});

const BodySchemaValidatorMap = {
    'put-plan-title': validatePutPlanTitleBody_schema
};

export const validateBody = (name: keyof typeof BodySchemaValidatorMap) => {
    return async function (ctx: RouterContext, next: Next) {
        try {
            const body = ctx.request.body;
            const result = await BodySchemaValidatorMap[name].validate(body);
            ctx.state.body = result;
            return next();
        } catch (err: any) {
            if (err instanceof yup.ValidationError) {
                const valError = err as yup.ValidationError;
                httpError(ctx, HTTP_STATUS.StatusBadGateway, valError.errors.join('|'));
                return;
            }
            httpError(ctx, HTTP_STATUS.StatusBadRequest, err.message);
        }
    };
};
