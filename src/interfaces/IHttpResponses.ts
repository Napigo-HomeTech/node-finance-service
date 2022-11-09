export interface IHTTPPaginatedResponse<T> {
    total_count: number;
    limit: number;
    off_set: number;
    page: number;
    results: T[];
}
