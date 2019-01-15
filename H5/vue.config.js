/**
 *  2019/1/11  lize
 */
const utils  = require('./utils/utils');
module.exports = {
  pages:utils.getPages(),
  baseUrl: "",
  outputDir: "dist",
  assetsDir: "",
  devServer: {
    port: 8888, // 端口号
    host: '0.0.0.0', //可访问格式
    open: false, //配置自动启动浏览器
    disableHostCheck: true,
    // proxy: 'http://api.china-bim.org/mock/16'
  },

  lintOnSave: false
};
