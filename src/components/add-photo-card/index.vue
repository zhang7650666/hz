<template>
  <view class="add-photo-list" @click="handleTap">
    <view class="order-main">
      <view class="create-time">{{photoInfo.order_date}}</view>
        <view class="order-desc">{{photoInfo.order_name}}</view>
        <view class="img-box">
					<!-- mode="widthFix" -->
          <image mode="widthFix" :src="photoInfo.single_photo" class="photo-img"></image>
          <image v-if="!!photoInfo.layout_photo" mode="widthFix" :src="photoInfo.layout_photo" class="layout-img"></image>
        </view>
    </view>
    <view class="order-no">订单号：{{photoInfo.order_id}}</view>
    <view class="order-no">过期时间：{{photoInfo.expiration_date}}</view>
</view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { toRefs } from 'vue';
interface Oobject {
  [key: string]: any
}

	// {
	// 	"order_id":"0001240711389511",
	// 	"order_date":"2024-07-11",
	// 	"order_name":"2024-08-10",
	// 	"expiration_date":"一寸照-白色-电子版",
	// 	"channel_id":"0001",
	// 	"user_id":"kthhai",
	// 	"single_photo":"/data/InchPhoto2/static/images/2024-07-11/kthhai/kthhai-1720659479156.jpg-white.jpg",
	// 	"layout_photo":"/data/InchPhoto2/static/images/2024-07-11/kthhai/kthhai-1720659479156.jpg-white-layout.jpg"
	// }

const props = defineProps<{
  photoInfo: Oobject,
}>()
  const handleTap = () => {
    // Taro.navigateTo({url: '/pages/modify/index'});
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
			height: 224rpx;
			background-size: 178rpx 224rpx;
    }
    .layout-img {
      display: block;
      width: calc(100% - 200rpx);
			height: 224rpx;
			background-size: calc(100% - 200rpx) 224rpx;
    }
  }
}
</style>
