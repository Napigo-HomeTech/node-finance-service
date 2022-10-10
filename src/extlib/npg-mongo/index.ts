import mongoose from 'mongoose';

const init = async () => {
    const URI = process.env.MONGO_BASE_URI || 'mongodb://localhost:27017';
    const DATABASE = process.env.DATABASE || 'npg-finance-db';

    try {
        await mongoose.connect(URI, { dbName: DATABASE });
        console.log(`Connected successfully to ${DATABASE} database`);
    } catch (err: any) {
        await mongoose.connection.close();
    }
};

const teardown = async () => {
    await mongoose.connection.close();
};

export default {
    init,
    teardown
};
