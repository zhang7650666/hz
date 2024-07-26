
<script setup lang="ts">

import { reactive } from 'vue';
import {readOrderList} from '@/api/hz/order';
import {useReady} from '@tarojs/taro';
const photoList = [
{
    createTime: '2024-01-10',
    desc: 'png格式（保真高，适合打印）',
    imgUrl: '/assets/images/verify_img.png',
    layoutUrl: '/assets/images/layout.png',
    orderNo: '138253763298475382',
    expireTime: '2024-02-10',
  },

];
const state = reactive({
  photoList,
})

const getOrderList = () => {
  readOrderList({
      data: {
        user_id: 'kthhai',
      }
	}).then((res) => {
    if (res.code == 200) {

      state.photoList = res.data;
    }
  })
}

useReady(() => {
  getOrderList();
})

</script>
<template>
  <basic-layout show-tab-bar>
    <custom-navbar title="我的证件照" />
    <view class="page-wp">
      <add-tips tips="为保护个人隐私，平台只保留近30天的数据，请及时下载和保存" :isShowTips="false" ></add-tips>
      <!-- 滚动区域 -->
      <view class="cate-content">
        <view class="cate-info-list" v-for="item in state.photoList">
            <add-photo-card :photoInfo="item"></add-photo-card>
        </view>
      </view>
    </view>
  </basic-layout>
</template>

<style lang="scss">

.page-wp {
  width: 100%;
  height: 100vh;     /* 很重要，如果设置成100%，页面内容过多时不会固定 */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 32rpx;
  color:  #2F3133;
  background: #F3F7FA;
}
.cate-content {
  flex: 1;    /* 很重要 */
  overflow-y:auto; /* 很重要，否则当该内容超过一屏时，尾部区域不会固定 */
  margin: 0rpx 0rpx 32rpx;
  padding: 8rpx 0 60rpx;

}
/* 列表信息 */
.cate-info-list {
  background: #FFFFFF;
  border-radius: 16rpx;
  // padding: 32rpx;
  box-sizing: border-box;
  margin-top: 32rpx;
  font-size: 32rpx;
  line-height: 48rpx;
}
.cate-info:first-child {
   margin-top: 0rpx;
}
</style>
