type BudgetItem = {
    item_name: string;
    amount: Number;
    type: string;
    status: string;
};

export interface Budget {
    budget_id: string;
    revision: string;
    items: Record<string, BudgetItem>;
    capital_amount: Number;
    owner: string;
}
