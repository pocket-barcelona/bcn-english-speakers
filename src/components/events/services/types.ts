/** Generic type for fetch API data */

/** Api returns 200, success or data */
type SuccessfulResponse<T> = {
  code: number;
  data: T;
};
/** Api returns error */
type SuccessfulResponseError<T> = {
  code: number;
  message: string;
  error: boolean;
  errorCode?: string;
};

export type ApiCall<T = unknown> = SuccessfulResponse<T> &
  SuccessfulResponseError<T>;

