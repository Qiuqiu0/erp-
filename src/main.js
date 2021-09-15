import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import ElementUI from 'element-ui';
import './assets/css/theme/31478F/index.css'; //主题颜色
import './assets/css/common.scss';
import Vuex from './store/index';
import './utils';
import Bus from './assets/js/eventBus';
import importDirective from '@/directives/index.js';
import importFilter from '@/filters/index.js';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import Print from './print.js';//打印
import ZlSelect from './components/zl-select/src/select'
import ZlOption from './components/zl-select/src/option'
Vue.component(ZlSelect.name, ZlSelect);
Vue.component(ZlOption.name, ZlOption);
//标题
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueAwesomeSwiper);

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(importDirective); //引入指令
Vue.use(importFilter); //引入过滤器
Vue.use(Print);
Vue.use(VueWechatTitle);
new Vue({
  router,
  store,
  data: {
    Bus
  },
  render: h => h(App)
}).$mount('#app');
