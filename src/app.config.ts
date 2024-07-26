export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/order-detail/index',
    'pages/confirm/index',
    'pages/abount/index',
    'pages/order-list/index',
    'pages/my/index',
    'pages/modify/index',
    'pages/category/index',
    'pages/verify/index',
    'pages/search/index',
		'pages/proto/index',
  ],
  window: {
    backgroundColor: '#fff',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro3',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  subpackages: [
    {
      root: 'package',
      pages: ['package-a/index', 'package-b/index', 'package-c/index', 'icon/index']
    }
  ],
  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#FF0000',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '证件照'
      },
      {
        pagePath: 'pages/my/index',
        text: '我的'
      }
    ]
  }
});
