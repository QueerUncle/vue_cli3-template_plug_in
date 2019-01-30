/**
 *  2019/1/11  lize
 */
const utils  = require('./utils/utils');
module.exports = {
  pages:utils.getPages('/static/'),
  baseUrl: '/static/',
  outputDir: './dist/static/',

  // assetsDir: '',

  devServer: {
    port: 8888, // 端口号
    host: '0.0.0.0', //可访问格式
    open: false, //配置自动启动浏览器
    disableHostCheck: true,
    // proxy: 'http://10.80.12.134:24680/api'
    proxy: {

      '/api': {

        target: 'http://qywx.cbim.org.cn',

        changeOrigin: true,

        pathRewrite: {

          '^/static/api': '/api'

        }

      }

    }
    
  },

  lintOnSave: false
};
