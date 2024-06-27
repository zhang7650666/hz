import { defineStore } from 'pinia';
import { useRoutePath } from '@/composables';
import {inchtypesApi} from '@/api/hz/index';
import Taro from '@tarojs/taro';
const plat_env = Taro.getEnv();

interface TabInfo {
  [key: string]: any,
};

interface Tabs {
  tableId: number | string,
  tableName: string,
  inchInfos: TabInfo[],
  selectImageUrl: string,
}

interface AuthState {
  /** 用户信息 */
  activeTab: string;
  userInfo: null;
  tabs: Tabs,
  allTemplateList: TabInfo[],
  currentTemplateData: TabInfo,
}


  // 保存相册失败提示
  export const saveToPhotosAlbumErrTips = (err) => {
    const systemInfo = Taro.getSystemInfoSync();
    const platform = systemInfo.platform.toLowerCase();
    if (platform === 'ios') {
       // 用户拒绝授权，可以引导用户到设置页开启
      Taro.showModal({
        title: '开启照片权限',
        content: '请在设置中，打开权限开关',
        success(modalRes) {
          if (modalRes.confirm) {
            Taro.openSetting({
              success(settingData) {
                // 引导用户到设置页，返回设置结果
              }
            })
          }
        }
      })
    } else if (platform === 'android') {
      console.error('保存图片失败: ', '请在系统设置找到支付宝应用并开启文件和多媒体写入权限', JSON.stringify(err));
      Taro.showToast({
        title: '保存图片失败， 请在系统设置找到应用并开启文件和多媒体写入权限',
        icon: 'error',
        duration: 2000
      })
    }
  }

export const useAppStore = defineStore('app-store', {
  state: (): AuthState => ({
    activeTab: useRoutePath(),
    tabs: [],
    allTemplateList: [],
    selectImageUrl: '',
    selectImageBase: '',
    currentTemplateData: {}
  }),
  getters: {
    getActiveTab: state => state.activeTab
  },
  actions: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
    /** 重置app状态 */
    resetAuthStore() {
      this.$reset();
    },
    getTemplateList(){
      if (this.tabs.length > 0) return ;
      return inchtypesApi({}).then((res) => {
          if (res.code == 200) {
            this.tabs = [{
              inchInfos: [],
              tableId: 'all',
              tableName: '全部'
            }].concat(res.data);

            this.allTemplateList = res.data.reduce((list, item) => {
              list = list.concat(item.inchInfos);
              return list;
            }, [])
          }
      })
    },
    saveImage(url: string){
      return new Promise((resolve, reject) => {
        // Taro.saveImageToPhotosAlbum, 支付宝小程序 在ios上不能并发，所以使用原生API
        Taro.saveImageToPhotosAlbum ({
          filePath: url || '',
          success: ()  => {
            resolve({});
          },
          fail:(err: any) => {
            saveToPhotosAlbumErrTips(err);
            reject({});
          }
        })
      })

    }
  }
});
