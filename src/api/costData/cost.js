import { service, serviceJson } from "../../axios/index";
let base = window.ROOT_PATH.suffix1;
let business = window.ROOT_PATH.suffix2;
let capital = window.ROOT_PATH.suffix3;
let report=window.ROOT_PATH.suffix5;

//费用预提列表
const costPrefetchList = data => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/listV2",
    method: "post",
    data
  });
};

//费用预提创建
const costPrefetchInsert = data => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/insert",
    method: "post",
    data
  });
};
//费用预提总计
const getCostPrefetchSumV2 = data => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/getCostPrefetchSumV2.do",
    method: "post",
    data
  });
};
//费用预提主数据获取
const costPrefetchGet = data => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/queryByPrefetchId",
    method: "post",
    params: data
  });
};

//费用预提费用信息获取
const costPrefetchCostGet = data => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/queryByItemsId",
    method: "post",
    params: data
  });
};

//费用预提修改
const costPrefetchUpdate = data => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/update",
    method: "post",
    data
  });
};

//费用预提删除
const costPrefetchDelete = data => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/delete",
    method: "post",
    data
  });
};

//费用预提提交
const costPrefetchSubmit = data => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/submit",
    method: "post",
    data
  });
};

//费用预提审核
const costPrefetchCheck = data => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/approve",
    method: "post",
    data
  });
};

//费用预提冲销
const costPrefetchReverse = data => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/writeOff",
    method: "post",
    data
  });
};

//采购环节弹窗列表
const purchaseLinkList = data => {
  return serviceJson({
    url: business + "/business/purchase/wv/wvWindowSelect",
    method: "post",
    data
  });
};

//销售环节弹窗列表
const salesLinkList = data => {
  return serviceJson({
    url: business + "/saleOrderManager/saleWindowSelect.do",
    method: "post",
    data
  });
};
//销售环节弹窗列表===接口
const salesLinkList2 = data => {
  return serviceJson({
    url: business + "/saleOrderManager/saleWindowSelect2.do",
    method: "post",
    data
  });
};
//删除费用预提费用信息行
const costDelete = data => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/deleteItems",
    method: "post",
    data
  });
};

//删除费用预提分摊信息行
const shareDelete = data => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/deleteItemsDetail",
    method: "post",
    data
  });
};

//费用预提分摊信息采购入库单列表
const costPrefetchPurchaseList = data => {
  return serviceJson({
    url: business + "/business/purchase/wv/getWvListByWvnos",
    method: "post",
    data
  });
};

//费用预提分摊信息销售出库单列表
const costPrefetchSalesList = data => {
  return serviceJson({
    url: business + "/saleOrderManager/getDoListByDonos",
    method: "post",
    data
  });
};

//费用类别列表
const costCategoryList = data => {
  return serviceJson({
    url: capital + "/capital/costCategory/list",
    method: "post",
    data
  });
};

//费用类别创建
const costCategoryInsert = data => {
  return serviceJson({
    url: capital + "/capital/costCategory/insert",
    method: "post",
    data
  });
};

//费用类别修改
const costCategoryUpdate = data => {
  return serviceJson({
    url: capital + "/capital/costCategory/update",
    method: "post",
    data
  });
};

//费用类别删除
const costCategoryDelete = data => {
  return serviceJson({
    url: capital + "/capital/costCategory/delete",
    method: "post",
    data
  });
};

//费用结算列表
const costSettleList = data => {
  return serviceJson({
    url: capital + "/capital/costSettle/listV2",
    method: "post",
    data
  });
};
//费用结算总计
const getCostSettleSumV2 = data => {
  return serviceJson({
    url: capital + "/capital/costSettle/getCostSettleSumV2.do",
    method: "post",
    data
  });
};
//费用结算创建
const costSettleInsert = data => {
  return serviceJson({
    url: capital + "/capital/costSettle/insert",
    method: "post",
    data
  });
};

//费用结算主数据获取
const costSettleGet = data => {
  return serviceJson({
    url: capital + "/capital/costSettle/queryCostBySettleId",
    method: "post",
    params: data
  });
};

//费用结算费用信息获取
const costSettleCostGet = data => {
  return serviceJson({
    url: capital + "/capital/costSettle/queryBySettleId",
    method: "post",
    params: data
  });
};

//费用结算修改
const costSettleUpdate = data => {
  return serviceJson({
    url: capital + "/capital/costSettle/update",
    method: "post",
    data
  });
};

