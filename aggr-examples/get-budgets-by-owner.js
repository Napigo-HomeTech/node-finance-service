import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
    {
        $project: {
            _id: 0,
            budget_id: 1,
            revision: 1,
            capital_amount: 1,
            owner: 1
        }
    },
    {
        $match: {
            owner: '10000004'
        }
    },
    {
        $skip: 0
    },
    {
        $limit: 20
    }
];

const client = await MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
const coll = client.db('npg-finance-db').collection('budgets');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();
