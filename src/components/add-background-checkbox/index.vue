<template>
  <view class="add-background" >
   <!-- 更换背景色tab -->
   <view class="tab-colors" v-if="'allow_bkg' in data">
    <view v-for="[key, color] in Object.entries(data.allow_bkg)" :key="color"  @click="() => onTabChange(key, color )" :class="['tab-item', current == key ? 'active' : '']">
			<view class="tab-color" :style="`background: rgb${color.colorBGR};`"></view>
      <view class="tab-title">{{color.colorName}}</view>
    </view>
  </view>
</view>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import checkedIcon from '@/assets/images/dui.png';
import { useReady } from '@tarojs/taro';
import {useAppStore} from '@/store/index';
const props = defineProps<{
  data: {},
}>()

console.log('props.data===', props.data)
const appStore = useAppStore()
const emit = defineEmits(['click'])
const state = reactive({
  checkedIcon,
  current: appStore.color_type,

  // isClick?: false,
})

const {data} = toRefs(props);
const {current} = toRefs(state);

const onTabChange = (colorType: string, val: {colorName: string, colorBGR: string}) => {
      state.current = colorType;
      emit('click', {colorType, colorBGR: val.colorBGR})
};

useReady(() => {
  state.current = Object.entries(props.data.allow_bkg)[0][0] || 'white';
})
</script>
<style lang="scss">
.add-background {
  position: relative;
  box-sizing: border-box;
}

/* 更换背景色tab */
.tab-colors {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position:relative;
    width: 112rpx;
    padding: 40rpx 0;

    &:first-child {
      width: auto;
    }
    &:last-child {
      width: auto;
    }
    .tab-color{
      width: 64rpx;
      height: 64rpx;
      border-radius: 12rpx;
      border: 2rpx solid #D8D8D8;
      margin-bottom: 12rpx;
    }
    .tab-title{
      font-size: 24rpx;
      font-weight: 400;
      color: #333333;
      line-height: 36rpx;
      text-align: center;
    }

    &.active {
      .tab-color{
        // border-color: #336CFF;
        border-color:#336CFF !important;
        position: relative;

        &::before {
          content: "";
          position: absolute;
          top: 13%;
          left: 26%;
          width: 50%;
          height: 30%;
          border: 3rpx solid #336CFF;
          border-color: transparent transparent  #336CFF #336CFF;
          transform: rotate(-45deg);

        }
      }
      .tab-title {
        color: #336CFF;
      }
    }
  }

}
</style>
