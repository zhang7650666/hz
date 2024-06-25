import Taro from '@tarojs/taro';
const plat_env = Taro.getEnv();

interface oObject {
  [key: string]: any
}

// 获取元素尺寸
export const getBoundingClientRect = (selector: string) => {
  return new Promise(resolve => {
    switch (plat_env) {
      case 'ALIPAY':
        my.createSelectorQuery()
          .select(selector)
          .boundingClientRect()
          .exec(ret => {
            if (ret && ret[0]) {
              resolve(ret[0]);
            }
          });
          default:
          Taro.createSelectorQuery()
            .select(selector)
            .boundingClientRect()
            .exec(ret => {
              if (ret && ret[0]) {
                resolve(ret[0]);
              }
            });
    }
  });
};

// 添加历史记录
const historyLimit = 8;
export const addToHistory = (keyword: string) => {
  const res = Taro.getStorageSync('searchHistory');
  let history = [];
  if (res) {
    history = Array.isArray(res) ? res : [];
  }
  // 防止重复添加
  const pattern = new RegExp(keyword, 'i');
  const isHas = history.length && history.some(keyword => pattern.test(keyword));
  if (!isHas)  {
    history.unshift(keyword)
  }
  // 如果历史数据大于最大限制截取
  if (history.length > historyLimit) {
    history = history.slice(0, 7);
  }
  Taro.setStorageSync('searchHistory', history);
  return history;
};
