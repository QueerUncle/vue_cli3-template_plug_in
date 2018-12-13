/**
 *  2018/10/17  lize
 */
import Vue from 'vue'

import App from './index.vue'

import iView from 'iview'

import '../../components/quill/font.css'

import 'iview/dist/styles/iview.css';

import 'iview-editor/dist/iview-editor.css';

import asdasd from '../../axios';

// import VueQuillEditor  from 'vue-quill-editor'

// import 'quill/dist/quill.core.css'
//
// import 'quill/dist/quill.snow.css'
//
// import 'quill/dist/quill.bubble.css'

// Vue.use(VueQuillEditor);

Vue.use(iView);

Vue.config.productionTip = false;

Vue.prototype.qwer = asdasd

new Vue({
  render: h => h(App)
}).$mount('#index');
