import { Category, PlanItem } from 'src/interfaces/IPlan';

/**
 *
 */
const defaultCategories: Category[] = [
    {
        name: 'DEBT & LOANS',
        colorHex: '#C65757'
    },
    {
        name: 'LIABILITIES',
        colorHex: '#387BBA'
    },
    {
        name: 'SUBSCRIPTIONS',
        colorHex: '#A3814E'
    },
    {
        name: 'ADVISORY & SUPPORT',
        colorHex: '#028A89'
    },
    {
        name: 'INSURANCE & INVESTMENT',
        colorHex: '#C657A7'
    },
    {
        name: 'LIFE & EVENTS',
        colorHex: '#66AC4D'
    },
    {
        name: 'SAVING',
        colorHex: '#7B57C6'
    },
    {
        name: 'UN-ASSIGNED',
        colorHex: '#344054'
    }
];

const createDefaultItems = () => {
    const listing = defaultCategories;
    const object: Record<string, PlanItem[]> = {};

    listing.forEach((item: Category) => {
        object[item.name] = [];
    });
    return object;
};

export { defaultCategories, createDefaultItems };
