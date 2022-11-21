import { ObjectId } from 'mongodb';

export enum EnumHealthStatus {
    healthy = 'HEALTHY',
    warning = 'WARNING',
    danger = 'DANGER'
}
export enum EnumPlanStatus {
    in_queue = 'IN-QUEUE',
    in_used = 'IN-USE',
    draft = 'DRAFT'
}
/**
 * The object type of Plan entity which will be store in the collection 'plans'
 */
export interface IDocPlan {
    _id?: ObjectId;
    owner_id: string;
    title: string;
    net_income: string;
    esm_percent: number;
    esm_amount: string;
    asm_percent: number;
    asm_amount: string;
    col: string;
    created_at: string;
    updated_at: null | string;
    deleted: 0 | 1;
    status: EnumPlanStatus;
    active_on: null | string;
    health_status: EnumHealthStatus | null;
    categories: string[];
    items: PlanItem[];
}

export interface PlanItem {
    name: string;
    category: string;
    amount: number;
}

/**
 * Simplify version of ISummaryPlan interface
 */
export type ISummaryPlan = Pick<
    IDocPlan,
    '_id' | 'title' | 'col' | 'net_income' | 'asm_percent' | 'asm_amount' | 'created_at' | 'updated_at' | 'status' | 'health_status'
>;

export interface IPaginatedPlanDocument {
    results: ISummaryPlan[];
    metadata: [{ _id: any; total_counts: number }];
}

export interface IPaginatedPlansQuery {
    limit: number;
    page: number;
}

export type IPlanFormUpdateRequest = Pick<
    IDocPlan,
    '_id' | 'title' | 'net_income' | 'esm_percent' | 'esm_amount' | 'asm_percent' | 'asm_amount' | 'col' | 'items' | 'updated_at'
>;

/**
 * @deprecated
 */
export interface IPlanTitleUpdateRequest {
    plan_id: string;
    title: string;
}
/**
 * @deprecated
 */
export interface IPlanDateFieldUpdateRequest {
    plan_id: string;
    datafield_name: string;
    datafield_type: string;
    datafield_value: any;
}
