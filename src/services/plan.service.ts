import { transformPaginatedBasedHTTPResponse } from '../transformers/httpresponse.transformers';
import { insertPlan, queryPaginatedUserPlans } from '../repository/plan.repository';
import { EnumPlanStatus, IDocPlan } from '../interfaces/IPlan';
import { ObjectId } from 'mongodb';
import moment from 'moment';

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
        net_income: 0,
        esm_percent: 0,
        esm_amount: 0,
        asm_percent: 0,
        asm_amount: 0,
        col: 0,
        created_at: moment().format('DD MM YYYY - HH:mm:SS a').toString(),
        updated_at: null,
        deleted: 0,
        status: EnumPlanStatus.draft,
        active_on: null,
        health_status: null
    };

    return await insertPlan(planDoc);
};
export { getPaginatedUserPlans, createPlan };
