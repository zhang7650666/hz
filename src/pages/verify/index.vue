<template>
   <basic-layout show-tab-bar>
    <custom-navbar title="规格信息" />
   
    <view class="page-wp">
    <!-- 滚动区域 -->
    <view class="cate-content">
      <!-- banner -->
      <custom-swiper :list="[]"></custom-swiper>
      <!-- 图片 -->
      <view class="cate-info">
        <image mode="widthFix" :src="appStore.selectImageUrl" class="verify-img"></image>
      </view>
      <!-- 检测列表 -->
      <view class="cate-info">
          <view class="verify-box" v-if="state.isVerifyFail">
              <image mode="widthFix" :src="errIcon" class="verify-icon"></image>
              <text class="verify-desc">照片不合格，请重新上传 </text>
          </view>
          <view class="verify-box" v-for="item in state.verifyList">
              <image mode="widthFix" :src="checkedIcon" class="verify-icon"></image>
              <text class="verify-desc">{{item}}</text>
          </view>
      </view>
    </view>
    <view class="cate-footer">
      <add-footer :isAgain="true" :query="state.query"></add-footer>
    </view>
  </view>
</basic-layout>
</template>
<script setup lang="ts">
  import { reactive } from 'vue';
  import checkedIcon from '@/assets/images/question.png';
  import errIcon from '@/assets/images/err.png';
  import verifyImg from '@/assets/images/verify_img.png';
  import Taro, {useLoad, useReady} from '@tarojs/taro';
  import {useAppStore} from '@/store/index';
  import {inchUploadApi} from '@/api/hz/index';
  import qs from 'qs';
  const requestUrl = process.env.TARO_APP_BASE_URL;

const appStore = useAppStore();

  const verifyList = [
  '检测人像取景范围', 
  '检测图片光线、色彩、清晰度', 
  '检测面部、着装', 
  '优化照片质量'
];

  const state = reactive({
    verifyList: verifyList, // 支持列表
    checkedIcon: checkedIcon, // 选中图标icon
    errIcon: errIcon, // err icon
    verifyImg: verifyImg,
    isVerifyFail: false, // 是否校验失败  true 显示异常信息
    query: {}
  })

  const uploadImage = () => {
    inchUploadApi({
      data: {
        image_path: appStore.selectImageUrl,
        'user_id': 'kthhai',
          'inch_type': 'oneInch',
          'rows': 480,
          'cols': 640,
          'color_type': '',
          'color_bgr': '#0000FF', // '{"blue": "#0000FF", "red": "#FF0000", "white":"#FFFFFF"}',
          dpi: '300',
          file_format: ''
      }
    }).then((res) => {
      console.log('res', res);
    })

    // Taro.uploadFile({
    //   url: requestUrl + '/img/upload',
    //   filePath: appStore.selectImageUrl,
    //   name: '',
    //   formData: {
    //     'user_id': 'kthhai',
    //     'inch_type': 'oneInch',
    //     'rows': 480,
    //     'cols': 640,
    //     'bg_colors': '{"blue": "#0000FF", "red": "#FF0000", "white":"#FFFFFF"}'
    //   },
    //   header: {
    //     'content-type': 'multipart/form-data',
    //   },
    //   success: (res) => {
    //     console.log('res', res)
    //   },
    //   fail: (error) => {
    //     console.log('error', error);
    //   }
    // })
  }

  useLoad((options) => {
    state.query = options;
    //TODO： 上传需要调试，先直接跳到下个界面
   
    uploadImage();
  })

  useReady(() => {
    // Taro.redirectTo({
    //   url: "/pages/modify/index?" + qs.stringify(state.query),
    // })
  })


</script>
<style lang="scss">

.page-wp {
  width: 100%;
  height: 100vh;     /* 很重要，如果设置成100%，页面内容过多时不会固定 */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0rpx;
}
.cate-content {
  flex: 1;    /* 很重要 */
  overflow-y:auto; /* 很重要，否则当该内容超过一屏时，尾部区域不会固定 */
  margin: 32rpx 0rpx;
  padding: 0rpx 32rpx;
}
/* 规格信息 */
.cate-info {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
  box-sizing: border-box;
  margin-top: 32rpx;
}
.verify-img {
  width: 622rpx;
}
/* 支持列表 */
.sup-list {
  display: flex;
}
.sup-box {
  display: flex;
  align-items: center;
  margin-right: 28rpx;
}
.check-img {
  width: 32rpx;
  height: 32rpx;
  background-size: 32rpx 32rpx;
  margin-right: 12rpx;
}
.sup-box .sup {
  height: 40rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #000000;
  line-height: 40rpx;
}



/* 检测列表 */

.verify-box {
  display: flex;
  align-items: center;
  margin-bottom: 28rpx;
}
.verify-box:last-child {
  margin-bottom: 0rpx;
}
.verify-icon{
  width: 32rpx;
  height: 32rpx;
  background-size: 32rpx 32rpx;
}

.verify-desc{
  font-size: 28rpx;
  font-weight: 400;
  color: #000000;
  line-height: 40rpx;
  margin-left: 14rpx;
}
</style>