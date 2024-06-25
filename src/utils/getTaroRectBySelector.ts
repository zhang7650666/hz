import Taro from '@tarojs/taro';

export interface RectTaro {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

/**
  获取元素的大小及其相对于视口的位置，等价于 Element.getBoundingClientRect。
  width 宽度	number
  height 高度	number
  top	顶部与视图窗口左上角的距离	number
  left	左侧与视图窗口左上角的距离	number
  right	右侧与视图窗口左上角的距离	number
  bottom	底部与视图窗口左上角的距离	number
 */
export function getTaroRectBySelector(selector: string) {
  return new Promise<RectTaro | undefined>(resolve => {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      const t = document ? document.querySelector(selector) : '';
      if (t) {
        resolve(t?.getBoundingClientRect());
      } else {
        resolve(undefined);
      }
    } else {
      const query = Taro.createSelectorQuery();
      query
        .select(selector)
        .boundingClientRect()
        .exec((rects: any) => {
          if (rects[0]) {
            resolve(rects[0]);
          } else {
            resolve(undefined);
          }
        });
    }
  });
}
