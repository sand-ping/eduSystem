// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueResource from 'vue-resource';
import Http from '@/public/http'
import PraTitle from '@/public/components/pra-title'
Vue.use(ElementUI);
Vue.use(VueResource);

Vue.prototype.Http = Http;     //设置全局请求方法
Vue.component('pra-title',PraTitle);   //注册全局组件

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    'App':App
  },
  template: '<App/>'
})
