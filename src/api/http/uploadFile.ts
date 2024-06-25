import Taro from '@tarojs/taro';
import { getAuthToken, Message } from '@/utils';
import { ResultEnum } from '@/utils/request/type';

type Params = {
  filePath: string;
  requestUrl: string;
};

/** 文件上传 */
export const uploadFileToServer = ({ filePath, requestUrl }: Params) => {
  return new Promise<any>((resolve, reject) => {
    Taro.uploadFile({
      url: requestUrl,
      filePath,
      name: 'file',
      header: {
        Satoken: getAuthToken(),
      },
      success: res => {
        const data = JSON.parse(res.data);
        if (data.message !== ResultEnum.SUCCESS) {
          Message.info(data.message || '上传失败');
          reject(new Error(data.message || '上传失败'));
        }
        resolve(data.item);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};
