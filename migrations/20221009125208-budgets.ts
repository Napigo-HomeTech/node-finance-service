import { Db } from 'mongodb';
import { generate } from './generators/budgets';

module.exports = {
    async up(db: Db, _: any) {
        await db.collection('budgets').insertMany(generate(200));
    },

    async down(db: Db, _: any) {
        await db.dropCollection('budgets');
    }
};
