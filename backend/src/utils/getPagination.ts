export const getPagination = (
  pageNumber: number,
  pageSize: number
) => ({
  skip: (pageNumber - 1) * pageSize,
  take: pageSize,
});