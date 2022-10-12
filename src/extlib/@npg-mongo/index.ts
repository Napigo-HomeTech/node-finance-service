import { logger } from '../@npg-logger';
import mongoose from 'mongoose';

/**
 *
 */
const init = async () => {
    const URI = process.env.MONGO_BASE_URI || 'mongodb://localhost:27017';
    const DATABASE = process.env.DATABASE || 'npg-finance-db';

    try {
        await mongoose.connect(URI, { dbName: DATABASE, serverSelectionTimeoutMS: 3000, socketTimeoutMS: 5000 });
        logger.info(`Connected successfully to ${DATABASE} database`);
    } catch (err: any) {
        throw new Error("Couldn't connect to mongodb, please check if the database is live and online");
    }
};

const teardown = async () => {
    await mongoose.connection.close();
};

export default {
    init,
    teardown
};
