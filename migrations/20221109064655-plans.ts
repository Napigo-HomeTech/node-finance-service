import { Db } from 'mongodb';
import { seedPlans } from '../seeds/plans.seed';

module.exports = {
    async up(db: Db, _: any) {
        const datas = await seedPlans(2000);
        await db.collection('plans').insertMany(datas);
    },

    async down(db: Db, _: any) {
        db.dropCollection('plans');
    }
};
