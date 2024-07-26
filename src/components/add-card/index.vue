
<template>
  <view class="add-card" @click="onClick">
    <view class="left">
        <view class="l-p first">
						<div class="title truncate max-w-200rpx" v-html="highlightSubstring(info.inch_name, props.highlightedSubstring)"> </div>
            <text v-if="info.support_receipts" class="sup sup1">支持回执</text>
            <text  v-if="info.support_qualified" class="sup sup2">支持合规检测</text>
        </view>
        <view class="second">{{info.explain}}</view>
        <view class="l-p third">
            <view v-if="info.print_size" class="tags">
                <text class="tag">尺寸</text>
                <text class="desc">{{info.print_size[0]}}*{{info.print_size[1]}}mm</text>
            </view>
            <view  v-if="info.pixel" class="tags">
                <text class="tag">像素</text>
                <text class="desc">{{info.pixel[0]}}*{{info.pixel[1]}}px</text>
            </view>
            <view class="tags">
                <text class="tag">大小</text>
                <text class="desc">{{info.file_size}}</text>
            </view>
        </view>
    </view>
    <view class="right">
        <!-- <ant-icon type="RightOutline" className="right-outline"/> -->
        <!-- <IconFont name="rect-right" color="#3C3C43"></IconFont> -->
				<IconFont name="rect-right" ></IconFont>
    </view>
</view>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import Taro , {useLoad}from '@tarojs/taro';
import { defineComponent } from 'vue';
import { IconFont } from '@nutui/icons-vue-taro'

defineComponent({
  name: 'add-card',
})

const props = defineProps<{
  info: Object,
  table_id: number | string,
	highlightedSubstring?: string;
}>()


 const onClick = () => {
    Taro.navigateTo({url: `/pages/category/index?typeid=${props.table_id}&inch_type=${props.info?.inch_type}`,});
  };

	// 替换函数
const highlightSubstring = (str, substring) => {
  // 检查子串是否存在
  if (str.includes(substring)) {
    // 使用正则表达式匹配子串
    const regex = new RegExp(substring, "g");
    // 替换子串为带有红色标记的HTML
    const highlightedString = str.replace(regex, `<text class="text-#336CFF">${substring}</text>`);
    return highlightedString;
  } else {
    // 如果子串不存在，则返回原字符串
    return str;
  }
}
</script>
<style lang="scss">
.add-card {
  display: flex;
  align-items: center;
  width: 100%;
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
  box-sizing:border-box;
  margin-top: 32rpx;
}
.left {
  flex: 1;
}
.l-p {
  display: flex;
  align-items: center;
}
/* 第一行样式 */
.first {
  padding: 2rpx 0rpx;
  line-height: 40rpx;
  margin-bottom: 12rpx;
}
.first text {
 margin-right: 16rpx;
}
.first .title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333333;

}
.first .sup {
  font-size: 24rpx;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 40rpx;
  padding: 0rpx 12rpx;
  border-radius: 4rpx;
}
.first .sup1 {
  background: #2C80FB;
}
.first .sup2 {
  background: #21D493;
}

/* 第二行样式 */
.second {
  font-size: 24rpx;
  font-weight: 400;
  color: #666666;
  line-height: 36rpx;
  width: 580rpx;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  margin-bottom: 12rpx;
}
/* 第三行样式 */
.tags {
  display: flex;
  align-items: center;
  line-height: 36rpx;
  font-size: 20rpx;
  font-weight: 400;
  color: #90A9D3;
  margin-right: 20rpx;
}
.tag {
  background: #F4F8FF;
  border-radius: 20rpx;
  padding:0rpx 12rpx;
  margin-right: 8rpx;
}

/* 右侧icon */
.right-outline {
  color: #3C3C43;
  font-weight: bold;
  font-size: 28rpx;
}
</style>
