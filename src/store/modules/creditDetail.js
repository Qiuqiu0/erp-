const creditDetail = {
  state: {
    currentcyRateBase: "", //汇率(本位币)
    currencyRateRmb: "", //汇率（人民币）
    payeeAmtOriginTotal: "", //总收款金额（业务币）
    isSales:false,
  },
  mutations: {
    setCurrentcyRateBase(state, val) {
      state.currentcyRateBase = val;
    },
    setCurrencyRateRmb(state, val) {
      state.currencyRateRmb = val;
    },
    setPayeeAmtOriginTotal(state, val) {
      state.payeeAmtOriginTotal = val;
    },
    setIsSales(state, val){
      state.isSales = val;
    }
  },
  actions: {},
  getters: {}
};
export default creditDetail;
