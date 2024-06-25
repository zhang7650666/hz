import { getWindowInfo } from '@tarojs/taro';

/** 底部安全区域高度 */
export function getSafeAreaBottom() {
  const { screenHeight, safeArea } = getWindowInfo();

  return screenHeight - (safeArea?.bottom ?? 0);
}

/**
 * 底部安全区域 + tab-bar 高度
 */
export function geTabBarHeight() {
  return 50 + getSafeAreaBottom();
}
