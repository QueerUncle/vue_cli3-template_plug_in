/**
 *  2018/10/17  lize
 */
import Vue from 'vue'
import App from './ccc.vue'
import 'iview/dist/styles/iview.css';
import iView from 'iview'
import store from './store'

Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#ccc');
