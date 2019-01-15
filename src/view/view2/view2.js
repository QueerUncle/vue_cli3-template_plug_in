/**
 *  2018/10/17  lize
 */
import Vue from 'vue'

import App from './view2.vue'

import iView from 'iview'

import router from './router'

import store from './vuex'

import 'iview/dist/styles/iview.css';

import MuseUI from 'muse-ui';

import 'muse-ui/dist/muse-ui.css';

import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

import fs from './fs/fs'

import Http from '../../axios'

Vue.config.productionTip = false;

Vue.prototype.$fs = fs;

// Vue.prototype.$http = AXIOS;

Vue.use(iView);

Vue.use(MuseUI);

Vue.use(ElementUI);

Vue.use(Http,['$http','$cancel']);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#view2');
