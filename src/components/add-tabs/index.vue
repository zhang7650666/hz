<template>
  <view class="add-tabs" >
    <!-- 主项tab -->
    <view class="tabs-content">
      <nut-tabs v-model="state.current" :animated-time="0">
        <template #titles>
          <view v-for="(item, index) in state.tabs" :key="`panerkey${index}`" :class="['custom-tab-item', state.current == `panerkey${index}` ? 'active' : '']" @click="() => onTabChange(index)">
          <view class="custom-title">
          <image mode="widthFix" :src="state.current == `panerkey${index}` ? item.activeIcon : item.icon" class="tab-img"></image>
          <text class="tab-title">{{item.title}}</text>
          </view>
        </view>
      </template>
        <!-- <nut-tab-pane :title="item.title" :pane-key="idx" v-for="(item, idx) in state.tabs"> {{  }} </nut-tab-pane> -->
      </nut-tabs>
    </view>
    <!-- 更换背景色tab -->
    <view  v-if="state.current == 'panerkey0' && props.templateData.inchInfo">
      <add-background :data="props.templateData.inchInfo" @click="val => onBgChange(val)"></add-background>
    </view>
  </view>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue';
import verifyImg from '@/assets/images/verify_img.png';
import activeIcon_c from '@/assets/images/color.png';
import activeIcon from '@/assets/images/color.png';
import activeIcon1_c from '@/assets/images/cloth.png';
import activeIcon1 from '@/assets/images/cloth.png';
import activeIcon2_c from '@/assets/images/text.png';
import activeIcon2 from '@/assets/images/text.png';
const props = defineProps<{
  templateData:{}
}>()
const emitr = defineEmits(['bgchange', 'tabchange'])
const tabs = [
    {
      title:"换底色",
      icon: activeIcon,
      activeIcon: activeIcon_c,
    },
    {
      title:"换服装",
      icon: activeIcon1,
      activeIcon: activeIcon1_c,
    },
    {
      title:"加文字",
      icon: activeIcon2,
      activeIcon: activeIcon2_c,
    },
  ];

  const state = reactive({
    verifyImg:verifyImg,
    tabs: tabs,
    current: 'panerkey0',
  })

  const onTabChange = (val:string) => {
    state.current = `panerkey${val}`
    emitr('tabchange', `panerkey${val}`)
  };

  const onBgChange = (val: string) => {
    emitr('bgchange', val)
  }


</script>
<style lang="scss">
.add-tabs {
  position: relative;
  box-sizing: border-box;
}

.tabs-content {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  // padding: 10px;
  width: 100%;
  box-sizing: border-box;

  .nut-tabs.horizontal {
    width:100%;

    .nut-tabs__titles {
      height: auto;
    }
  }
}
.nut-tabs .nut-tabs__titles .nut-tabs__list  {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.custom-tab-item {
 display: flex;
 justify-content: space-between;
 align-items: center;
 background: #F3F6FF;
 width: 30%;
  // height: 112rpx;
  border-radius: 12rpx;
  padding: 12rpx 0;
  box-sizing: border-box;
  // display: flex;
  // flex-direction: column;
  // flex-wrap: wrap;
  // align-items: center;
  // justify-content: center;
  // cursor: pointer;
}
.custom-title {
  color: black;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;


  .tab-img {
    width: 48rpx;
    height: 48rpx;
    margin-bottom: 6rpx;
  }

  .tab-title {
    font-size: 28rpx;
    font-weight: 400;
    color: #333333;
    line-height: 1.5;
  }

  &.active {
    background: #D6E2FF;
    color: #336CFF;
  }
}


</style>