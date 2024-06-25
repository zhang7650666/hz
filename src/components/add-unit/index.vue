<template>
  <view class="add-unit" >
  <!-- 主项tab -->
  <view class="tabs-content">
      <view class="print-list">
        <view  class="print-block">
        <image mode="widthFix" :src="tabs[0].activeIcon" class="tab-img"></image>
        <text class="tab-title">{{tabs[0].title}}</text>
      </view>
      </view>
  </view>
   <!-- 更换背景色tab -->
   <view class="tab-units">
    <nut-tabs v-model="state.unitCur">
    <template #titles>
      <view v-for="(item, idx) in state.units" :key="idx" :class="['custom-tab-item', state.unitCur === idx ? 'active' : '']" @click="state.unitCur = idx">
        <view  class="tab-item">
          <text class="tab-name">{{item.name}}</text>
          <text class="tab-size">{{item.size}}</text>
        </view>
      </view>
    </template>
  </nut-tabs>
  </view>
</view>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import  activeIcon from  '@/assets/images/color.png';
import icon from '@/assets/images/photo_rule.png';
 const tabs = [
    {
      title:"相纸尺寸",
      icon,
      activeIcon,
    },
  ];


 const units = [
    {
      name:"6寸",
      size: '15.2*10.2cm',
    },
    {
      name:"7寸",
      size: '15.2*10.2cm',
    },
    
  ];

  const state = reactive({
    tabs: tabs,
    current: 0,
    unitCur: 1,
    units
  })
  
</script>
<style lang="scss">
.add-unit {
  position: relative;
  box-sizing: border-box;
}

.tabs-content {
  .print-list {
    display: flex;
    justify-content: flex-start;
  }
  .print-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 180rpx;
    // height: 112px;
    background: #D6E2FF;
    border-radius: 12rpx;
    padding: 12rpx 0;
    box-sizing: border-box;
    .tab-img {
      width: 48rpx;
      height: 48rpx;
      margin-bottom: 6rpx;
    }
     .tab-title {
      font-size: 26rpx;
      font-weight: 400;
      // color: #333333;
      line-height: 34rpx;
      font-weight: 600;
      color: #336CFF;
      text-align: center;
    }
  }
}

/* 尺寸tab */
.tab-units {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 40rpx;

  .nut-tabs .nut-tabs__titles {
    height: auto;
  }

  .custom-tab-item {
    margin-right: 24rpx;
    background: #F2F2F2;
    border-radius: 12rpx;
    padding: 20rpx 0;
    width: 180rpx;
    .tab-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .tab-name{
       font-size: 28rpx;
       font-weight: 500;
       color: #333333;
       line-height: 40rpx;
       margin-bottom: 8rpx;
       text-align: left;
     }
    .tab-size{
       font-size: 24rpx;
       font-weight: 400;
       color: #666666;
       line-height: 36rpx;
     }

    &.active {
      background: #336CFF;

      .tab-name,
      .tab-size {
        color: #fff !important;
      }
    }
  }
}




</style>