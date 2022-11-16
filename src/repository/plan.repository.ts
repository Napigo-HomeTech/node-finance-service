import { ObjectId } from 'mongodb';
import { IDocPlan, IPaginatedPlanDocument, ISummaryPlan } from '../interfaces/IPlan';
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

/**
 *
 * @param plan_id
 */
const findPlan = async (plan_id: string): Promise<IDocPlan> => {
    const _id = new ObjectId(plan_id);
    const db = mongo.getDB();
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.findOne({ _id });
    return result as IDocPlan;
};

const insertPlan = async (plan: IDocPlan): Promise<string> => {
    const db = mongo.getDB();
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.insertOne(plan);

    if (result.acknowledged) {
        return result.insertedId.toString();
    }
    throw new Error('Plan failed to insert');
};

const findOneAndUpdatePlan = async (id: string, keyName: string, value: string): Promise<string> => {
    const _id = new ObjectId(id);
    const db = mongo.getDB();
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.findOneAndUpdate(
        { _id },
        {
            $set: {
                title: value
            }
        }
    );
    if (result.ok === 0) {
        throw new Error(`Failed to update Title for the plan, ${id}`);
    }
    return result.value?._id.toString() as string;
};

export { queryPaginatedUserPlans, insertPlan, findPlan, findOneAndUpdatePlan };
