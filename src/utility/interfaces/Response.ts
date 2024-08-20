export interface IResponse<T> {
  token: string;
  succeeded: boolean;
  status: number;
  message: string;
  data: T;
  type?: string;
}
