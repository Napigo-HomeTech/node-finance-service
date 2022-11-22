import * as yup from 'yup';
import { Next } from 'koa';
import { RouterContext } from 'koa-router';
import { httpError, HTTP_STATUS } from '../lib/npg-errors';

/**
 *
 */
const validatePutPlanBody_schema = yup.object().shape({
    _id: yup.string().required(),
    title: yup.string().required(),
    net_income: yup.string().required(),
    esm_percent: yup.number().required(),
    esm_amount: yup.string().required(),
    asm_percent: yup.number().required(),
    asm_amount: yup.string().required(),
    col: yup.string().required(),
    categories: yup.array(yup.string()).required(),
    items: yup.array(yup.object()).required()
});

const BodySchemaValidatorMap = {
    'put-planform': validatePutPlanBody_schema
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
