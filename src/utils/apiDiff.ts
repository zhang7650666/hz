import type { SuccessCallbackResult } from '@tarojs/taro';
import Taro from '@tarojs/taro';
const plat_env = Taro.getEnv();

export const loginFn = () => {
  switch (plat_env) {
    // 支付宝
    case 'ALIPAY':
      // alipayTradePay(tradeNO, successCb, failCb);
      break;
    default:
      // (option?: Option) => Promise<SuccessCallbackResult>
      Taro.login({
        success(res: SuccessCallbackResult) {
          if (res?.code) {
            // 发起网络请求
            Taro.request({
              url: 'https://test.com/onLogin',
              data: {
                code: res.code
              }
            });
          } else {
            // console.log(`登录失败！${res.errMsg}`);
          }
        }
      });
      break;
  }
};
