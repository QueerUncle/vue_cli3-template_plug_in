import Vue from 'vue'

import store from './vuex'

import router from './router'

import Http from '../../extend/http'

import fs from '../../extend/fs'

import Vant from 'vant';

import 'vant/lib/index.css';

import '../../../public/reset.css';

import App from './App.vue'

import MuseUI from 'muse-ui';

import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);

Vue.use(Vant);

Vue.use(Http,['$http','$cancel']);

Vue.prototype.$fs  =  fs;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  
  window.scrollTo(0,0);
  
  if (to.meta.title) {
    
    document.title = to.meta.title
    
  }
  
  next()
  
});

new Vue({
  
  store,
  
  router,
  
  render: h => h(App),
  
}).$mount('#app');
