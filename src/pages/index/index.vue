<script setup lang="ts">
import { reactive } from 'vue';
import Taro,{ navigateTo, useLoad, useReady } from '@tarojs/taro';
// import { useThemeStore } from '@/store';
import { getBoundingClientRect } from '@/utils/fn';
import { Search2 } from '@nutui/icons-vue-taro';
import namedPng from '@/assets/images/banner.png';
import {useAppStore, useUserStore} from '@/store';
import { computed } from 'vue';

const appStore = useAppStore();
const userStore = useUserStore();

const state = reactive({
  current: 0,
  scrollTop: 0,
  tabsTop: 0,
  pageScrollTop: 0,
  toView: '',
  user: {},
  tabs: [],
  items: [],
  swiperList: [namedPng],
  val: '',
  itemMap: {},
});

definePageConfig({
  navigationBarTitleText: '证件照采集中心'
});

useLoad(() => {
  // 获取用户信息并存储数据
	// userStore.getUserInfo();
  appStore.getTemplateList();
  state.tabs = appStore.$state.tabs;
});

// 获取全部尺寸
// async function getInchtypes() {
//   const res:any = await inchtypesApi({});
//   console.log('res', res);
//   if (res.code == 200) {
//     state.tabs = [{
//       inchInfos: [],
//       tableId: 'all',
//       tableName: '全部'
//     }].concat(res.data);
//   }
// }

const comtabs = computed(() => {
  return appStore.$state.tabs
})


// getInchtypes();

// 滚动
// usePageScroll(res => {
//   state.pageScrollTop = res.scrollTop;
// });
useReady(async () => {
  const res = await getBoundingClientRect('.tabs');

  state.tabsTop = 0;
});
//  // 点击搜索
const onSearchBarTap = () => {
  navigateTo({ url: '/pages/search/index?keyword=' +  state.val || ''});
};
// 点击tab切换
const onChange = (item:any) => {
  state.current = item.tableId;
  state.toView = "s" + item.tableId;
  // Taro.pageScrollTo({
  //   scrollTop: Math.min(this.data.tabsTop, this.data.pageScrollTop),
  // });
};
// // 点击模版
// onTapHandler() {

// }

const upper = (e) => {
  console.log('upper:', e)
};

const  lower = (e) => {
  console.log('lower:', e)
};

const scroll = (e) => {
  state.pageScrollTop = e.scrollTop;
};
</script>

<template>
  <basic-layout show-tab-bar>
    <custom-navbar title="证件照采集中心" />
    <view class="page-wp page-box">
      <!-- 搜索框 -->
      <nut-searchbar v-model="state.val" placeholder="输入想要拍摄的证件照名称">
        <template #rightin >
          <Search2 @click="onSearchBarTap"/>
        </template>
      </nut-searchbar>
    <!-- </view> -->
    <view class="s-s">
      <!-- 轮播图 -->
        <custom-swiper :list="state.swiperList"/>
    </view>

    <!-- 滚动选项卡 -->
    <view class="tabs-wp">
      <nut-tabs  class="tabs" v-model="state.current" title-scroll title-gutter="10" name="tabName">
        <template #titles>
          <view v-for="item in comtabs" :key="item.tableId" class="custom-tab-item" @click="() => onChange(item)">
            <view
              class="custom-title"
              :class="{
                active: state.current == item.tableId
              }"
            >
              {{ item.tableName }}
            </view>
          </view>
        </template>
      </nut-tabs>
      <scroll-view
            id="scroll-view"
            :scroll-top="state.scrollTop"
            :scroll-y="true"
            :scroll-with-animation="true"
            :scroll-animation-duration="50"
            class="tab-content"
            style="height: 1000rpx;"
            @scrolltoupper="upper"
            @scrolltolower="lower"
            :scroll-into-view="state.toView"
            @scroll="scroll"
          >
          <template  v-for="item in comtabs">
            <view v-if="!!item.inchInfos.length" :id="item.tableId">
              <add-title :title="item.tableName" :id="`s${item.tableId}`"  :is-show-icon="true"></add-title>
              <view v-for="card in item.inchInfos">
                <add-card :info="card" :tableId="item.tableId"></add-card>
              </view>
            </view>
          </template>
      </scroll-view>
    </view>
  </view>
  </basic-layout>

</template>

<style lang="scss">
.page-box {
  padding: 32rpx 0 0rpx !important;
  background: #F3F7FA;
}
.s-s {
  padding: 32rpx;
  box-sizing: border-box;
	padding-bottom: 16rpx;
}
/*  输入框 */
.fake-searchbar {
  background: #fff;
  margin: 32rpx 0rpx;
  height: 68rpx;
  border-radius: 33rpx 33rpx 33rpx 33rpx;
  padding: 0rpx 24rpx;
  display: flex;
  align-items: center;
}
.fake-placeholder {
  flex: 1;
  font-size: 28rpx;
  font-weight: 400;
  color: #a7a7a7;
  line-height: 68rpx;
}

/* 选项卡 */
.tabs-wp {
  padding: 32rpx;
}
.tabs {
  position: sticky;
  top: -1px;
  z-index: 999;
}
// .tabs-bar {
//   background: #f3f7fa !important;
//   padding: 0rpx 5rpx;
//   border-bottom: none !important;
// }
// .tab {
//   font-size: 28rpx;
//   font-weight: 400;
//   color: #666666;
//   line-height: 40rpx;
// }
// .tab-active {
//   font-weight: 600;
//   color: #333333 !important;
// }
.tab-content {
  // padding: 0rpx 32rpx;
}
// .nut-tab-pane {
//   padding: 32rpx;
//   background: #F3F7FA;
// }

.custom-tab-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20rpx;

  &:first-child {
    padding-left: 0;
  }
}
.custom-title {
	font-size: 28rpx;
  color: black;
  cursor: pointer;
	color: #666666;
}
.custom-title.active {
  font-weight: 600;
  color: #333333 !important;
}

</style>
