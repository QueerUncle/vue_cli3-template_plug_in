/**
 *  2018/10/17  lize
 */
import Vue from 'vue'
import App from './view2.vue'

import iView from 'iview'

import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;

Vue.use(iView);


new Vue({
  render: h => h(App)
}).$mount('#view2');
