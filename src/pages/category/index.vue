<template>
  <basic-layout show-tab-bar>
    <custom-navbar title="规格信息" />
    <view class="page-wp">
      <!-- 滚动区域 -->
      <view class="cate-content">
        <!-- banner -->
        <custom-swiper :list="state.swiperList"></custom-swiper>
        <!-- 规格信息 -->
        <view class="cate-info" v-if="categoryData.inchInfo">
          <view class="title">规格信息</view>
          <view class="l-v">
            <text class="label">打印尺寸</text>
            <!-- inchInfo -->
            <text class="value">{{categoryData.inchInfo.printSize[0]}}*{{categoryData.inchInfo.printSize[1]}}mm</text>
          </view>
          <view class="l-v">
            <text class="label">像素尺寸</text>
            <text class="value">{{categoryData.inchInfo.pixel[0]}}*{{categoryData.inchInfo.pixel[1]}}px</text>
          </view>
          <view class="l-v">
            <text class="label">文件大小</text>
            <text class="value">缺字段</text>
          </view>
          <view class="l-v">
            <text class="label">文件格式</text>
            <text class="value">{{categoryData.inchInfo.fileFormat}}</text>
          </view>
          <view class="l-v">
            <text class="label">分辨率</text>
            <text class="value">{{ categoryData.inchInfo.dpi }}</text>
          </view>
          <view class="l-v">
            <text class="label">照片底色</text>
            <view class="value">
              <view class="item-color" :style="`background:${item}`" v-for="item in state.colors"></view>
            </view>
          </view>
          <view class="l-v">
            <text class="label">规格说明</text>
            <text class="value">缺字段</text>
          </view>
          <view class="sup-list">
            <view class="sup-box" v-for="item in state.supList">
                <image mode="widthFix" :src="state.checkedIcon" class="check-img"></image>
                <text class="sup">{{item}}</text>
            </view>
          </view>
        </view>
        <!-- 拍摄须知 -->
        <view class="cate-info">
          <view class="title">拍摄须知</view>
          <view class="intr-desc">
            {{ categoryData.photoNotice }}
          </view>
        </view>
        <!-- 示意步骤 -->
        <view class="cate-info">
          <view class="title">示意步骤</view>
          <view class="step-wp">
            <view class="step-box" v-for="item in state.stepList">
                <image mode="widthFix" :src="item.icon" :class="['step-icon', item.arrow ? 'step-arrow': '']"></image>
                <text class="step-desc" v-if="item.desc">{{item.desc}}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="cate-footer">
        <add-footer :query="state.query"></add-footer>
      </view>
    </view>
  </basic-layout>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import {inchdetailApi} from '@/api/hz/index';
import Taro, {useLoad, useRouter} from '@tarojs/taro';
import {stepList} from './constant';
import {useAppStore} from '@/store';
import namedPng from '@/assets/images/banner.png';
import checkedIcon from '@/assets/images/question.png';

// 10000000 10000001
const appStore = useAppStore();

const router = useRouter();
// const {tableId} = router.query;
const state = reactive({
    supList: ['支持冲印', '官方回执', '支持邮寄'], // 支持列表
    checkedIcon: checkedIcon, // 选中图标icon
    stepList, // 示意列表
    colors: [], // 颜色列表
    categoryData: {},
    swiperList: [namedPng],
    query: {}
})

const {categoryData} =toRefs(state);
useLoad((options) => {
  state.query = options;
  getTemplateDetail();
})

const getTemplateDetail = () => {
  inchdetailApi({
    data: {'typeid':10000000,'inchtype':10000001}
  }).then(res => {
    if (res.code == 200) {
      state.categoryData = res.data;
      appStore.currentTemplateData = res.data;
      state.colors = Object.values(res.data?.inchInfo?.allowBkg);
    }
  })
}

</script>
<style lang="scss">

.page-wp {
  width: 100%;
  box-sizing: border-box;
  padding: 32rpx 32rpx 100rpx;
  background: #F3F7FA;
}
.cate-content {
  margin: 32rpx 0rpx;
}
.cate-footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  box-shadow: 0px 0 20px 0px rgba(41,42,111,0.16);
}
/* 规格信息 */
.cate-info {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
  box-sizing: border-box;
  margin-top: 32rpx;
}
.title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  line-height: 44rpx;
  padding-bottom: 40rpx;
}
.l-v {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  margin-bottom: 28rpx;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 44rpx;
}
.label {
  flex: 1;
  color: #333333;
}
.value {
  color: #666666;
  display: flex;
}
.item-color {
  width: 32rpx;
  height: 32rpx;
  border: thin solid #D8D8D8;
  border-radius: 4rpx;
  margin-right: 12rpx;
  box-sizing: border-box;
}
.item-color:last-child {
  margin-right: 0px;
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

/* 介绍信息 */
.intr-desc {
  font-size: 28rpx;
  font-weight: 400;
  color: #333333;
  line-height: 52rpx;
}

/* 示意步骤 */
.step-wp {
  display: flex;
  align-items: center;
}
.step-box {
  width:152rpx;
  position: relative; 
}
.step-icon{
  width: 152rpx;
  height: 152rpx;
  background-size: 152rpx 152rpx;
}
.step-arrow{
  width: 48rpx;
  height: 48rpx;
  background-size: 48rpx 48rpx;
  margin: 0rpx 16rpx;
}
.step-desc{
  position:absolute;
  width: 152rpx;
  bottom: 6rpx;
  left: 0rpx;
  text-align:center;
  font-size: 28rpx;
  font-weight: 400;
  color: #333333;
  line-height: 40rpx;
}
</style>