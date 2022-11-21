import { faker } from '@faker-js/faker';
import { EnumHealthStatus, EnumPlanStatus, IDocPlan } from '../src/interfaces/IPlan';

const _getPercentage = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const seedPlans = async (count: number) => {
    const plans: IDocPlan[] = Array(count)
        .fill(0)
        .map(() => ({
            owner_id: 'Znjo2LD3ewRIZyywvlqIlqZlHMh1',
            title: faker.random.words(2),
            net_income: Number.parseFloat(faker.finance.amount(1000, 10000)).toString(),
            esm_percent: _getPercentage(20, 100),
            esm_amount: Number.parseFloat(faker.finance.amount(1000, 10000)).toString(),
            asm_percent: _getPercentage(20, 100),
            asm_amount: Number.parseFloat(faker.finance.amount(1000, 10000)).toString(),
            col: Number.parseFloat(faker.finance.amount(1000, 10000)).toString(),
            created_at: faker.date.future().toISOString(),
            updated_at: null,
            deleted: 0,
            status: EnumPlanStatus.draft,
            active_on: null,
            health_status: EnumHealthStatus.healthy,
            categories: [],
            items: []
        }));

    return plans;
};
