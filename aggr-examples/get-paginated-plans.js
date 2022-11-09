import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
    {
        $match: {
            owner_id: 'hanafi'
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
        $skip: 0
    },
    {
        $limit: 20
    }
];

const client = await MongoClient.connect('mongodb://NPG_ROOT_DB:NPG_ROOT_DP_PASS_2022@localhost:27017/?authMechanism=DEFAULT', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const coll = client.db('npg-finance-db').collection('plans');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();
