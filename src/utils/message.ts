import { showToast } from '@tarojs/taro';

export const Message = {
  info: (msg: string, duration: number = 1500) => {
    showToast({
      title: msg,
      icon: 'none',
      duration
    });
  },
  success: (msg: string, duration: number = 1500) => {
    showToast({
      title: msg,
      icon: 'success',
      duration
    });
  },
  error: (msg: string, duration: number = 1500) => {
    showToast({
      title: msg,
      icon: 'error',
      duration
    });
  }
};
