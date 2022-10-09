import { Budget } from '@npg-types';
import uniqid from 'uniqid';

const MONTHS = ['JAN', 'FEB', 'MARCH', 'APRIL', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
const YEARS = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];

const USERS = ['10000001', '10000002', '10000003', '10000004', '10000005'];

// const _randomRange = (min: number, max: number) => {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// };
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
