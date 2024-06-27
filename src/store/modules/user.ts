import { defineStore } from 'pinia';
import { useRoutePath } from '@/composables';
import {loginApi} from '@/api/hz/index';
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
  userInfo: null;
}


export const useUserStore = defineStore('user-store', {
  state: (): AuthState => ({
		userInfos: {}
  }),
  getters: {
  },
  actions: {
    // 获取用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        // 用户信息已经存在直接返回
        if (this.userInfo) resolve(this.userInfo);
				wx.login({
					success (res) {
						console.log('res===', res)
						if (res.code) {
							loginApi({code: res.code}).then((user) => {
								console.log('user===', user)
							})

						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
        // my.getAuthCode({
        //   scopes: ['auth_user'],
        //   success: authcode => {
        //     console.info(authcode);

        //     my.getAuthUserInfo({
        //       success: res => {
        //         this.userInfo = res;
        //         resolve(this.userInfo);
        //       },
        //       fail: () => {
        //         reject({});
        //       }
        //     });
        //   },
        //   fail: () => {
        //     reject({});
        //   }
        // });
      });
    },

  }
});
