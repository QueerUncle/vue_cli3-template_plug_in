/**
 *  2018/9/20  lize
 */

const utils  = require('./utils/utils');

const deObj = require('./edc')

console.log(process.env.NODE_ENV,'22222222222222222222222222')
console.log(process.env.ASD,'22222222222222222222222222')

console.log(deObj,'3333333333333333333333333333333333333')

module.exports = {
  
  baseUrl:'./',
  // 将部署应用程序的基本URL
  // 将部署应用程序的基本URL。
  // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
  // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集baseUrl到'/my-app/'.
  
  // baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : '/',
  
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  
  // outputDir: 'dist',
  
  // pages:{ type:Object,Default:undfind }
  /*
   构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
   个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
   的字符串，
   注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
   */
  pages: utils.getPages(),
  
  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  lintOnSave: false,
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,
  // devServer:{type:Object} 3个属性host,port,https
  // 它支持webPack-dev-server的所有选项
  
  devServer: {
    port: 8085, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      '/api': {
        target:'http://127.0.0.1:8088',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''  // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        }
      },
    },  // 配置多个代理
  },
};
