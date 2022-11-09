import { MongoClient } from 'mongodb';
import 'dotenv/config';
import { logger } from '../npg-logger';
import { AppConfig } from '../../configs/app-config';

/**
 * The Mongo client container for the entire services
 */
var client: MongoClient;

const init = async () => {
    const URI = `mongodb://${AppConfig.DATABASE.USER}:${AppConfig.DATABASE.PASSWORD}@${AppConfig.DATABASE.DOMAIN}:${AppConfig.DATABASE.PORT}?authMechanism=DEFAULT`;
    const DATABASE = process.env.DATABASE_NAME || 'npg-account-db';

    client = new MongoClient(URI);
    try {
        const doc = await client.db(DATABASE).command({ ping: 2 });

        /**
         * Test out if server can fetch all the available collections in
         * the database, if auth failed, tghis will throw error
         */
        const collections = await client.db(DATABASE).collections();
        logger.info(`Connected successfully to ${DATABASE} database with response : ${JSON.stringify(doc)}`);
    } finally {
        await client.close();
    }
};

const teardown = async () => {
    await client.close();
};
const getDB = async (): Promise<MongoClient> => {
    if (client) {
        return Promise.resolve(client);
    }
    await init();
    return client;
};

export default {
    init,
    teardown,
    getDB
};
