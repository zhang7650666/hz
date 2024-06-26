<script setup lang="ts">
import { computed } from 'vue';
import { switchTab } from '@tarojs/taro';
import { useAppStore, useThemeStore } from '@/store';
import homeIcon from '@/assets/images/home.png';
import homeActiveIcon from '@/assets/images/home_active.png';
import myIcon from '@/assets/images/my.png';
import myActiveIcon from '@/assets/images/my_active.png';

const tabBar = {
  custom: true,
  color: '#000000',
  selectedColor: '#FF0000',
  list: [
    {
      pagePath: '/pages/index/index',
      text: '证件照',
      iconPath: homeIcon,
			selectedIconPath: homeActiveIcon
    },
    {
      pagePath: '/pages/my/index',
      text: '我的',
			iconPath: myIcon,
			selectedIconPath: myActiveIcon
    }
  ]
};

const themeStore = useThemeStore();
const theme = computed(() => themeStore.theme);
const themeVars = computed(() => themeStore.themeVars);

const appStore = useAppStore();
const activeTab = computed(() => appStore.getActiveTab);
function tabSwitch(item: any, url: string) {
  appStore.setActiveTab(url);
  switchTab({ url });
}
</script>
<script lang="ts">
export default {
  options: {
    addGlobalClass: true
  }
};
</script>
<template>
  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <nut-tabbar :model-value="activeTab" bottom safe-area-inset-bottom @tab-switch="tabSwitch">
      <nut-tabbar-item v-for="item in tabBar.list" :key="item.pagePath" :name="item.pagePath" :tab-title="item.text">
				<template #icon="props">
       	 	<img :src="props.active ? item.selectedIconPath : item.iconPath" alt="" />
      	</template>
      </nut-tabbar-item>
    </nut-tabbar>
  </nut-config-provider>
</template>

<style lang="scss"></style>
