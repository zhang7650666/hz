import type { StyleValue } from 'vue';
import { getMenuButtonBoundingClientRect, getWindowInfo } from '@tarojs/taro';
import { getStatusBarHeight } from './getStatusBarHeight';

type Options = {
  /** 是否忽略小程序的胶囊按钮, 不忽略的话， 会把宽度设置为胶囊按钮的左边距
   * @default true
   */
  ignoreMenuButton?: boolean;
};

/**
 * 导航栏 navbar 样式
 * @link 参考自 https://developers.weixin.qq.com/s/KYwhUAm57Ar1
 */
export function getNavigationBarStyle({ ignoreMenuButton = true }: Options): StyleValue {
  const statusBarHeight = getStatusBarHeight();
  const menuRect = getMenuButtonBoundingClientRect();
  const sysInfo = getWindowInfo();

  let width = sysInfo.windowWidth;
  if (!ignoreMenuButton) {
    width = menuRect.left;
  }

  const height = 2 * (menuRect.top - statusBarHeight) + menuRect.height;

  const paddingHorizon = sysInfo.windowWidth - (menuRect.left + menuRect.width);
  return {
    width: `${width}px`,
    height: `${height}px`,
    paddingLeft: `${paddingHorizon}px`,
    paddingRight: `${paddingHorizon}px`,
    left: 0,
    top: `${statusBarHeight}px`,
    boxSizing: 'border-box'
  };
}
