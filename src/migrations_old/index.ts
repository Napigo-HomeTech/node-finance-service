import { MigrationInterface } from 'mongo-migrate-ts';
import { Db } from 'mongodb';
import { faker } from '@faker-js/faker';
import uniqid from 'uniqid';
import { Budget } from 'src/@npg-types/budget.type';
import moment from 'moment';

const MONTHS = ['JAN', 'FEB', 'MARCH', 'APRIL', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
const YEAR = '2022';

const USERS = ['10000001', '10000002', '10000003'];

export class NpgMongoSeeding implements MigrationInterface {
    async up(db: Db): Promise<any> {
        const collection = await db.createCollection('budgets');

        let budgets = [];
        // generate data for budgets
        const budget: Budget = {
            budget_id: uniqid.time(),
            revision: MONTHS[Math.random() * (MONTHS.length - 0) + 0],
            items: {
                [uniqid()]: {
                    item_name: '',
                    amount: 0.2545,
                    type: '',
                    status: ''
                }
            },
            capital_amount: 0,
            owner: USERS[Math.random() * (USERS.length - 0) + 0]
        };
        budgets.push(budget);
        await collection.insertMany(budgets);
    }

    async down(db: Db): Promise<any> {
        await db.dropCollection('budgets');
    }
}
