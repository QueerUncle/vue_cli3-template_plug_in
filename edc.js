/**
 *  2018/11/12  lize
 */

let obj = {

  a:2,

  b:3

}

switch (process.env.NODE_ENV) {
  case 'development':
    obj.a = 'development'
    // baseUrl = "http://localhost:57156/"  //这里是本地的请求url
    baseUrl = "http://localhost:57156/"  //这里是本地的请求url
    break
  case 'alpha':   // 注意这里的名字要和步骤二中设置的环境名字对应起来
    // baseUrl = "http://www.cnblogs.com/XHappyness/"  //这里是测试环境中的url

    obj.a = 'alpha'
    baseUrl = "http://www.cnblogs.com/XHappyness/"  //这里是测试环境中的url
    break
  case 'production':

    obj.a = 'production'    // baseUrl = "https://www.cnblogs.com/XHappyness/p/7686267.html"   //生产环境url
    baseUrl = "https://www.cnblogs.com/XHappyness/p/7686267.html"   //生产环境url
    break
}

module.exports = {obj:obj}
