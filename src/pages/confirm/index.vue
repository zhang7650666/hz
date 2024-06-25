<script setup lang="ts">
import { reactive } from 'vue';
import { baseList, serverList } from '@/utils/const'
import Taro, { useLoad } from '@tarojs/taro';
import layoutImg from '@/assets/images/layout.png';
import previewImg from '@/assets/images/verify_img.png';
import { NONAME } from 'dns';
import {useAppStore} from '@/store/index';
const appstore = useAppStore();
const state = reactive({
  layoutImg,
  previewImg,
  baseList: baseList, // 基础服务
  serverList, // 增值服务列表
  basicVisible: false,
  downVisible: false,
  progress: 0,
})

// 关闭弹框
const handlePopupClose = (type) => {
  state[`${type}Visible`] = false;
};

// 观看广告
const wathAd = () => {
  Taro.showToast({ title: '激励视频未接入，先保存相片', icon: 'none' })
}

// 加载下载进度动画
const loadDownAnimation = () => {
  state.progress = 0;
  let timer = setInterval(() => {
    if (state.progress > 98) {
      clearInterval(timer);
    }
    state.progress = state.progress + 1;
  }, 10)
}

const showAdPopupHandler = () => {
  // state.basicVisible = true

  appStore.saveImage(state.resultData.layoutUrl);
 
  // Taro.saveImageToPhotosAlbum({

  // })
  // Taro.getSetting({
  //   success: function (res) {
  //     // 未授权相册
  //     if (!res.authSetting['scope.writePhotosAlbum']) {
  //       Taro.authorize({
  //         scope: 'scope.writePhotosAlbum',
  //         success() {
  //           state.downVisible = true;
  //         },
  //         fail(){
  //           Taro.showToast({title: '未授权相册'});
  //         }
  //       })
  //     }
  //   },
  //   fail: (error) => {
  //     console.log('error', error);
  //   }
  // })
}

useLoad(() => {
  loadDownAnimation();
})
</script>
<template>
  <basic-layout show-tab-bar>
    <custom-navbar title="订单确认" />
    <view class="page-wp">
      <!-- 滚动区域 -->
      <view class="cate-content">
        <add-tips tips="下载的为去水印高清版本！"></add-tips>
        <!-- 图片 -->
        <view class="cate-info">
          <view class="img-box">
            <image mode="widthFix" :src="state.previewImg" class="preview-img"></image>
            <image mode="widthFix" :src="state.layoutImg" class="verify-img"></image>
          </view>
        </view>
        <!-- 基础服务 -->
        <add-base-info :baseInfo="state.baseList"></add-base-info>
        <!-- 增值服务 -->
        <add-server :serverList="state.serverList"></add-server>
      </view>
      <view class="cate-footer">
        <add-download @click="showAdPopupHandler"></add-download>
      </view>
      <!-- 观看广告弹框 -->
      <nut-popup v-model:visible="state.basicVisible" position="bottom" closeable round :style="{ height: '30%' }">
        <view style="padding: 12px">
          <view class="pop-title">完成广告观看，可免费下载</view>
          <view class="pop-btn-wp">
            <view class="pop-btn-cancel" @click="() => handlePopupClose('basic')">取消</view>
            <view class="pop-btn-sure" @click="wathAd">确定</view>
          </view>
        </view>
      </nut-popup>
      <nut-popup v-model:visible="state.downVisible" position="bottom" closeable round>
        <view class="down-pop-wp">
          <!-- <view class="down-pop-close">
            <ant-icon type="CloseOutline" data-type="down" style="font-size: 24px;" @click="handlePopupClose" />
          </view> -->
          <view class="down-pop-banner">
            <custom-swiper :list="[]"></custom-swiper>
          </view>
          <view class="down-pop-progress">
            <view class="progerss-num">下载进度（1/10）</view>
            <nut-progress :percentage="state.progress" text-color="green" />
            <view class="down-complete" v-if="state.progress == 100">完成</view>
          </view>
          <add-tips tips="下载时请勿退出或关闭，以免下载失败！"></add-tips>
        </view>
      </nut-popup>
    </view>
  </basic-layout>
</template>

<style lang="scss">
.page-wp {
  width: 100%;
  height: 100vh;
  /* 很重要，如果设置成100%，页面内容过多时不会固定 */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 32rpx 32rpx 220rpx;
  background: #F3F7FA;

}

.cate-content {
  flex: 1;
  /* 很重要 */
  overflow-y: auto;
  /* 很重要，否则当该内容超过一屏时，尾部区域不会固定 */
  margin: 32rpx 0rpx;
  // padding: 0rpx 32rpx;

  .img-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .preview-img {
      width: 178rpx;
    }

    .verify-img {
      width: calc(100% - 208rpx);
      display: block;
    }
  }
}

/* 规格信息 */
.cate-info {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
  box-sizing: border-box;
  margin-top: 32rpx;
}

.cate-info .title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  line-height: 44rpx;
  padding-bottom: 20rpx;
}

// .verify-img {
//   width: 622rpx;
// }


/* 弹框样式 */
.pop-title {
  font-size: 32rpx;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.9);
  line-height: 44rpx;
  padding-top: 80rpx;
  text-align: center;
}

.pop-btn-wp {
  padding-top: 60rpx;
  display: flex;
  justify-content: center;
}

.pop-btn-cancel {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8rpx;
  font-size: 34rpx;
  font-weight: 500;
  color: #336CFF;
  line-height: 48rpx;
  padding: 16rpx 84rpx;
  margin-right: 32rpx;
}

.pop-btn-sure {
  background: #336CFF;
  border-radius: 8rpx;
  font-size: 34rpx;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 48rpx;
  padding: 16rpx 84rpx;
}

/* 下载弹框样式 */
.down-pop-wp {
  padding: 32rpx 32rpx 80rpx 32rpx;
}

.down-pop-close {
  display: flex;
  justify-content: end;
}

.down-pop-banner {
  padding: 32rpx 0rpx;
}

.progerss-num {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  line-height: 44rpx;
  padding-bottom: 26rpx;
}

.down-pop-progress {
  margin-bottom: 32rpx;
  position: relative;
}

.down-complete {
  position: absolute;
  right: 0rpx;
  background: #fff;
  top: 66rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #07C160;
  line-height: 44rpx;
  padding-right: 5px;
}

.cate-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 204rpx;
  overflow: hidden;
  background-color: #fff;
  // padding: 32rpx
}
</style>
