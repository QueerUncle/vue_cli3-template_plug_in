/**
 *  2018/10/17  lize
 */
import Vue from 'vue'
import App from './ccc.vue'
import 'iview/dist/styles/iview.css';
import iView from 'iview'

Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#ccc');
