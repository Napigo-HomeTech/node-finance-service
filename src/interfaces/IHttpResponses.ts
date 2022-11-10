export interface IHTTPBaseResponse<T> {
    code: number;
    data: T;
    status: string;
}

export interface IHTTPPaginatedResponse<T> {
    total_count: number;
    limit: number;
    offset: number;
    page: number;
    lastPage: number;
    results: T[];
}
