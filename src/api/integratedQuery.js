import { service, serviceJson } from "../axios/index";
let base = window.ROOT_PATH.suffix1;
let report = window.ROOT_PATH.suffix5;

//库存账龄表
export const accountAgeList = data => {
  return serviceJson({
    url: report + "/report/inventory/account/age",
    method: "post",
    data
  });
};
//库存账龄表导出	
export const accountAgeExport = data => {
    return serviceJson({
      url: report + "/report/inventory/account/age/export",
      method: "post",
      responseType: 'blob',
      data
    });
  };
  //库存账龄表合计
  export const accountAgeListSum = data => {
    return serviceJson({
      url: report + "/report/inventory/account/age/sum",
      method: "post",
      data
    });
  };
//开票清单

export const invoiceSalesList = data => {
    return serviceJson({
      url: report + "/invoice/sales",
      method: "post",
      data
    });
  };
  //开票清单导出
export const invoiceSalesExport = data => {
  return serviceJson({
    url: report + "/invoice/sales/export",
    method: "post",
    responseType: 'blob',
    data
  });
}; 
//开票清单合计
export const invoiceSalesSum = data => {
  return serviceJson({
    url: report + "/invoice/sales/sum",
    method: "post",
    data
  });
};
//字典表查询
export const dicQuery = data => {
    return serviceJson({
      url: base + "/base/sys/dic/select.do",
      method: "post",
      params: data
    });
  };
//内贸采购提货情况表
export const odPoContractDeliveryList = data => {
  return serviceJson({
    url: report + "/poContract/selectOdPoContractDeliverySituationDomesticTrade.do",
    method: "post",
    data
  });
};
//内贸采购合同导出
export const exportOdPoContract = data => {
  return serviceJson({
    url: report + "/poContract/exportOdPoContractDeliverySituationDomesticTrade.do",
    method: "post",
    responseType: 'blob',
    data
  });
};
//内贸采购合计
export const selectOdPoContractSum = data => {
  return serviceJson({
    url: report + "/poContract/selectOdPoContractDeliverySituationDomesticTradeSum.do",
    method: "post",
    data
  });
};
//进口采购交货情况
export const odPoContractPortList = data => {
  return serviceJson({
    url: report + "/poContract/selectOdPoContractPortImportPurchases.do",
    method: "post",
    data
  });
};
//进口采购导出情况
export const exportOdPoContractPort = data => {
  return serviceJson({
    url: report + "/poContract/exportOdPoContractPortImportPurchases.do",
    method: "post",
    responseType: 'blob',
    data
  });
};
//进口采购合同合计
export const electOdPoContractPortSum = data => {
  return serviceJson({
    url: report + "/poContract/selectOdPoContractPortImportPurchasesSum.do",
    method: "post",
    data
  });
};
//销售合同提货情况表
export const odSoContractList = data => {
  return serviceJson({
    url: report + "/soContract/selectOdSoContractPickUpCondition.do",
    method: "post",
    data
  });
};
//报表7：导出销售合同提货情况报表：
export const exportOdSoContract = data => {
  return serviceJson({
    url: report + "/soContract/exportOdSoContractPickUpCondition.do",
    method: "post",
    responseType: 'blob',
    data
  });
};

//查询销售合同提货情况报表-合计：
export const selectOdSoContractSum = data => {
  return serviceJson({
    url: report + "/soContract/selectOdSoContractPickUpConditionSum.do",
    method: "post",
    data
  });
};

//提单清单
export const doListReport = data => {
  return serviceJson({
    url: report + "/do/list/report",
    method: "post",
    data
  });
};
  //提单清单导出
  export const doListExport = data => {
    return serviceJson({
      url: report + "	/do/list/export",
      method: "post",
      responseType: 'blob',
      data
    });
  }; 
  //提单清单合计
  export const doListReportSum = data => {
    return serviceJson({
      url: report + "/do/list/report/sum",
      method: "post",
      data
    });
  };
  
/// 信用证开证付汇清单报表 
export const creditCertPaymentReport = data => {
  return serviceJson({
    url: report + "/credit/cert/payment/report",
    method: "post",
    data
  });
};
//导出信用证开证付汇清单报表
export const creditCertPaymentExport = data => {
  return serviceJson({
    url: report + "/credit/cert/payment/export",
    method: "post",
    responseType: 'blob',
    data
  });
};
//信用证开证付汇清单报表合计
export const creditCertPaymentReportSum = data => {
  return serviceJson({
    url: report + "/credit/cert/payment/report/sum",
    method: "post",
    data
  });
};
//供应商预付款查询报表
export const supplierAdvancePayment = data => {
  return serviceJson({
    url: report + "/poContract/selectSupplierAdvancePaymentList.do",
    method: "post",
    data
  });
};
//，客户应收款查询报表
export const customerAccountsGathering = data => {
  return serviceJson({
    url: report + "/soContract/selectCustomerAccountsGatheringList.do",
    method: "post",
    data
  });
};
//供应商预付款报表导出
export const exportSupplierAdvancePaymentList = data => {
  return serviceJson({
    url: report + "/poContract/exportSupplierAdvancePaymentList.do",
    method: "post",
    responseType: 'blob',
    data
  });
}; 
//，客户应收款报表导出
export const exportCustomerAccountsGatheringList = data => {
  return serviceJson({
    url: report + "/soContract/exportCustomerAccountsGatheringList.do",
    method: "post",
    responseType: 'blob',
    data
  });
}; 