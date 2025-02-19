import { PaginatedResult } from '../types/paginated-result';

export class PaginationMapper {
  static getOffset({ page, limit }: { page: number; limit: number }) {
    if (page <= 0 || limit <= 0) return 0;
    return (page - 1) * limit;
  }

  static toResult<T>({
    data,
    limit,
    page,
    total,
  }: {
    data: T;
    page: number;
    total: number;
    limit: number;
  }): PaginatedResult<T> {
    const pages = limit > 0 ? Math.max(Math.ceil(total / limit), 1) : 1;
    return {
      limit,
      page,
      pages,
      total,
      data,
    };
  }
}
