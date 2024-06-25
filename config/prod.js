module.exports = {
  env: {
    NODE_ENV: '"production"',
    HTTP_URL: '"https://getman.cn/mock"'
  },
  defineConstants: {
    __VUE_PROD_DEVTOOLS__: JSON.stringify(true)
  },
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
};
