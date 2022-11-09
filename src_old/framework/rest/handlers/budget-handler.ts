import { RouterContext } from 'koa-router';

export const getBudgetsHandler = async (ctx: RouterContext) => {
    const { id } = ctx.params;
};
export const getBudgetById = async (ctx: RouterContext) => {
    const { id } = ctx.params;
};
export const postBudgetsHandler = async (ctx: RouterContext) => {};
