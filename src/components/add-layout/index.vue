<template>
  <view class="add-loayout">
  <!-- 广告banner -->
  <view class="banner-wp" v-if="props.swiperList">
    <custom-swiper :list="props.swiperList"/>
  </view>
  <!-- 排版照 -->
  <view class="layout-wp">
    <image mode="widthFix" :src="props.layoutUrl" class="layout-img"></image>
  </view>
</view>
</template>
<script setup lang="ts">
// import namedPng from '@/assets/images/banner.png';
// const state = reactive({
//   swiperList: [namedPng],
// })
const props = defineProps<{
  layoutUrl: string,
  swiperList?: string[]
}>()
</script>
<style lang="scss">

.banner-wp {
  margin-bottom: 32rpx;
}
.layout-wp {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
}
.layout-img {
  // width: 622rpx;
  // height: 324rpx;
  // background-size: 622rpx 324rpx;
	// overflow: hidden;
	width: 100%;
}

</style>
