import Vue from 'vue'

import store from './vuex'

import router from './router'

import Http from '../../extend/http'

import fs from '../../extend/fs'

import '../../../public/reset.css';

import App from './App.vue'

import Schart from 'vue-schart';

import VCharts from 'v-charts';

import MuseUI from 'muse-ui';

import JsPdf from '../../extend/jsPdf/jsPdf';

import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);

Vue.use(Http,['$http','$cancel']);

Vue.use(VCharts);

Vue.use(JsPdf);

Vue.component("Schart",Schart);

Vue.prototype.$fs  =  fs;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  
  Window.Scroll = 0;
  
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
