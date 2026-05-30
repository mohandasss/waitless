export const buildPaginationResponse = <T>(
  data: T[],
  pageNumber: number,
  pageSize: number,
  totalRecords: number
) => {
  return {
    data,
    pagination: {
      pageNumber,
      pageSize,
      totalRecords,
      totalPages: Math.ceil(totalRecords / pageSize),
    },
  };
};