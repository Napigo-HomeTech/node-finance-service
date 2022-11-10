import { Db, MongoClient } from 'mongodb';
import 'dotenv/config';
import { logger } from '../npg-logger';
import { AppConfig } from '../../configs/app-config';

/**
 * The Mongo client container for the entire services
 */
var client: MongoClient;
var db: Db;

const init = async () => {
    const URI = `mongodb://${AppConfig.DATABASE.user}:${AppConfig.DATABASE.password}@${AppConfig.DATABASE.domain}:${AppConfig.DATABASE.port}?authMechanism=DEFAULT`;
    const DATABASE = process.env.DATABASE_NAME || 'npg-account-db';

    client = new MongoClient(URI);
    try {
        db = client.db(DATABASE);
        const doc = db.command({ ping: 1 });
        /**
         * Test out if server can fetch all the available collections in
         * the database, if auth failed, tghis will throw error
         */
        await client.db(DATABASE).collections();
        logger.info(`Connected successfully to ${DATABASE} database with response : ${JSON.stringify(doc)}`);
    } catch (err: any) {
        logger.error(err.message);
        await client.close();
    }
};

const teardown = async () => {
    await client.close();
};

const getDB = (): Db => {
    if (db) {
        return db as Db;
    }
    throw new Error('DB from mongo client is not yet initialized');
};

export default {
    init,
    teardown,
    getDB
};
