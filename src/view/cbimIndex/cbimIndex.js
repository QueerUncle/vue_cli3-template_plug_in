/**
 *  2018/12/13  lize
 */
import Vue from 'vue'

import App from './App'

import router from './router'

import store from './vuex'

import http from './http/axios'

import iView from 'iview'

import 'iview/dist/styles/iview.css';

import '../../../public/reset.css';

import '../../../public/font/iconfont.css';

Vue.use(iView);

Vue.config.productionTip = false;

Vue.prototype.$http = http;

new Vue({

  router,

  store,

  render: h => h(App)

}).$mount('#app');
