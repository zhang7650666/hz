<template>
  <view class="add-list-item-section">
    <view class="ali-left">
      <slot name="icon">
        <view class="avatar">
          <image mode="widthFix" :src="props.image" />
        </view>
      </slot>
      <view class="content">
        <text>
            <slot name="content">
              {{ props.dataInfo }}
            </slot>
          </text>
      </view>
    </view>
    <view class="ali-right" @click="emitr('onClick', true)">
      <slot name="extra">
        <view class="extra-content">{{ props.extraBrief }}</view>
      </slot>
      <view v-if="props.arrow" class="arror">
      </view>

    </view>
  </view>
</template>
<script setup lang="ts">
import { text } from 'stream/consumers';
const props = defineProps<{
  image?: String,
  arrow?: String
  extraBrief?: String
  onClick?: () => {}
  dataInfo: String,
}>();

const emitr = defineEmits(['onClick']);
</script>
<style lang="scss">
.add-list-item-section {
  padding: 28rpx 0;
  border-bottom: 2rpx solid #E1E4EA;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  &:last-child {
    border: 0;
  }

  .ali-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .avatar {
    width: 50rpx;
    height: 50rpx;

    image {
      display: block;
      width: 100%;
    }
  }

  .content {
    font-size: 32rpx;
    color: #000000;
    line-height: 1.4;
    text-align: left;
    padding-left: 20rpx;
  }

  .ali-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .extra-content{
    font-weight: 400;
    font-size: 32rpx;
    color: #999999;
    line-height: 1.4;
    text-align: right;
  }

  .arror {
    width: 20rpx;
    height: 20rpx;
    border: 2rpx solid #999999;
    border-color: #999999 #999999 transparent transparent;
    transform: rotate(45deg);
    margin-left: 16rpx;
  }

}
</style>