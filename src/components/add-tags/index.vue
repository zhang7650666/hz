<template>
    <view class="add-tags">
      <view v-for="item in listData" class="tag-item" @click="emitr('click', item) ">{{item}}</view>
    </view>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
const props = defineProps<{
    listData: string[],
}>();
const emitr = defineEmits(['click'])

const {listData} = toRefs(props);

</script>

<style lang="scss">
.add-tags {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  width: 100%;
  padding: 20rpx 0rpx 34rpx;
}
.tag-item {
  background: #fff;
  border-radius:48rpx;
  margin-right: 24rpx;
  padding: 0rpx 32rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #888888;
  line-height: 60rpx;
  margin-bottom: 18rpx;
}
</style>