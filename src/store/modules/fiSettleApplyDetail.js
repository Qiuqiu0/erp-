const fiSettleApplyDetail = {
  state: {
    lockAmtTotal: "", //总收款金额（业务币）
  },
  mutations: {
    setLockAmtTotal(state, val) {
      state.lockAmtTotal = val;
    },
  }
};
export default fiSettleApplyDetail;