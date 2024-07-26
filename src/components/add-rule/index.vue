<template>
<view class="add-rule" >
   <view class="rule-wp">
        <view class="rule-main">
            <image class="rule-img"  mode="widthFix" :src="verifyImg" />
        </view>
        <template v-if="'inch_info' in data">
          <view class="rule-pos rule-pos-top">{{data.inch_info.pixel[0]}}px</view>
          <view class="rule-pos rule-pos-bottom">{{data.inch_info.print_size[0]}}mm</view>
           <view class="rule-pos rule-pos-left"> <text class="rule-text-left">{{data.inch_info.pixel[1]}}px</text></view>
          <view class="rule-pos rule-pos-right"><text class="rule-text-right">{{data.inch_info.print_size[1]}}mm</text></view>
        </template>
    </view>
</view>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
interface Object {
  [key: string]: any,
}
const props = defineProps<{
  verifyImg: String,
  data: Object
}>()

const {data, verifyImg} = toRefs(props);
</script>
<style lang="scss">
.add-rule {
  position: relative;
  padding: 32rpx;
  // height: 856rpx;
  box-sizing: border-box;

}
.rule-wp {
  position:relative;
  width: 100%;
  // height: 784rpx;
  padding: 52rpx 40rpx;
  box-sizing: border-box;
  border: 4rpx solid #000;
  z-index: 88;
}
.rule-main {

}
.rule-img {
  width: 100%;
  // height: 680rpx;
}
.rule-pos {
  position:absolute;
  z-index: 99;
  font-size: 24rpx;
  font-weight: 400;
  color: #999999;
  line-height: 40rpx;
}
.rule-pos-top {
  top: -27rpx;
  left: 15%;
  width: 70%;
  background: #fff;
  text-align:center;
}

.rule-pos-bottom {
  bottom: -19rpx;
  left: 15%;
  width: 70%;
  background: #fff;
  text-align:center;
}

.rule-pos-top::before, .rule-pos-bottom::before {
  position:absolute;
  content: ' ';
  top: 20rpx;
  left: -5rpx;
  width: 148rpx;
  height: 4rpx;
  background: #eee;
}

.rule-pos-top::after, .rule-pos-bottom::after {
  position:absolute;
  content: ' ';
  top: 20rpx;
  right: -5rpx;
  width: 148rpx;
  height: 4rpx;
  background: #eee;
}

.rule-pos-left {
  left: -21rpx;
  top: 10%;
  height: 80%;
  width: 40rpx;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rule-pos-left::before {
  position:absolute;
  content: ' ';
  top: 0rpx;
  left: 18rpx;
  width: 4rpx;
  height: 40%;
  background: #eee;
}

.rule-pos-left::after {
  position:absolute;
  content: ' ';
  bottom: -10rpx;
  left: 18rpx;
  width: 4rpx;
  height: 40%;
  background: #eee;
}

.rule-text-left {
  // position: absolute;
  // top: 277rpx;
  // left: -40rpx;
  width: 120rpx;
  text-align: center;
  transform: rotate(180deg);
  writing-mode: vertical-rl;

}

.rule-pos-right {
  right: -21rpx;
  top: 10%;
  height: 80%;
  width: 40rpx;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rule-pos-right::before {
  position:absolute;
  content: ' ';
  top: 0rpx;
  right: 17rpx;
  width: 4rpx;
  height: 40%;
  background: #eee;
}

 .rule-pos-right::after {
  position:absolute;
  content: ' ';
  bottom: -10rpx;
  right: 17rpx;
  width: 4rpx;
  height: 40%;
  background: #eee;
}

.rule-text-right {
  // position: absolute;
  // top: 277rpx;
  // right: -40rpx;
  // width: 120rpx;
  text-align: center;
  // transform: rotate(180deg);
  writing-mode: vertical-rl;
}

.nut-tab-pane{
		padding: 10rpx;
		border-radius: 16rpx;
	}
</style>
