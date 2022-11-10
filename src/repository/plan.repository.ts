import { IPaginatedPlanDocument, ISummaryPlan } from '../interfaces/IPlan';
import mongo from '../lib/npg-mongo';

/**
 *
 */
const COLLECTION_NAME = 'plans';

/**
 * Simple will fetch user's plan with pagination
 * @param userId
 */
const queryPaginatedUserPlans = async (userId: string, offset: number, limit: number): Promise<IPaginatedPlanDocument> => {
    const DB = mongo.getDB();

    const collection = DB.collection(COLLECTION_NAME);

    const cursor = collection.aggregate([
        {
            $facet: {
                results: [
                    {
                        $match: {
                            owner_id: userId
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            title: 1,
                            col: 1,
                            net_income: 1,
                            asm_amount: 1,
                            asm_percent: 1,
                            created_at: 1,
                            updated_at: 1,
                            status: 1,
                            health_status: 1
                        }
                    },
                    {
                        $skip: offset
                    },
                    {
                        $limit: limit
                    }
                ],
                metadata: [
                    {
                        $group: {
                            _id: null,
                            total_counts: {
                                $sum: 1
                            }
                        }
                    }
                ]
            }
        }
    ]);

    const results = await cursor.toArray();
    return results[0] as IPaginatedPlanDocument;
};

export { queryPaginatedUserPlans };
