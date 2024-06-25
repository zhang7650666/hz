<template>
<view class="page">
    <view class="page-section">
        <view class="page-section-demo">
            <nut-swiper
            :init-page="state.initpage"
            :auto-play="3000"
            pagination-visible
            pagination-color="#426543"
            pagination-unselected-color="#808080"
          >
            <nut-swiper-item v-for="(item, index) in props.list" :key="index" style="height: 135px">
              <img :src="item" alt="" style="height: 100%; width: 100%" draggable="false" />
            </nut-swiper-item>
          </nut-swiper>
        </view>
    </view>
</view>

</template>
<script setup lang="ts">

import { reactive } from 'vue';

const props = defineProps<{
  list: string[]
}>()

const state = reactive({
  background: ['blue', 'red', 'yellow'],
  initpage: 2,
  autoplay: true,
  interval: 2000,
})

// const {initpage, list} = toRefs(state);
// const {list} = toRefs(props);
</script>
<style lang="scss">
.swiper-img {
  width: 686px;
  height: 270px;
  background-size: 686px;
  height: 270px;
}
</style>
