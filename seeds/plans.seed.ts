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
            net_income: Number.parseFloat(faker.finance.amount(1000, 10000)),
            esm_percent: _getPercentage(20, 100),
            esm_amount: Number.parseFloat(faker.finance.amount(1000, 10000)),
            asm_percent: _getPercentage(20, 100),
            asm_amount: Number.parseFloat(faker.finance.amount(1000, 10000)),
            col: Number.parseFloat(faker.finance.amount(1000, 10000)),
            created_at: faker.date.future().toDateString(),
            updated_at: null,
            deleted: 0,
            status: EnumPlanStatus.draft,
            active_on: null,
            health_status: EnumHealthStatus.healthy
        }));

    return plans;
};
