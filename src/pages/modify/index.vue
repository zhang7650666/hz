<template>
  <basic-layout show-tab-bar>
    <custom-navbar title="换装" />
    <view class="page-wp">
      <!-- 滚动区域 -->
      <view class="cate-content">
        <view>
          <!-- tab切换 -->
          <nut-tabs v-model="state.current" type="smile">
            <nut-tab-pane title="单张" pane-key="1">
              <add-rule :data="state.templateData" :verifyImg="appStore.selectImageUrl"></add-rule>
            </nut-tab-pane>
            <nut-tab-pane title="排版" pane-key="2"> 
              <add-layout :layoutUrl="state.resultData.layoutUrl" :swiperList="[]"></add-layout>
            </nut-tab-pane>
          </nut-tabs>
        </view>
        <view class="cate-info" v-if="state.current == 1">
          <add-tabs :templateData="state.templateData" @bgchange="(val:string) => (state.queryData.bgcolor = val)"></add-tabs>
        </view>
        <view class="cate-info" v-if="state.current == 2">
          <add-unit></add-unit>
        </view>
      </view>
      <view class="cate-footer">
        <add-download @click="downloadFn"></add-download>
      </view>
    </view>
  </basic-layout>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import Taro, {useLoad} from '@tarojs/taro';
import verifyImg from  '@/assets/images//verify_img.png';
import loayoutUrl from '@/assets/images/layout.png';
import {useAppStore} from '@/store/index';
const appStore = useAppStore();

const tabs = [
  {
    title:"单张",
  },{
    title:"排版",
  }
];

const state = reactive({
  tabs: tabs, // tab列表
  current: 1,
  verifyImg: verifyImg,
  loayoutUrl: loayoutUrl,
  templateData: {},
  queryData: {
    bgcolor: '',
  },
  resultData: {
    layoutUrl: ''
  },
})
  useLoad(() => {
    state.templateData = appStore.currentTemplateData;
  })

  const downloadFn = () => {
    appStore.saveImage(state.resultData.layoutUrl);
  }


</script>
<style lang="scss">

.page-wp {
  width: 100%;
  height: 100vh;     /* 很重要，如果设置成100%，页面内容过多时不会固定 */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0rpx;
  background: #F3F7FA;
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
/* tab */
.tabs-swiper .ant-tabs-bar-scroll-view{
  width: 260rpx;
  justify-content:center;
  margin: 0 auto;
}
.tabs-swiper .ant-tabs-content {
  margin-top: 32rpx;
  /* padding: 0.32rem; */
  border-radius: 16rpx;
}
.tabs-swiper-second .ant-tabs-content{
  background: #F3F7FA;
}
.tabs-swiper .ant-tabs-bar-fade-left, .tabs-swiper .ant-tabs-bar-fade-right {
  display: none;
}
.tabs-bar {
  background: none;
  border-bottom: none !important;
}


</style>