// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import Marked from 'marked';
import Axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import App from './views/App';
import router from './router';
import store from './store';
import Marked from './helpFunctions/marked';
import './axios/';


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Marked);
// 全局加载resource拦截器
Vue.prototype.$http = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
