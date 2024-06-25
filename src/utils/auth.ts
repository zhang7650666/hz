import Taro from '@tarojs/taro';

const AUTH_TOKEN_KEY = `auth_token`;

/**
 * 获取 token
 */
export function getAuthToken() {
  try {
    return Taro.getStorageSync<string>(AUTH_TOKEN_KEY);
  } catch (err) {
    console.error(err);
    return '';
  }
}

/**
 * 存储登录 token
 */
export function storeAuthToken(token: string) {
  Taro.setStorageSync(AUTH_TOKEN_KEY, token);
}

/**
 * 移除登录 token
 */
export function removeAuthToken() {
  Taro.removeStorageSync(AUTH_TOKEN_KEY);
}

