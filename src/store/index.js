import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import tabs from './tabs';

import creditDetail from './modules/creditDetail';
import applyPaymentDetail from './modules/applyPaymentDetail';
import paymentDetail from './modules/paymentDetail';
import fiSettleApplyDetail from './modules/fiSettleApplyDetail';
import fiSettleExecuteDetail from './modules/fiSettleExecuteDetail';
import contraDelData from './modules/contraDelData';
const store = new Vuex.Store({
  state: {
    themecolor: '31478F', //默认为31478F
    route: '',
    rate: 1
  },
  mutations: {
    //更新主题颜色
    setThemeColor(state, curcolor) {
      this.state.themecolor = curcolor;
    },
    setRoute(state, value) {
      state.route = JSON.parse(
        JSON.stringify({
          params: value.params
        })
      );
    }
  },
  getters: {},
  modules: {
    tabs,
    creditDetail,
    applyPaymentDetail,
    paymentDetail,
    fiSettleApplyDetail,
    fiSettleExecuteDetail,
    contraDelData
  }
});
export default store;
