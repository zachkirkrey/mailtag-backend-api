export type ErrorObject = {
  error: true;
  message: string;
  data?: null;
};

export type SuccessObject = {
  error: false;
  data: unknown;
};

export type DefaultReturnType = ErrorObject | SuccessObject;

export type PaginationObject = {
  data: unknown[];
  totalCount: number;
};

export type JWT_OBJECT = {
  id: number;
  expiresAt: string;
};

export interface Pagination {
  limit: number;
  offset: number;
  count: number;
}
