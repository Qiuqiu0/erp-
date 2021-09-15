const fiSettleExecuteDetail = {
  state: {
    execLockAmtTotal: "", //执行锁汇金额金额
    executeType: 10750005,  //执行类型
    salesType:10720005, //类型
  },
  mutations: {
    setExecLockAmtTotal(state, val) {
      state.execLockAmtTotal = val;
    },
    setExecuteType(state, val) {
      state.executeType = val;
    },
    setSalesType(state, val) {
      state.salesType = val;
    },
  }
};
export default fiSettleExecuteDetail;