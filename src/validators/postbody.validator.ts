import * as yup from 'yup';
import { Next } from 'koa';
import { RouterContext } from 'koa-router';
import { httpError, HTTP_STATUS } from '../lib/npg-errors';

/**
 * ---------------------------------------------------------------------------
 * Validator for PUT /plans/title
 * ---------------------------------------------------------------------------
 */

/**
 * @deprecated
 */
const validatePutPlanTitleBody_schema = yup.object().shape({
    plan_id: yup.string().required(),
    title: yup.string().required()
});

/**
 * @deprecated
 */
const validatePlanDatafieldBody_schema = yup.object().shape({
    plan_id: yup.string().required(),
    datafield_name: yup.string().required(),
    datafield_type: yup.string().required(),
    datafield_value: yup.lazy((value) => {
        switch (typeof value) {
            case 'object':
                return yup.object<any>().required('Required field').typeError('Required field');
            case 'number':
                return yup.number().required();
            default:
                return yup.string().required();
        }
    })
});

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
    items: yup.array(yup.object()).required()
});

const BodySchemaValidatorMap = {
    'put-plan-title': validatePutPlanTitleBody_schema,
    'put-plan-datafield': validatePlanDatafieldBody_schema,
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
