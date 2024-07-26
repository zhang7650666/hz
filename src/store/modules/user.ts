import { defineStore } from 'pinia';
import { useRoutePath } from '@/composables';
import {loginApi} from '@/api/hz/index';
import Taro from '@tarojs/taro';
const plat_env = Taro.getEnv();

interface TabInfo {
  [key: string]: any,
};

interface Tabs {
  table_id: number | string,
  table_name: string,
  inchInfos: TabInfo[],
  selectImageUrl: string,
}

interface AuthState {
	code: string;
  userInfo: null;
}


export const useUserStore = defineStore('user-store', {
  state: (): AuthState => ({
		userInfos: {},
		code: '1111'
  }),
  getters: {
  },
  actions: {
    // 获取用户信息
    getUserInfo() {
			const that = this;
      return new Promise((resolve, reject) => {
        // 用户信息已经存在直接返回
        if (this.userInfo) resolve(this.userInfo);
				wx.login({
					success (res) {
						console.log('res===', res)
						if (res.code) {
							that.code = res.code;
							loginApi({params: {code: res.code}}).then((user) => {
								if(user.code === 200) {
									Taro.setStorageSync('token', user.data);
									console.log('user===', user)
								}
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
