export interface Pagination {
  skip: number;
  limit: number;
}

const isPositiveInteger = (value: number): boolean =>
  Number.isInteger(value) && value > 0;

// limit = 0 means no limit (same as MongoDB)
export const getPagination = (page?: number, pageSize?: number): Pagination =>
  isPositiveInteger(page) && isPositiveInteger(pageSize)
    ? { skip: (page - 1) * pageSize, limit: pageSize }
    : { skip: 0, limit: 0 };

export const paginateList = <T>(
  list: T[],
  page?: number,
  pageSize?: number
): T[] => {
  const { skip, limit } = getPagination(page, pageSize);
  return limit ? list.slice(skip, skip + limit) : [...list];
};
