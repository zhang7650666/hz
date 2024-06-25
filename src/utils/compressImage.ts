import Taro from '@tarojs/taro';

export type compressImageResult = {
  code: number;
  filePath?: string;
  message?: string;
};

/**
 *参数
 * @param oldFilePath 原图地址
 * @param filePath 压缩后的图片地址
 * @param limitSize 图片大小kb
 * @param quality 图片质量
 * @param step 图片质量每次降低多少
 * @param callback 回调
 */
export type compressImageParams = {
  oldFilePath: string;
  filePath?: string;
  limitSize?: number;
  quality?: number;
  step?: number;
  callback: (res: compressImageResult) => void;
};

/**
 *小程序图片压缩到指定大小
 * @param oldFilePath 原图地址
 * @param filePath 压缩后的图片地址
 * @param limitSize 图片大小kb
 * @param quality 图片质量
 * @param step 图片质量每次降低多少
 * @param callback 回调
 */
export const compressImage = (params: compressImageParams) => {
  if (!params.limitSize) {
    params.limitSize = 1024 * 2; // 2M 大小
  }
  if (!params.quality) {
    params.quality = 80; // 图片质量 默认70
  }
  if (!params.step) {
    params.step = 8; // 图片质量每次降低多少
  }

  const path = params.filePath ?? params.oldFilePath!;
  Taro.getFileSystemManager().getFileInfo({
    filePath: path,
    success: async res => {
      if (res.size > 1024 * 1024 * 8) {
        params.callback({
          code: -1,
          filePath: '',
          message: '图片超过了8M'
        });

        return;
      }


      if (res.size > 1024 * params.limitSize!) {
        Taro.compressImage({
          src: params.oldFilePath!,
          quality: params.quality! - params.step!,
          success(result: Taro.compressImage.SuccessCallbackResult) {
            const data: compressImageParams = {
              oldFilePath: params.oldFilePath!,
              filePath: result.tempFilePath,
              limitSize: params.limitSize,
              quality: params.quality! - params.step!,
              step: params.step,
              callback: params.callback
            };

            compressImage(data);
          }
        });
      } else {
        const newPath = params.filePath ?? params.oldFilePath!;
        params.callback({
          code: 200,
          filePath: newPath,
          message: 'success'
        });
      }
    },
    fail(res) {
      params.callback({
        code: -1,
        filePath: '',
        message: res.errMsg
      });
    }
  });
};
