import { defineStore } from 'pinia';

type ConfigProviderTheme = 'light' | 'dark';
interface AuthState {
  theme: ConfigProviderTheme;
  themeVars: object;
}

const primaryColor = '#0094FF';
const successColor = '#0ABF5A';
const warningColor = '#F29324';
const dangerColor = '#FA4F4F';

export const useThemeStore = defineStore('theme-store', {
  state: (): AuthState => ({
    theme: 'light',
    // 可设置的变量，请参考：https://github.com/jdf2e/nutui/blob/v4/src/packages/styles/variables.scss
    themeVars: {
      primaryColor,
      primaryColorEnd: primaryColor,
      navbarPadding: '0 0',
      navbarTitleFontColor: '#000',
      navbarTitleFont: '18px',
      navbarTitleFontWeight: '500',

      buttonBorderRadius: '4px',

      buttonSuccessBackgroundColor: successColor,
      notifySuccessBackgroundColor: successColor,
      tagSuccessBackgroundColor: successColor,

      buttonWarningBackgroundColor: warningColor,
      notifyWarningBackgroundColor: warningColor,
      tagWarningBackgroundColor: warningColor,

      buttonDangerBackgroundColor: dangerColor,
      notifyDangerBackgroundColor: dangerColor,
      tagDangerBackgroundColor: dangerColor,

      tabsTitlesItemActiveColor: primaryColor,
      tabsTitlesItemColor: 'var(--n-400)',
      tabsTitlesBackgroundColor: 'transparent',
      tabsHorizontalTitlesItemActiveLineWidth: '20px',
      tabsTitlesItemLineBorderRadius: '2px',
      tabsHorizontalTabLineColor: primaryColor,

      menuItemActiveTextColor: 'var(--n-800)',
      menuItemTextColor: 'var(--n-400)',
      menuBarBoxShadow: 'none'
    }
  }),
  getters: {
    getTheme: state => state.theme,
    getThemeVars: state => state.themeVars
  },
  actions: {
    /** 设置系统主题 */
    setTheme(theme: ConfigProviderTheme) {
      this.theme = theme;
    },
    /** 设置系统主题颜色 */
    setThemeVars(vars: object) {
      Object.assign(this.themeVars, vars);
    }
  }
});
