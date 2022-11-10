import { IHTTPBaseResponse, IHTTPPaginatedResponse } from 'src/interfaces/IHttpResponses';

/**
 *
 * @param doc
 * @param totalCounts
 * @param limit
 * @param page
 * @param offset
 * @returns
 */
export const transformPaginatedBasedHTTPResponse = (doc: any[], totalCounts: number, limit: number, page: number, offset: number) => {
    const lastPage = Math.ceil(totalCounts / limit);
    const body: IHTTPBaseResponse<IHTTPPaginatedResponse<typeof doc>> = {
        code: 200,
        data: {
            total_count: totalCounts,
            limit,
            page,
            offset,
            lastPage,
            results: [...doc]
        },
        status: 'SUCCESS'
    };
    return body;
};
