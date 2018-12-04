import Vue from 'vue'

import App from './App.vue'

import iView from 'iview'

import iEditor from 'iview-editor';

import 'iview/dist/styles/iview.css';

import 'iview-editor/dist/iview-editor.css';

import axios from './axios.js'

import '../static/UE/ueditor.config'

import '../static/UE/ueditor.all.min'

import '../static/UE/lang/zh-cn/zh-cn'

import '../static/UE/themes/default/css/ueditor.min.css'

import VueQuillEditor  from 'vue-quill-editor'

import 'quill/dist/quill.core.css'

import 'quill/dist/quill.snow.css'

import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor);

// import  '../static/UE/ueditor.parse.min'

Vue.use(iView);

Vue.use(iEditor);


console.log(iView);

console.log(VueQuillEditor);

Vue.config.productionTip = false;

Vue.prototype.$http = axios.AXIOS;

Vue.prototype.asdasd = '1';

// new Vue({
//   render: h => h(App)
// }).$mount('#app')
new Vue({
    el:'#app',
    render: h => h(App)
})
