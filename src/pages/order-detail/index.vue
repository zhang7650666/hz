<script setup lang="ts">
import { reactive } from 'vue';
import {baseList, serverList} from '@/utils/const';
import imgUrl from '@/assets/images/layout.png';

const photoList = [
  {
    createTime: '2024-01-10',
    desc: 'png格式（保真高，适合打印）',
    imgUrl,
    orderNo: '138253763298475382',
    expireTime: '2024-02-10',
  }
];
const state = reactive({
  photoList, // 订单列表
    baseList,
    serverList
})

const downloadImage = () => {

}

</script>
<template>
  <basic-layout show-tab-bar>
    <custom-navbar title="订单详情" />
    <view class="page-wp">
      <view class="order-tips">
        <add-tips tips="为保护个人隐私，平台只保留近30天的数据，请及时下载和保存" :isShowTips="false"></add-tips>
      </view>
      <!-- 滚动区域 -->
      <view class="cate-content">
        <!-- 列表信息 -->
        <view class="cate-info mgt-0" v-for="item in state.photoList">
          <add-photo-card :photoInfo="item"></add-photo-card>
        </view>
        <!-- 基础服务 -->
        <add-base-info :baseInfo="state.baseList"></add-base-info>
        <!-- 增值服务 -->
        <add-server :serverList="state.serverList" :isClick="false"></add-server>
      </view>
      <view class="cate-footer">
        <add-download @click="downloadImage"></add-download>
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
  padding-bottom: 210rpx;
  background: #F3F7FA;
}
.order-tips {
  padding: 32rpx 32rpx 0rpx 32rpx;
}
.cate-content {
  flex: 1;    /* 很重要 */
  overflow-y:auto; /* 很重要，否则当该内容超过一屏时，尾部区域不会固定 */
  margin: 0rpx 0rpx 32rpx;
  padding: 0rpx 32rpx 60rpx;

}
/* 列表信息 */
.cate-info {
  background: #FFFFFF;
  border-radius: 16rpx;
  // padding: 32rpx;
  box-sizing: border-box;
  margin-top: 32rpx;
  font-size: 32rpx;
  line-height: 48rpx;
}
.mgt-0 {
   margin-top: 0rpx;
}
.cate-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 204rpx;
  background: #FFFFFF;
  box-shadow: 0px 0 20px 0px rgba(41,42,111,0.16);
}
</style>
