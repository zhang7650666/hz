import { getEnv, getWindowInfo } from '@tarojs/taro';

/**
 * 状态栏高度
 */
export function getStatusBarHeight() {
  const env = getEnv();
  const windowInfo = env === 'WEB' ? { statusBarHeight: 0 } : getWindowInfo();
  return windowInfo.statusBarHeight || 0;
}

/**
 * 获取可使用窗口高度
 */
export function getPageHeight() {
  const env = getEnv();
  const windowInfo = env === 'WEB' ? { windowHeight: 0 } : getWindowInfo();
  return windowInfo.windowHeight || 0;
}
