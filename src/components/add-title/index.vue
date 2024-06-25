<template>
    <div class="add-title">
        <text class="title">{{ title }}</text>
        <img  v-if="isShowIcon" class="hot-icon"  :src="icon"/>
    </div>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import hotIcon from '@/assets/images/hot.png';

const props = defineProps<{
    title: string,
    isShowIcon: boolean
}>();

const state = reactive({
    icon: hotIcon,
})

const {title} = toRefs(props);
const {icon} = toRefs(state);

// useLoad(() => {
//     const {title, isShowIcon} = props;
//     state.title = title;
//     state.isShowIcon =  isShowIcon || false,
// })
</script>
<style lang="scss">
.add-title {
  display: flex;
  align-items: center;
  background: none;
  padding-top:32rpx;
  width: 100%;
}
.title {
  font-size: 36rpx;
  font-weight: 400;
  color: #333333;
  line-height: 50rpx;
  margin-right: 12rpx;
}
.hot-icon {
  width: 40rpx;
  height: 40rpx;
  background-size: 40rpx 40rpx;
}

</style>