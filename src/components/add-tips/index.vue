<template>
   <!-- 提示信息 -->
   <view class="add-tips-wp">
      <text class="tip" v-if="props.isShowTips">温馨提示：</text>
      <text class="tip-desc">{{props.tips}}</text>
    </view>
</template>
<script setup lang="ts">
const props  = defineProps<{
  tips: String,
  isShowTips?:Boolean
}>()
</script>
<style lang="scss">
/* 提示信息 */
.add-tips-wp {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
  border-radius: 16rpx;
  background: #FAF2E6;
  padding: 20rpx;
}
.add-tips-wp .tip{
  font-size: 28rpx;
  font-weight: 500;
  color: #FA9600;
  line-height: 44rpx;
}

.add-tips-wp .tip-desc{
  font-size: 28rpx;
  font-weight: 500;
  color: #2F3133;
  line-height: 44rpx;
}
</style>