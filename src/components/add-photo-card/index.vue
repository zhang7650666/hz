<template>
  <view class="add-photo-list" @click="handleTap">
    <view class="order-main">
      <view class="create-time">{{photoInfo.createTime}}</view>
        <view class="order-desc">{{photoInfo.desc}}</view>
        <view class="img-box">
          <image mode="widthFix" :src="photoInfo.imgUrl" class="photo-img"></image>
          <image v-if="!!photoInfo.layoutUrl" mode="widthFix" :src="photoInfo.layoutUrl" class="layout-img"></image>
        </view>
    </view>
    <view class="order-no">订单号：{{photoInfo.orderNo}}</view>
    <view class="order-no">过期时间：{{photoInfo.expireTime}}</view>
</view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { toRefs } from 'vue';
interface Oobject {
  [key: string]: any
}
const props = defineProps<{
  photoInfo: Oobject,
}>()
  const   handleTap = () => {
    Taro.navigateTo({url: '/pages/order-detail/order-detail'});
    }

    const {photoInfo} = toRefs(props);
</script>
<style lang="scss">
.add-photo-list {
  background: #FFFFFF;
  padding: 32rpx;
  box-sizing: border-box;
  .order-main {
    padding-bottom: 24rpx;
    border-bottom: thin solid #EBEBF0;
  }
  .create-time {
    font-weight: 500;
    color: #27272A;
    margin-bottom: 18rpx;
  }
  .order-desc {
    font-weight: 400;
    color: #27272A;
    margin-bottom: 22rpx;
  }
  .order-no {
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
    line-height: 36rpx;
    padding-top: 20rpx;
  }

  .img-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .photo-img {
      width: 178rpx;
      margin-right: 16rpx;
    }
    .layout-img {
      display: block;
      width: calc(100% - 200rpx);
    }
  }
}
</style>