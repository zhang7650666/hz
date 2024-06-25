<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import zjz from '@/assets/images/zjz.png';
import  kefu from '@/assets/images/kefu.png';
import  abount from '@/assets/images/abount.png';
import addList from '@/components/add-list/index.vue';
import addListItem from '@/components/add-list-item/index.vue';
import namedPng from '@/assets/images/banner.png';
import Taro from '@tarojs/taro';

definePageConfig({
  navigationBarTitleText: '个人中心'
});

const state = reactive({
  radius: true,
  zjz,
  kefu,
  abount,
  visible: false,
  actions: [
    {
      text: '拨打400-036-xxxx',
      key: 'callphone',
    },
  ],
  userInfo: {
    avatar: '',
    nickName: '闫森森',
    userId: ''
  },
  swiperList: [namedPng]
})

const {userInfo,} = toRefs(state);

const handleOrderList = () => {
  Taro.navigateTo({url: '/pages/order-list/index'})
}

</script>
<template>
  <basic-layout show-tab-bar>
    <custom-navbar title="个人中心" />
    <view class="abount-wp">
      <addList
        header=""
        :rd="state.radius">
        <addListItem
          :image="state.kefu"
          arrow="right"
          @onClick="handleOrderList"
          data-info="用户协议">
          用户协议
        </addListItem>
        <addListItem
          :image="state.abount"
          arrow="right"
          @onClick="handleOrderList"
          data-info="隐私政策">
          隐私政策
        </addListItem>
        <addListItem
          :image="state.abount"
          arrow="right"
          @onClick="handleOrderList"
          data-info="权限设置">
          权限设置
        </addListItem>
      </addList>
        <view class="s-s">
        <!-- 轮播图 -->
          <custom-swiper :list="state.swiperList"/>
      </view>
      </view>
  </basic-layout>
</template>

<style lang="scss">
.abount-wp {
  /* padding: 32rpx; */
  width: 100%;
  background: #F1F4F8;
  min-height: 90vh;
  padding-top: 32rpx;
}
.abount-wp .s-s {
  width: 100%;
  padding: 32rpx;
  // height: 350rpx;
  box-sizing: border-box;
}
</style>
