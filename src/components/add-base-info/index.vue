<template>
  <view class="add-base-info">
    <view class="cate-info">
        <view class="title">基础信息</view>
        <view class="base-box" v-for="item in props.baseInfo">
            <text class="base-dian"></text>
            <text class="base-desc">{{item}}</text>
        </view>
    </view>
</view>
</template>
<script setup lang="ts">
const props = defineProps<{
  baseInfo: Object
}>();
</script>
<style lang="scss">

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

/* 基础服务 */
.base-box {
  display: flex;
  align-items: center;
  margin-bottom: 28rpx;
 
}
.add-server {
   border-bottom: thin solid #E1E4EA;
   padding: 22rpx 0rpx;
   margin-bottom: 0rpx;
}
.base-box .base-main {
  flex: 1;
  display: flex;
  flex-direction:column;
  width: 100%;
}
.base-box .base-content {
  display: flex;
  align-items: center;
}
.colors {
  display: block;
  background: red;
}
.colors-wp {
  margin-top: 40rpx;
}
.add-server:last-child {
   border-bottom: none;
}
.base-box:last-child {
  margin-bottom: 0rpx;
}
.base-box .base-dian{
  width: 20rpx;
  height: 20rpx;
  background: #336CFF;
  border-radius: 20rpx;
}

.base-box .base-desc{
  flex: 1;
  font-size: 28rpx;
  font-weight: 400;
  color: #000000;
  line-height: 40rpx;
  margin-left: 14rpx;
}
.base-box .select-img {
  width: 40rpx;
  height: 40rpx;
  background-size: 40rpx;
}
</style>