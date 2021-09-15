const paymentDetail = {
  state: {
    payAmtTotal: 0,
    paymentMain: {}, //付款单抬头
    documentType: "", //业务单据类型
    baseCurrencyRate: "",//本位币汇率
  },
  mutations: {
    setPayAmtTotal(state, val) {
      state.payAmtTotal = val;
    },
    setBaseCurrencyRate(state, val) {
      state.baseCurrencyRate = val;
    },
    setPaymentMain(state, val) {
      state.paymentMain = val
      state.documentType = val.applyInvoiceType?val.applyInvoiceType:'' // 确认业务单据类型
      state.baseCurrencyRate = val.baseCurrencyRate // 确认业务单据类型
    }
  },
  actions: {},
  getters: {}
};
export default paymentDetail;