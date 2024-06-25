<template>
  <view class="add-footer" @click="handleDownload">
    <text class="download-btn" >下载电子版（无水印）</text>
  </view>
</template>
<script setup lang="ts">
const emitr = defineEmits(['click'])
const handleDownload = () => {
  emitr('click')
}
</script>
<style lang="scss">
.add-footer {
  position:relative;
  display: flex;
  align-items: center;
  padding: 20rpx 32rpx 88rpx;
  box-sizing: border-box;
  background: #fff;
}
.download-btn {
  width: 686rpx;
  background: #336CFF;
  border-radius: 12rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 96rpx;
  text-align: center;
}

</style>