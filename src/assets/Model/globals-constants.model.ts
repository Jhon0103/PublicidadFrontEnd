export interface ApiResponse<T> {
  status: number;
  message: string;
  code: number;
  data: T;
  errors?: any;
}
