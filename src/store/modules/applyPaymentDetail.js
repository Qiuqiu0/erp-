const applyPaymentDetail = {
  state: {
    applyAmtTotal: "",
    applyInvoiceType: "", // 业务单据类型
    applyInvoiceArray: [], //业务单据
    searchOptions: {} //合同过滤条件
  },
  mutations: {
    setApplyAmtTotal(state, val) {
      state.applyAmtTotal = val;
    },
    setApplyInvoiceType(state, val) {
      state.applyInvoiceType = val;
    },
    setApplyInvoiceArray(state, val) {
      state.applyInvoiceArray = val;
      // payeeId: "", //	收款单位id
      // payeeCompanyCode: "", //	收款单位编码  //弹出框：选择供应商信息
      // payeeName: "", //	收款单位名称
      // 10540005: "框架协议",
      // 10540010: "采购订单",
      // 10540015: "销售订单",
      // 10540020: "费用明细"
      let item = val[0];
      switch (state.applyInvoiceType) {
        case 10540010:
          state.searchOptions = {
            companyCode: item.companyCode,
            orgCode: item.orgCode,
            supplierCode: item.supplierCode,
            currencyCode: ""
          };
          break;
        case 10540015:
          state.searchOptions = {
            companyCode: item.companyCode,
            orgCode: item.orgCode,
            custCode: item.custCode,
            originCurrencyCode: ""
          };
          break;
        case 10540020:
          state.searchOptions = {
            companyCode: item.companyCode,
            orgCode: item.orgCode,
            supplierCode: item.supplierCode,
            currencyCode: "",
            billType:item.billType
          };
          break;
        case 10540005:
          state.searchOptions = {
            companyCode: item.companyCode,
            orgCode: item.orgCode,
            supplierCode: item.supplierCode,
            custCode: item.custCode,
            currencyCode: ""
          };
          break;
        default:
          break;
      }
    },
    setContractSearchOptions(state, val) {
      state.searchOptions = val;
    }
  },
  actions: {},
  getters: {}
};
export default applyPaymentDetail;
