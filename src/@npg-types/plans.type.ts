export type Plan = {
    pid: string;
    title: string;
    in_use: boolean;
    income: number;
    col: number;
    asm: number;
    created_at: string;
    asm_health: ASMHealth;
};

export type ASMHealth = 'healthy' | 'warning' | 'danger';
