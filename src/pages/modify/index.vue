<template>
  <basic-layout show-tab-bar>
		<!-- :title="state.templateData.inch_info.inch_name" -->
    <custom-navbar  :title="state.title"/>
    <view class="page-wp">
      <!-- 滚动区域 -->
      <view class="cate-content">
        <view>
          <!-- tab切换 -->
          <nut-tabs v-model="state.current"  @change="tabChange">
            <nut-tab-pane title="单张" pane-key="1">
              <add-rule :data="state.templateData" :verifyImg="state.resultData.selectImageUrl"></add-rule>

            </nut-tab-pane>
            <nut-tab-pane title="排版" pane-key="2">
              <add-layout :layoutUrl="state.resultData.layoutUrl" :swiperList="[]"></add-layout>
            </nut-tab-pane>
          </nut-tabs>
        </view>
        <view class="cate-info" v-if="state.current == 1">
          <add-tabs :templateData="state.templateData" @bgchange="({colorType, colorBGR}) => handleBgChange(colorType, colorBGR)"></add-tabs>
        </view>
        <!-- <view class="cate-info" v-if="state.current == 2">
          <add-unit></add-unit>
        </view> -->
      </view>
      <view class="cate-footer">
        <add-download @click="downloadFn"></add-download>
      </view>
    </view>
  </basic-layout>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import Taro, {useLoad} from '@tarojs/taro';
import verifyImg from  '@/assets/images//verify_img.png';
import loayoutUrl from '@/assets/images/layout.png';
import {useAppStore, useUserStore} from '@/store/index';
import {layoutApi, uploadBase64Api, orderDetailApi} from '@/api/hz/index';

const appStore = useAppStore();
const userStore = useUserStore();
const tabs = [
  {
    title:"单张",
  },{
    title:"排版",
  }
];

console.log('appStore', appStore)
const state = reactive({
  tabs: tabs, // tab列表
  current: 1,
  verifyImg: verifyImg,
  loayoutUrl: loayoutUrl,
  templateData: {},
  queryData: {
    bgcolor: '',
		colorType: '',
  },
  resultData: {
		selectImageUrl: '',
    layoutUrl: ''
  },
	title: ''
})
  useLoad(() => {
		// base64Fn();
		state.resultData.selectImageUrl = appStore.selectImageUrl
    state.templateData = appStore.currentTemplateData;
		state.title = state.templateData.inch_info.inch_name;
		console.log('state.templateData', state.templateData, state.templateData.inch_info.inch_name)
  })
  const base64Fn = () => {
		const {inch_info} = appStore.currentTemplateData;
		const {pixel, dpi, file_format, allow_bkg, def_bkg,inch_type } = inch_info;
		const {colorName, colorBGR} = allow_bkg[def_bkg]
		const fileName = new Date().getTime();
		Taro.setStorageSync('upload_fileName', `${fileName}`);
		uploadBase64Api({
      data: {
        image_base64: appStore.selectImageBase,
        user_id: 'kthhai',
				rows: pixel[0],
				cols: pixel[1],
				color_bgr: state.queryData.bgcolor || colorBGR, // '{"blue": "#0000FF", "red": "#FF0000", "white":"#FFFFFF"}',
				dpi,
				file_format: file_format,
				file_name: `${fileName}`,
				color_type: state.queryData.colorType || def_bkg,
				inch_type: inch_type
      }
    }).then((res) => {
			if (res.code == 200) {
				Taro.setStorageSync('upload_img', res.data.image || '');
				state.resultData.selectImageUrl = res.data.image ;
			}
    })
	}
	const layoutFn = () => {
		const {inch_info} = appStore.currentTemplateData;
		const {pixel, dpi, file_format, allow_bkg, def_bkg,inch_type } = inch_info;
		const {colorName, colorBGR} = allow_bkg[def_bkg]
		// const upload_img = Taro.getStorageSync('upload_img') || '';
		// const imgPath = upload_img.split('/').pop()
		// const imgPathArr = imgPath.split(`.${file_format}-`) || []
		// const fileName = imgPathArr.length ? imgPathArr[0] : '';
		const fileName = Taro.getStorageSync('upload_fileName');
		// console.log('upload_img', upload_img)
    layoutApi({
      data: {
				user_id: 'kthhai',
				file_name: fileName,
				// rows: pixel[0],
				// cols: pixel[1],
				color_type: state.queryData.colorType || def_bkg,
				inch_type: inch_type
      }
    }).then((res) => {
			if (res.code == 200) {
				state.resultData.layoutUrl = res.data.image
				// Taro.redirectTo({
				// 		url: `/pages/modify/index`,
        // })
			}
    })
  }

  const downloadFn = () => {
		const {current, resultData} = state;
		const {layoutUrl, selectImageUrl} = resultData;
		console.log('layoutUrl====', layoutUrl)
    appStore.saveImage(state.current == 1 ? selectImageUrl :layoutUrl );
		// Taro.redirectTo({
		// 		url: `/pages/confirm/index`,
		// })
  }
  // 更换背景色
	const handleBgChange = (colorType, colorBGR) => {
    state.queryData.bgcolor = colorBGR;
		state.queryData.colorType = colorType;
		appStore.$patch({
			color_type: colorType
		})
		state.current == 1 ? base64Fn() : layoutFn();
  }
  // 根据table切换不同的接口
	const tabChange = async (args) => {
		const {current, resultData} = state;
		const {layoutUrl, selectImageUrl} = resultData;
		if(state.current == 1 && !selectImageUrl) {
			await base64Fn()
		} else if(state.current == 2 && !layoutUrl) {
			await layoutFn()
		}
		orderDetailFn()
	}
	const orderDetailFn = () => {
		const {inch_info} = appStore.currentTemplateData;
		const {pixel, dpi, file_format, allow_bkg, def_bkg,inch_type } = inch_info;
		const {colorName, colorBGR} = allow_bkg[def_bkg]
		const fileName = Taro.getStorageSync('upload_fileName');
    orderDetailApi({
      data: {
				user_id: 'kthhai',
				file_name: fileName,
				color_type: appStore.color_type || def_bkg,
				inch_type: inch_type
      }
    }).then((res) => {
			if (res.code == 200) {
				Object.assign(state, res.data)
				// const {order_id, tips, single_photo, layout_photo, base_servers, added_services} =  res.data

				// Taro.redirectTo({
				// 		url: `/pages/modify/index`,
        // })
			}
    })
  }
