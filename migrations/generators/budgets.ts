import { Budget } from '@npg-types';
import uniqid from 'uniqid';
import fs from 'fs';
import _ from 'lodash';

const MONTHS = ['JAN', 'FEB', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
const YEARS = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];
const USERS = ['10000001', '10000002', '10000003', '10000004', '10000005'];
/**
 *
 * @param count
 * @returns
 */
export const generate = (count: Number = 10) => {
    let datas: Budget[] = [];

    USERS.forEach((userId: string) => {
        YEARS.forEach((year: string) => {
            MONTHS.forEach((month: string) =>
                datas.push({
                    budget_id: uniqid.time(),
                    revision: `${month}-${year}`,
                    items: {
                        [uniqid()]: {
                            item_name: '',
                            amount: 2456.3,
                            type: 'debt',
                            status: 'pending'
                        }
                    },
                    capital_amount: 7500,
                    owner: userId
                })
            );
        });
    });

    return datas;
};

const generateUserBudget = (count: number = 10) => {
    let datas: Budget[] = [];

    let monthPointer = 0;
    let yearPointer = 0;

    let i = 0;
    for (; i < count; i++) {
        const mth = MONTHS[monthPointer];
        const year = YEARS[yearPointer];
        datas.push({
            budget_id: uniqid.time(),
            revision: `${mth}-${year}`
        });

        if (monthPointer === MONTHS.length - 1) {
            monthPointer = 0;
            yearPointer++;
        } else {
            monthPointer++;
        }
    }

    return datas;
};

/**
 * Generate the Data to JSON files
 */

const storeData = (counts: number, limit: number) => {
    const data = generateUserBudget(counts);

    let queues = _.chunk(data, limit);
    queues.forEach((chunk: Budget[], index) => {
        let dataResponse: Record<any, any> = {
            code: 200,
            data: {
                counts: counts,
                limit: limit,
                page: index + 1,
                offset: index * limit,
                budgets: [...chunk]
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

storeData(75, 20);
