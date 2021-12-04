import Vue from 'vue'
import App from './App.vue'
import router from './router'
//公共样式
import './assets/comment/comment.css'
// ElementUI 组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// axios 数据请求
import axios from 'axios'
import VueAxios from 'vue-axios'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

//  require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)


Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
