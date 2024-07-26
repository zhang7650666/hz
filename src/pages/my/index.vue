<script setup lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
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
	console.log('wx', wx)
// 	Taro.openCustomerServiceChat({
//   extInfo: {url: ''},
//   corpId: '',
//   success: function (res) { }
// })

	// wx.openCustomerServiceChat({
	// 	extInfo: {url: ''},
	// 	corpId: '',
	// 	success(res) {}
	// })


  Taro.navigateTo({url: '/pages/order-list/index'})
}

const handleProto = () => {
  Taro.navigateTo({url: '/pages/proto/index'})
}


onMounted(() => {
	wx.getUserInfo({
		success: function(res) {
			console.log('获取用户信息', res)
			state.userInfo = res.userInfo
			var nickName = userInfo.nickName
			var avatarUrl = userInfo.avatarUrl
		}
	})
})
</script>
<template>
  <basic-layout show-tab-bar>
    <custom-navbar title="个人中心" />
    <view class="my-wp">
      <!-- 用户信息 -->
      <view class="user-info">
        <image mode="widthFix" :src="userInfo.avatarUrl" class="user-avatar"></image>
        <view class="user-main">
          <view class="user-name">{{userInfo?.nickName}}</view>
          <!-- <view class="user-id">用户ID：{{userInfo?.userId}}</view> -->
        </view>
      </view>
      <addList
        header=""
        :rd="state.radius">
        <addListItem
          :image="state.zjz"
          arrow="right"
          @onClick="handleOrderList"
          data-info="我的证件照">
          我的证件照
        </addListItem>
      </addList>
      <addList
        header=""
        :rd="state.radius">
        <!-- <addListItem
          :image="state.kefu"
          arrow="right"
          @onClick="handleOrderList"
          extraBrief="每日9:00-21:00"
          data-info="客服中心">
          客服中心
        </addListItem> -->
        <addListItem
          :image="state.abount"
          arrow="right"
          @onClick="handleProto"
          data-info="关于我们">
          关于我们
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
.my-wp {
  /* padding: 32rpx; */
  width: 100%;
  background: #F1F4F8;
  min-height: 90vh;
}
.my-wp .mt-30 {
  padding-top: 32rpx;
}
 .my-wp .ant-list {
  padding-bottom: 32rpx;
}
.my-wp .ant-list-item-image-image {
  display: block;
  width: 48rpx;
  height: 48rpx;
}
.my-wp .swiper-wp{
  padding: 0rpx 32rpx;
}
.my-wp .user-info {
  margin: 32rpx;
  padding: 32rpx;
  background: #fff;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
}

.my-wp .user-info .user-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 600rpx;
  border: 4rpx solid rgba(228,228,228,0.6);
  margin-right: 24rpx;
}

.my-wp .user-info .user-name {
  font-size: 36rpx;
  font-weight: 400;
  color: #151522;
  line-height: 52rpx;
  margin-bottom: 24rpx;
}

.my-wp .user-info .user-id {
  font-size: 28rpx;
  font-weight: 400;
  color: #666666;
  line-height: 36rpx;
}
.my-wp .s-s {
  width: 100%;
  padding: 32rpx;
  // height: 350rpx;
  box-sizing: border-box;
}
</style>
