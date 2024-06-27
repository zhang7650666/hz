<template>
  <view class="add-footer">
    <view @click="() =>handleChoosePhoto('camera')">
      <text class="left-btn"  >{{isAgain ? '重新拍摄' : '拍摄'}}</text>
    </view>
    <view @click="() => handleChoosePhoto('album')">
      <text class="right-btn" >{{isAgain ? '重新从相册选择' : '从相册选择'}}</text>
    </view>
</view>
</template>
<script setup lang="ts">
import {reactive, toRefs } from 'vue';
import Taro, {useLoad,useRouter} from '@tarojs/taro';
import {useAppStore} from '@/store/index';
import qs from 'qs';

const appStore = useAppStore();
const porps = defineProps<{
  isAgain?: Boolean,
  query: Object
}>();

const {isAgain} = toRefs(porps);

// 选择相册
const handleChoosePhoto = (type: any) =>{
      console.log('选择相册');
      Taro.chooseImage({
        sourceType: [type],
        sizeType:['original', 'compressed'],
        count: 1,
        success: (res) => {
          // getImageInfo(res);
          appStore.selectImageUrl = res.tempFilePaths[0];
          imgToBase64(res.tempFilePaths[0]);
          Taro.redirectTo({
            url: `/pages/verify/index?${qs.stringify(porps.query)}`,
          })
        },
        fail: (err) => {
          Taro.showToast({title: `选择文件失败: ${err}`, icon: 'none'});
        }
      })
    };
    // 获取图片信息
    const getImageInfo = (imgInfo) => {
      console.log('获取图片信息');
      Taro.getImageInfo ({
        src: imgInfo.tempFilePaths[0],
        success: (res) => {
          const {width, height, path} = res;
          const wMax = 2000;
          const hMax = 2000;
          const isH = width <= height;
          // 图像宽高一条大于2000，就压缩，1：竖 => 以高度压缩；2： 横 => 以宽度压缩
          if (width > wMax || height > hMax) {
            fileCOmpress(imgInfo, isH);
          }
          else {
            imgToBase64(path);
          }
        },
        fail: (err) => {
          Taro.showToast({title: `图片检测异常:${err}`, icon: 'none'});
        },
      });
    };
    // 文件压缩
    const fileCOmpress = (imgInfo, isH) => {
      Taro.compressImage ({
        src: imgInfo.apFilePaths,
        quality: 90,
        ...(isH ? {compressedHeight: 2000} : {compressedWidth: 2000}),
        success (res) {
          appStore.selectImageUrl = res.tempFilePaths[0];
          Taro.redirectTo({
						url: `/pages/verify/index?${qs.stringify(porps.query)}`,
          })
        },
        fail (err) {
          Taro.showToast({title: `压缩文件失败: ${err}`, icon: 'none'});
        },
      });
    };
    // 将图片转成base64
    const imgToBase64 = (filePath: string) => {
      console.log('将图片转成base64', porps.query);
      const fs = Taro.getFileSystemManager();
      fs.readFile({
        filePath: filePath,
        encoding: 'base64',
        success:({ data }) => {
          // const base64 = Taro.arrayBufferToBase64(data);
          appStore.selectImageBase = data;
          Taro.redirectTo({
            url: `/pages/verify/index?${qs.stringify(porps.query)}`,
          })
        },
        fail (err) {
          Taro.showToast({title: `文件转换失败: ${err}`, icon: 'none'});
        },
      });
    }

</script>
<style lang="scss">
.add-footer {
  position:relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 32rpx 88rpx;
  box-sizing: border-box;
  background: #fff;

  // & > view {
  //   width: 50%;
  // }
}
.left-btn {
  width: 240rpx;
  height: 96rpx;
  background: #D6E2FF;
  border-radius: 12rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #336CFF;
  line-height: 96rpx;
  text-align: center;
  margin-right: 30rpx;
  display: block;
}

.right-btn {
  width: 416rpx;
  height: 96rpx;
  background: #336CFF;
  border-radius: 12rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #FFF;
  line-height: 96rpx;
  text-align: center;
  display: block;
}

</style>
