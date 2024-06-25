import Taro from '@tarojs/taro';
import { formatQueryString, Message, getAuthToken } from '@/utils';
import type { CustomOptions } from './type';

const TIMEOUT = 30 * 1000;

export function http<T = any>(url: string, options: CustomOptions): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const {
      params,
      method,
      timeout = TIMEOUT,
      ...rest
    } = options;
    let { headers = {} } = options;
    let { data } = options;

    let queryString = '';
    if (params) {
      if (method === 'GET') {
        data = { ...data, ...params };
      } else {
        queryString = `?${formatQueryString(params).toString()}`;
      }
    }

    const requestUrl = process.env.TARO_APP_BASE_URL + url + queryString;

    // 在请求头中添加 token
    const token = getAuthToken();
    if (token) {
      headers = { ...headers, Satoken: token };
    }

    headers = {
      ...headers,
    };

    Taro.request<T>({
      url: requestUrl,
      method,
      data,
      header: headers,
      timeout,
      ...rest,
      success: (res: any) => {
        if (res.statusCode !== 200) {
          Message.error('数据异常', 3000);
          return reject(res);
        }


        const { code, message } = res.data;


        if (message !== 'success' && code !== 200) {
          let errorMsg = '';
          switch (message) {
            case '登录过期':
              // TODO: 登录
              return resolve(res.data);
          }
          Message.error(message);
        }

        return resolve(res.data);
      },
      fail: err => {
        Message.error('网络异常请稍后重试');
        console.error(err);
        reject(err);
      }
    });
  });
}
