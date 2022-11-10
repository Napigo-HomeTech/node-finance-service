import { transformPaginatedBasedHTTPResponse } from '../transformers/httpresponse.transformers';
import { queryPaginatedUserPlans } from '../repository/plan.repository';

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

export { getPaginatedUserPlans };
