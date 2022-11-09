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
    net_income: number;
    esm_percent: number;
    esm_amount: number;
    asm_percent: number;
    asm_amount: number;
    col: number;
    created_at: string;
    updated_at: null | string;
    deleted: 0 | 1;
    status: EnumPlanStatus;
    active_on: null | string;
    health_status: EnumHealthStatus;
}

export interface ISummaryPlan {
    _id: ObjectId;
    title: string;
    col: number;
    net_income: number;
    asm_percent: number;
    asm_amount: number;
    created_at: string;
    updated_at: null | string;
    status: EnumPlanStatus;
    health_status: EnumHealthStatus;
}
