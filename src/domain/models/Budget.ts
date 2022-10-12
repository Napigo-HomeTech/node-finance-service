import { string } from 'joi';
import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
    budget_id: { require: true, default: '' },
    revision: { type: String, require: true },
    items: { type: Object, default: {} },
    capital_amount: { type: Number, default: 0 },
    owner: { type: string, require: true }
});

export default mongoose.model('budgets', BudgetSchema);
