import { service, serviceJson } from "../../axios/index";
let base = window.ROOT_PATH.suffix1;
let report = window.ROOT_PATH.suffix5;

//库存报表列表
const stockReportList = data => {
  return serviceJson({
    url: report + "/report/inventory/list.do",
    method: "post",
    data
  });
};

//库存报表明细行
const stockReportDetailRow = data => {
  return serviceJson({
    url: report + "/report/inventory/detailList.do",
    method: "post",
    params: data
  });
};
//销售合同执行情况报表
export const getOdSoContractReportList = data => {
  return serviceJson({
    url: report + "/soContract/selectOdSoContractExecutiveCondition.do",
    method: "post",
    data
  });
};
//销售合同执行情况报表-总计
export const getOdSoContractTotal = data => {
  return serviceJson({
    url: report + "/soContract/selectOdSoContractExecutiveConditionSum.do",
    method: "post",
    data
  });
};
//销售合同执行报表-导出
export const exportOdSoContractExecutiveCondition = data => {
  return serviceJson({
    url: report + "/soContract/exportOdSoContractExecutiveCondition.do",
    method: "post",
    responseType: 'arraybuffer',
    data
  });
};
//采购合同执行情况报表-进口
export const getOdPoForeignContractReportList = data => {
  return serviceJson({
    url: report + "/poContract/selectOdPoContractExecutiveConditionImportPurchases.do",
    method: "post",
    data
  });
};
//采购合同执行情况报表-进口合计
export const getOdPoForeignContractTotal = data => {
  return serviceJson({
    url: report + "/poContract/selectOdPoContractExecutiveConditionImportPurchasesSum.do",
    method: "post",
    data
  });
};
//采购合同执行情况报表-进口  导出
export const exportOdPoContractExecutive = data => {
  return serviceJson({
    url: report + "/poContract/exportOdPoContractExecutiveConditionImportPurchases.do",
    method: "post",
    responseType: 'arraybuffer',
    data
  });
};
//采购合同执行情况报表-内贸
export const getodPoInlandContractReportList = data => {
  return serviceJson({
    url: report + "/poContract/selectOdPoContractExecutiveConditionDomesticTrade.do",
    method: "post",
    data
  });
};
//
//采购合同执行情况报表-内贸合计
export const getodPoInlandContractTotal = data => {
  return serviceJson({
    url: report + "/poContract/selectOdPoContractExecutiveConditionDomesticTradeSum.do",
    method: "post",
    data
  });
};
//采购合同执行情况报表-内贸 导出
export const exportOdPoContractExecutiveCondition = data => {
  return serviceJson({
    url: report + "/poContract/exportOdPoContractExecutiveConditionDomesticTrade.do",
    method: "post",
    responseType: 'arraybuffer',
    data
  });
};
//应收报表 
export const getReceivableReportList = data => {
  return serviceJson({
    url: report + "/report/invoice/selectReportOdSoInvoice.do",
    method: "post",
    data
  });
};
//应收报表 统计
export const getReceivableReportTotal = data => {
  return serviceJson({
    url: report + "/report/invoice/selectReportOdSoInvoiceSum.do",
    method: "post",
    data
  });
};
//应付报表 
export const getPaymentReportList = data => {
  return serviceJson({
    url: report + "/report/inventory/payReport.do",
    method: "post",
    data
  });
};
//应付报表 统计
export const getPaymentReportTotal = data => {
  return serviceJson({
    url: report + "/report/inventory/payTotalReport.do",
    method: "post",
    data
  });
};
//分合同库存报表 列表
export const getSubContractInventoryReport = data => {
  return serviceJson({
    url: report + "/contractInventory/getList.do",
    method: "post",
    data
  });
};
//分合同库存报表 总计
export const getSubContractInventoryReportTotal = data => {
  return serviceJson({
    url: report + "/contractInventory/getTotal.do",
    method: "post",
    data
  });
};
//分合同库存报表 导出
export const exportContractInventoryList = data => {
  return serviceJson({
    url: report + "/contractInventory/exportContractInventoryList.do",
    method: "post",
    responseType: 'arraybuffer',
    data
  });
};
//库存报表2
 const dataList = data => {
  return serviceJson({
    url: report + "/report/inventory/dataList.do",
    method: "post",
    data
  });
};
//库存报表合计
const dataSum = data => {
  return serviceJson({
    url: report + "/report/inventory/dataSum.do",
    method: "post",
    data
  });
};
//出入库明细报表 列表
export const getWarehouseInOutReport = data => {
  return serviceJson({
    url: report + "/businessInventory/getList.do",
    method: "post",
    data
  });
};
//出入库明细报表 总计
export const getWarehouseInOutReportTotal = data => {
  return serviceJson({
    url: report + "/businessInventory/getTotal.do",
    method: "post",
    data
  });
};
//出入库明细报表 导出
export const exportBusinessInventoryList = data => {
  return serviceJson({
    url: report + "/businessInventory/exportBusinessInventoryList.do",
    method: "post",
    responseType: 'blob',
    data
  });
};
//采购清单报表
export const getpurchaseListStatistics = data => {
  return serviceJson({
    url: report + "/purchase/purchaseListReport",
    method: "post",
    data
  });
};
export const getpurchaseListReportTotal = data => {
  return serviceJson({
    url: report + "/purchase/purchaseListReportSum",
    method: "post",
    data
  });
};
//导出清单报表
export const exportpurchaseListStatistics = data => {
  return serviceJson({
    url: report + "/purchase/purchaseListReportExport",
    method: "post",
    responseType: 'arraybuffer',
    data
  });
};
//销售清单报表
export const getSaleBillStatistics = data => {
  return serviceJson({
    url: report + "/reportSaleOrder/getList.do",
    method: "post",
    data
  });
};
//销售清单报表统计
export const getSaleBillReportTotal= data => {
  return serviceJson({
    url: report + "/reportSaleOrder/getTotal.do",
    method: "post",
    data
  });
};
//导出销售清单报表
export const exportBillStatistics = data => {
  return serviceJson({
    url: report + "/reportSaleOrder/downloadList.do",
    method: "post",
    responseType: 'arraybuffer',
    data
  });
};
//销售清单报表新导出接口
export const downloadListNew = data => {
  return serviceJson({
    url: report + "/reportSaleOrder/downloadListNew.do",
    method: "post",
    responseType: 'arraybuffer',
    data
  });
};
export const poType = data => {
  return service({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    data
  });
};
//导出销售清单报表
const exportOdInventoryList = data => {
  return serviceJson({
    url: report + "/report/inventory/exportOdInventoryList.do",
    method: "post",
    responseType: 'arraybuffer',
    data
  });
};
//收款单报表列表查询接口
const selectFiGatheringList = data => {
  return serviceJson({
    url: report + "/figathering/selectFiGatheringList.do",
    method: "post",
    data
  });
};
//收款单报表列表总计接口
const selectFiGatheringSum = data => {
  return serviceJson({
    url: report + "/figathering/selectFiGatheringSum.do",
    method: "post",
    data
  });
};
//
//收款单报表列表导出接口
const exportFiGatheringList = data => {
  return serviceJson({
    url: report + "/figathering/exportFiGatheringList.do",
    method: "post",
    responseType: 'arraybuffer',
    data
  });
};
//付款单报表列表查询接口
const selectFiPaymentList = data => {
  return serviceJson({
    url: report + "/fipayment/selectFiPaymentList.do",
    method: "post",
    data
  });
};
//付款单报表列表总计接口
const selectFiPaymentSum = data => {
  return serviceJson({
    url: report + "/fipayment/selectFiPaymentSum.do",
    method: "post",
    data
  });
};
//
//付款单报表列表导出接口
const exportFiPaymentList = data => {
  return serviceJson({
    url: report + "/fipayment/exportFiPaymentList.do",
    method: "post",
    responseType: 'arraybuffer',
    data
  });
};
//应收报表--导出
export const exportReportOdSoInvoice = data => {
  return serviceJson({
    url: report + "/report/invoice/exportReportOdSoInvoice.do",
    method: "post",
    responseType: 'arraybuffer',
    data
  });
};
//应付报表--导出
export const exportPayReport = data => {
  return serviceJson({
    url: report + "/report/inventory/exportPayReport.do",
    method: "post",
    responseType: 'blob',
    data
  });
};
export default {
  stockReportList,
  stockReportDetailRow,
  dataList,
  dataSum,
  exportOdInventoryList,
  selectFiGatheringList,
  selectFiGatheringSum,
  exportFiGatheringList,
  selectFiPaymentList,
  selectFiPaymentSum,
  exportFiPaymentList,
  exportReportOdSoInvoice,
};
