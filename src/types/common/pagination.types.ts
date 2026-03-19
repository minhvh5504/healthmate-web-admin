/**
 * Pagination Metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Generic Paginated Response
 */
export interface PaginatedResponse<T> {
  meta: PaginationMeta;
  items: T[];
}
