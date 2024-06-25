<template>
  <view :class="['add-list-section', props.rd ? 'radiu': '']">
    <slot></slot>
  </view>
</template>
<script setup lang="ts">
const props = defineProps<{
  rd: boolean,
}>()

</script>
<style lang="scss">
.add-list-section {
  background: #FFFFFF;
  margin: 32rpx 32rpx 0;
  padding: 32rpx;
  box-sizing: border-box;
  width: auto;

  &.radiu {
    border-radius: 20rpx;
  }
}
</style>