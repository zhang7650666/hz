<template>
    <basic-layout show-tab-bar>
      <custom-navbar title="搜索" />
      <view class="page-wp">
        <!-- 搜索框 -->
        <view class="search-wp">
          <nut-searchbar v-model="state.value" placeholder="输入想要拍摄的证件照名称" clearable @change="onChange" @clear="onClear" @search="onChange">
              <!-- <template #rightin >
                <Search2 @click="onConfirm"/>
              </template> -->
							<template v-slot:rightout>
								<view class="text-#336CFF"  @click="onConfirm">搜索</view>
							</template>
            </nut-searchbar>
        </view>
        <!-- 没有查询到结果显示历史和热门数据存在显示 -->
        <view class="search-container" v-if="!state.searchList.length">
          <view v-if="!state.value.length">
            <view v-if="state.history.length">
              <view class="history">
                <text class="h-desc">历史搜索</text>
                <IconFont :name="delIcon" size="16" @click="onDelete"/>
              </view>
              <add-tags :listData="state.history" class="history-list" @click="v => hotTagClick(v)"/>
            </view>
            <view v-if="state.hot.length">
              <view class="history">
                <text class="h-desc">热门搜索</text>
              </view>
              <add-tags :listData="state.hot" class="history-list" @click="v => hotTagClick(v)" :saveHistory="true"/>
            </view>
          </view>
          <!-- 没有查询到结果显示历史和热门数据不存在显示 -->
          <view class="no-search-result" v-else>
            <nut-empty
              image="https://static-ftcms.jd.com/p/files/61a9e3313985005b3958672e.png"
              description="未找到搜索结果"
            ></nut-empty>
          </view>
        </view>
        <view class="search-results" v-else>
          <view  class="component" v-for="(info,index) in state.searchList" :key="index">
            <add-card :info="info.inch_info" :table_id="info.table_id" :highlightedSubstring="state.value" ></add-card>
          </view>
        </view>
      </view>
    </basic-layout>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { IconFont } from '@nutui/icons-vue-taro';
import Taro ,{useLoad}from '@tarojs/taro';
import { Search2 } from '@nutui/icons-vue-taro';
import { useAppStore} from '@/store';
import {addToHistory} from '@/utils/fn';
import {getHotwordList, getSearchList} from '@/api/hz/index';
import delIcon from '@/assets/images/del.png'

const appStore = useAppStore();

interface Oobject {
  [key: string]: any,
}

definePageConfig({
  // titleBarColor:'#F3F7FA',
})

const state = reactive<{
  value: string,
  history: string[],
  hot: string[],
  // componentList: Oobject[],
  searchList: Oobject[],
}>({
  value: '',
  history: [], // 历史数据
  hot: [], // 热门数据
  // componentList: [], // 尺寸列表数据
  searchList: [], // 查询结果数据
})

 // 删除立式记录
 const onDelete = () => {
	Taro.showModal({
    title: '确认操作',
    content: '确定删除相关历史？',
    showCancel: true,
    cancelText: '取消',
    cancelColor: '#000000',
    confirmText: '确定',
    confirmColor: '#3CC51F',
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定');
				Taro.setStorageSync( 'searchHistory', [] ),
					state.history = [];
        // 执行确定后的操作
      } else if (res.cancel) {
        console.log('用户点击取消');
        // 执行取消后的操作
      }
    },
    fail(err) {
      console.error('Modal failed', err);
    }
  });


  };
  // 监听输入框变化 (保留 change 方法，预防后续使用)
  const onChange = (val?: string) => {

		if(val) {
			state.value = val;
		}
    // 如果keyword 不存在
    if (!state.value) {
      state.searchList = [];
      state.value =  '';
      return;
    }
    // 过滤数据
    // const pattern = new RegExp(state.value, 'i');
    // const searchList = appStore.allTemplateList?.filter(v => v.inch_name.includes(state.value));
		// console.log('searchList', searchList)
    // state.searchList = searchList;
		radySearchList()
  };

  const onConfirm = () => {
    state.history = addToHistory(state.value)
    onChange();
  }

  const onClear = () => {
    state.value= '';
    state.searchList = [];
  }

  const hotTagClick = (v: string) => {
    state.value = v;
    state.history = addToHistory(state.value)
		radySearchList()
  }

  // 热词列表;
  const readHotwordList = () => {
    getHotwordList({}).then((res) => {
      state.hot = res.data || [];
    })
  }

  // 搜索列表
  const radySearchList = () => {
    getSearchList({params: {keyword: state.value}}).then(res => {
			state.searchList = res.data || [];
      // state.searchList = (res.data || []).map(v => v.inch_info);
    })
  }


  useLoad((query: {keyword: string}) => {
    state.value = query.keyword || '';
		console.log('state.value' ,  query.keyword,  state.value)
    state.history = Taro.getStorageSync('searchHistory') || [];
    !!query.keyword && radySearchList();
    appStore.getTemplateList();
    readHotwordList();
    // state.componentList = appStore.allTemplateList;
  })



</script>
<style lang="scss">

.page-wp {
  width: 100%;
  height: 100vh;     /* 很重要，如果设置成100%，页面内容过多时不会固定 */
  display: flex;
  flex-direction: column;
  background: #F3F7FA;
}
/* 搜索框 */
.search-wp {
  display: flex;
  align-items: center;
  padding: 32rpx 0rpx;
  height: 70rpx;


  .nut-searchbar {
    background: #F3F7FA;

    .nut-searchbar__search-input {
      background:#fff;
    }
  }
}
.search-bar {
  padding: 0rpx 24rpx;
  border: 1rpx solid transparent;
  transition: all 0.4s;
  height: 68rpx;
  background: #FFFFFF;
  border-radius: 36rpx 36rpx 36rpx 36rpx;
  flex: 1;
  font-size: 28rpx;
}
.search-bar-focus {
  /* border-color: #1677ff; */
}
.cancel {
  margin-left: 32rpx;
  width: 64rpx;
  font-size: 32rpx;
  font-weight: 400;
  color: #336CFF;
  line-height: 68rpx;
}
input::-webkit-input-placeholder {
  color: #A7A7A7;
  font-size: 28rpx;
}

/* 热门、历史 */
.search-container {
	flex: 1;    /* 很重要 */
  overflow-y: auto;
  box-sizing: border-box;
  padding: 32rpx;
}

.history {
  display: flex;
  align-items: center;

}
.h-desc {
  flex: 1;
  font-size: 28rpx;
  font-weight: 400;
  color: #333333;
  line-height: 1.4;
}


.history-list {
  margin-top: 10px;
  background: none;
}


/* 搜索结果 */
.search-results {
  margin-top: -22rpx;
  flex: 1;    /* 很重要 */
  overflow-y:auto; /* 很重要，否则当该内容超过一屏时，尾部区域不会固定 */

}

/*  暂无数据 */
.no-search-result {
  height: 500rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


</style>
