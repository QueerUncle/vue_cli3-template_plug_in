import Vue from 'vue'

import store from './vuex'

import router from './router'

import Http from '../../extend/http'

import fs from '../../extend/fs'

import MintUI from 'mint-ui'

import 'mint-ui/lib/style.css'

import Vant from 'vant';

import 'vant/lib/index.css';

import App from './App.vue'

Vue.use(MintUI);

Vue.use(Vant);

Vue.use(Http,['$http','$cancel']);

Vue.prototype.$fs  =  fs;

Vue.prototype.$wx  =  wx;

console.log(Vue.prototype.$wx);

Vue.config.productionTip = false;

new Vue({
  
  store,
  
  router,
  
  render: h => h(App),
  
}).$mount('#app');
