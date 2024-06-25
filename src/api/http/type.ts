export type CustomOptions = Omit<Taro.request.Option, 'url'> & {
  errorMessageMode?: 'toast' | 'none';
  [key: string]: any;
};

export enum ResultEnum {
  SUCCESS = 'success',
  ERROR = 'fail',
  TIMEOUT = 'timeout'
}
