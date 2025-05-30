interface Option {
  id: number;
  text: string;
}
type Options = Option[];

interface PageParams {
  isPaging?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

interface PageResult<T> {
  isPaging: boolean;
  pageNumber: number;
  pageSize: number;
  total: number;
  list: T[];
}

interface LapiReturnT<T> {
  success: boolean;
  data: T;
  message: string;
}