</script>
<style lang="scss">

.page-wp {
  width: 100%;
  height: 100vh;     /* 很重要，如果设置成100%，页面内容过多时不会固定 */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0rpx;
  background: #F3F7FA;
}
.cate-content {
  flex: 1;    /* 很重要 */
  overflow-y:auto; /* 很重要，否则当该内容超过一屏时，尾部区域不会固定 */
  margin: 32rpx 0rpx;
  padding: 0rpx 32rpx;
}
.cate-footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  box-shadow: 0px 0 20px 0px rgba(41,42,111,0.16);
}
/* 规格信息 */
.cate-info {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
  box-sizing: border-box;
  margin-top: 32rpx;
}
.verify-img {
  width: 622rpx;
}
/* tab */
.tabs-swiper .ant-tabs-bar-scroll-view{
  width: 260rpx;
  justify-content:center;
  margin: 0 auto;
}
.tabs-swiper .ant-tabs-content {
  margin-top: 32rpx;
  /* padding: 0.32rem; */
  border-radius: 16rpx;
}
.tabs-swiper-second .ant-tabs-content{
  background: #F3F7FA;
}
.tabs-swiper .ant-tabs-bar-fade-left, .tabs-swiper .ant-tabs-bar-fade-right {
  display: none;
}
.tabs-bar {
  background: none;
  border-bottom: none !important;
}
// .nut-tabs__titles-item__smile .nut-icon {
// 	display:none;
// }
.nut-tabs .nut-tabs__titles .nut-tabs__titles-item.active .nut-tabs__titles-item__line {
	width:70rpx;
	bottom: -10rpx;
	height: 4rpx;
}
.nut-tabs__titles, .nut-tabs.horizontal > .nut-tabs__titles {
	width: 200rpx;
	margin: 0 auto;
}
</style>
