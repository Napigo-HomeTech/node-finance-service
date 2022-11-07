import { Plan } from '@npg-types';
import uniqid from 'uniqid';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import _ from 'lodash';
import moment from 'moment';

const health = ['healthy', 'warning', 'danger'];

export const generate = (planCount: number = 10) => {
    const datas: Plan[] = [];
    Array(planCount)
        .fill(0)
        .forEach((_, index) => {
            datas.push({
                pid: uniqid.time(),
                title: faker.lorem.words(2),
                in_use: index === 0,
                income: Number.parseFloat(faker.finance.amount()),
                col: Number.parseFloat(faker.finance.amount()),
                asm: Number.parseFloat(faker.finance.amount()),
                created_at: moment().toISOString(),
                asm_health: 'healthy'
            });
        });

    return datas;
};

const storeData = (count: number = 100, limit: number = 20) => {
    const data = generate(count);

    let queues = _.chunk(data, limit);

    queues.forEach((chunk: Plan[], index) => {
        let dataResponse: Record<any, any> = {
            code: 200,
            data: {
                counts: count,
                limit: limit,
                page: index + 1,
                offset: index * limit,
                plans: [...chunk]
            },
            status: 'SUCCESS'
        };

        fs.writeFile(`./data-${index + 1}.json`, JSON.stringify(dataResponse), (err) => {
            if (err) {
                console.log('Error writing file', err);
            } else {
                console.log('JSON data is written to the file successfully');
            }
        });
    });
};

storeData(200, 50);