//费用结算删除
const costSettleDelete = data => {
  return serviceJson({
    url: capital + "/capital/costSettle/delete",
    method: "post",
    data
  });
};

//费用结算提交
const costSettleSubmit = data => {
  return serviceJson({
    url: capital + "/capital/costSettle/submit",
    method: "post",
    data
  });
};

//费用结算审核
const costSettleCheck = data => {
  return serviceJson({
    url: capital + "/capital/costSettle/approve",
    method: "post",
    data
  });
};

//费用结算冲销
const costSettleReverse = data => {
  return serviceJson({
    url: capital + "/capital/costSettle/writeOff",
    method: "post",
    data
  });
};

//预提结算弹窗列表
const prefetchSettleList = data => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/getPrefetchCostsWindow",
    method: "post",
    data
  });
};

//无预提结算弹窗列表
const noPrefetchSettleList = data => {
  return serviceJson({
    url: business + "/saleOrderManager/saleAndPurchaseWindowSelect.do",
    method: "post",
    data
  });
};

//删除费用结算费用信息行
const costDeleteAnother = data => {
  return serviceJson({
    url: capital + "/capital/costSettle/deleteItems",
    method: "post",
    data
  });
};

//删除费用结算分摊信息行
const shareDeleteAnother = data => {
  return serviceJson({
    url: capital + "/capital/costSettle/deleteItemsDetail",
    method: "post",
    data
  });
};

//根据预提单费用信息获取结算单费用信息和分摊信息
const costSettleFromPrefetch = data => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/queryItemsId",
    method: "post",
    data
  });
};

//根据公司查询本位币币种
const baseCurrencyQuery = data => {
  return serviceJson({
    url: base + "/base/company/selectBbCompanyBaseVoByCode.do",
    method: "post",
    params: data
  });
};

//根据公司查询日期选择范围
const limitTimeQuery = data => {
  return serviceJson({
    url: capital + "/capital/monthbanlance/getAccountPeriodByCompany.do",
    method: "post",
    params: data
  });
};

//汇率查询
const rateQuery = data => {
  return serviceJson({
    url: base + "/base/data/parities/getParitiesByCode.do",
    method: "post",
    params: data
  });
};

//字典表查询
const dicQuery = data => {
  return serviceJson({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    params: data
  });
};
//费用预提报表查询
const prefetchReport = data => {
  return serviceJson({
    url: report + "/report/cost/prefetch",
    method: "post",
    data
  });
};
//费用预提报表导出
export const costPrefetchExport = data => {
  return serviceJson({
    url: report + "/report/cost/prefetch/export",
    method: "post",
    responseType: 'blob',
    data
  });
};
//费用预提报表合计	
const prefetchReportSum = data => {
  return serviceJson({
    url: report + "/report/cost/prefetch/sum",
    method: "post",
    data
  });
};
//费用结算报表查询
const settleReport = data => {
  return serviceJson({
    url: report + "/report/cost/settle",
    method: "post",
    data
  });
};
//费用结算报表导出
export const costSettleExport = data => {
  return serviceJson({
    url: report + "/report/cost/settle/export",
    method: "post",
    responseType: 'blob',
    data
  });
};
//费用结算报表合计	
const settleReportSum = data => {
  return serviceJson({
    url: report + "/report/cost/settle/sum",
    method: "post",
    data
  });
};
export default {
  costPrefetchList,
  costPrefetchInsert,
  costPrefetchGet,
  costPrefetchCostGet,
  costPrefetchUpdate,
  costPrefetchDelete,
  costPrefetchSubmit,
  costPrefetchCheck,
  costPrefetchReverse,
  purchaseLinkList,
  salesLinkList,
  salesLinkList2,
  costDelete,
  shareDelete,
  costPrefetchPurchaseList,
  costPrefetchSalesList,
  costCategoryList,
  costCategoryInsert,
  costCategoryUpdate,
  costCategoryDelete,
  costSettleList,
  costSettleInsert,
  costSettleGet,
  costSettleCostGet,
  costSettleUpdate,
  costSettleDelete,
  costSettleSubmit,
  costSettleCheck,
  costSettleReverse,
  prefetchSettleList,
  noPrefetchSettleList,
  costDeleteAnother,
  shareDeleteAnother,
  costSettleFromPrefetch,
  baseCurrencyQuery,
  limitTimeQuery,
  rateQuery,
  dicQuery,
  prefetchReport,
  settleReport,
  costSettleExport,
  settleReportSum,
  costPrefetchExport,
  prefetchReportSum,
  getCostPrefetchSumV2,
  getCostSettleSumV2
};