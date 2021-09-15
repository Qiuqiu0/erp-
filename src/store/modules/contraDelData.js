const contraDelData = {
  state: {
    sbCon: {
      contractId: `11`, //双边合同ID
      version: `` //双边合同版本
    },
    xsCon: {
      soContractId: ``, //销售合同ID
      version: `` //销售合同版本
    },
    cgCon: {
      poId: ``, //采购合同ID
      version: `` //采购合同版本
    }
  },
  mutations: {
    sbDel(state, e) {
      state.sbCon = e;
    },
    xsDel(state, e) {
      state.xsCon = e;
    },
    cgDel(state, e) {
      state.cgCon = e;
    }
  },
  actions: {},
  getters: {}
};
export default contraDelData;