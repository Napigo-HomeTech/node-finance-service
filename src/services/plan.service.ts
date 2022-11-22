import { transformPaginatedBasedHTTPResponse } from '../transformers/httpresponse.transformers';
import {
    findOneAndUpdatePlan,
    findPlan,
    insertPlan,
    queryPaginatedUserPlans,
    deletePlanById,
    findPlanAndUpdate
} from '../repository/plan.repository';
import { EnumPlanStatus, IDocPlan, IPlanFormUpdateRequest } from '../interfaces/IPlan';
import { ObjectId } from 'mongodb';
import moment from 'moment';
import { defaultCategories } from '../helpers/default-categories';

/**
 *
 * @param userId
 * @param page
 * @param limit
 * @returns
 */
const getPaginatedUserPlans = async (userId: string, page: number, limit: number) => {
    const offset = limit * page - limit;
    const doc = await queryPaginatedUserPlans(userId, offset, limit);

    const total_counts = doc.results.length <= 0 || doc.metadata.length <= 0 ? 0 : doc.metadata[0].total_counts;
    const result = transformPaginatedBasedHTTPResponse(doc.results, total_counts, limit, page, offset);
    return result;
};

/**
 *
 * @param userId
 */
const createPlan = async (userId: string) => {
    const planDoc: IDocPlan = {
        _id: new ObjectId(),
        owner_id: userId,
        title: 'untitled',
        net_income: '0.00',
        esm_percent: 0,
        esm_amount: '0.00',
        asm_percent: 0,
        asm_amount: '0.00',
        col: '0.00',
        created_at: moment().toISOString(),
        updated_at: null,
        deleted: 0,
        status: EnumPlanStatus.draft,
        active_on: null,
        health_status: null,
        categories: defaultCategories,
        items: []
    };

    return await insertPlan(planDoc);
};

/**
 *
 * @param plan_id
 */
const getPlan = async (plan_id: string) => {
    return await findPlan(plan_id);
};

/**
 *
 * @param payload
 */
const updatePlan = async (payload: IPlanFormUpdateRequest) => {
    payload.updated_at = moment().toISOString();
    return await findPlanAndUpdate(payload._id?.toString() as string, payload);
};

const deletePlan = async (plan_id: string) => {
    return await deletePlanById(plan_id);
};

const softDeletePlan = async (plan_id: string) => {
    return await findOneAndUpdatePlan(plan_id, 'deleted', 1);
};

export { getPaginatedUserPlans, createPlan, getPlan, updatePlan, deletePlan, softDeletePlan };
