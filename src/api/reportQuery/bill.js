import { service, serviceJson } from "../../axios/index";
let baseURL = window.ROOT_PATH.suffix1;
let report = window.ROOT_PATH.suffix5;

//应付票据台账报表
const pBill = data => {
  return serviceJson({
    url:
      report +
      "/reportForms/FiPaymentBillReportFormsController/queryInstrumentBillReportForms.do",
    method: "post",
    data
  });
};

//应收票据台账报表
const gBill = data => {
  return serviceJson({
    url:
      report +
      "/reportForms/FiGatheringBillReportFormsController/queryInstrumentBillReportForms.do",
    method: "post",
    data
  });
};
// 应收票据台账---导出
const exportFiGatheringBillReportForms = data => {
  return serviceJson({
    url:
      report +
      "/reportForms/FiGatheringBillReportFormsController/exportFiGatheringBillReportForms.do",
    method: "post",
    responseType: 'blob',
    data
  });
};
//应付票据类型
const pSel = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1087
    }
  });
};

//应收票据类型
const cSel = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1087
    }
  });
};

//应付票据台账报表总计
const pSum = data => {
  return serviceJson({
    url:
      report +
      "/reportForms/FiPaymentBillReportFormsController/queryFormsSums.do",
    method: "post",
    data
  });
};
// 应付票据台账---导出
const exportFiPaymentBillReportForms = data => {
  return serviceJson({
    url:
      report +
      "/reportForms/FiPaymentBillReportFormsController/exportFiPaymentBillReportForms.do",
    method: "post",
    responseType: 'blob',
    data
  });
};
//应收票据台账报表总计
const cSum = data => {
  return serviceJson({
    url:
      report +
      "/reportForms/FiGatheringBillReportFormsController/queryBillFormsSums.do",
    method: "post",
    data
  });
};
////到港信息单据状态
const billStatus = data => {
  return serviceJson({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    params: data
  });
};
////到港信息列表查询
const queryInstrumentBillReportForms = data => {
  return serviceJson({
    url:
      report +
      "/reportForms/odBllReportFormsController/queryInstrumentBillReportForms.do",
    method: "post",
    data
  });
};
//到港信息总计
const queryFormsSums = data => {
  return serviceJson({
    url: report + "/reportForms/odBllReportFormsController/queryFormsSums.do",
    method: "post",
    data
  });
};
//到港信息导出
const exportOdBllReportForms = data => {
  return serviceJson({
    url: report + "/reportForms/odBllReportFormsController/exportOdBllReportForms.do",
    method: "post",
    responseType: 'arraybuffer',
    data
  });
};
//收发存报表列表查询
const getInventoryInOutOnHandList = data => {
  return serviceJson({
    url: report + "/inventoryInOutOnHand/getInventoryInOutOnHandList.do",
    method: "post",
    data
  });
};
//收发存报表下载
const exportInventory = data => {
  return serviceJson({
      url: report + "/inventoryInOutOnHand/exportInventoryInOutOnHandList.do",
      method: "post",
      responseType: 'blob',
      data
  });
};
//发出商品报表
const getGoodsInTransitList = data => {
  return serviceJson({
    url: report + "/goodsInTransit/getGoodsInTransitList.do",
    method: "post",
    data
  });
};
const exportGoodsInTransitList = data => {
  return serviceJson({
    url: report + "/goodsInTransit/exportGoodsInTransitList.do",
    method: "post",
    responseType: 'blob',
    data
  });
};
//发出商品报表 合计
const getGoodsInTransitSum = data => {
  return serviceJson({
    url: report + "/goodsInTransit/getGoodsInTransitSum.do",
    method: "post",
    data
  });
};
//现款资金占用利息表
//
const selectFiCashTakeUpReport = data => {
  return serviceJson({
    url: report + "/fiCashTakeUp/selectFiCashTakeUpReport.do",
    method: "post",
    data
  });
};
//重核算 
const accountingFiCashTakeUp = data => {
  return serviceJson({
    url: report + "/fiCashTakeUp/accountingFiCashTakeUp.do",
    method: "post",
    data
  });
};
//导出
const exportFiCashTakeUpReport = data => {
  return serviceJson({
    url: report + "/fiCashTakeUp/exportFiCashTakeUpReport.do",
    method: "post",
    responseType: 'blob',
    data
  });
};
//客商额度巅峰值
const creditDailyReport = data => {
  return serviceJson({
    url: report + "/credit/creditDaily/report.do",
    method: "post",
    data
  });
};
//客商额度巅峰值 导出
const creditDailyExport = data => {
  return serviceJson({
    url: report + "/credit/creditDaily/export.do",
    method: "post",
    responseType: 'blob',
    data
  });
};
export default {
  pBill,
  gBill,
  pSel,
  cSel,
  pSum,
  cSum,
  billStatus,
  queryInstrumentBillReportForms,
  queryFormsSums,
  getInventoryInOutOnHandList,
  exportInventory,
  getGoodsInTransitList,
  exportGoodsInTransitList,
  exportOdBllReportForms,
  exportFiGatheringBillReportForms,
  exportFiPaymentBillReportForms,
  getGoodsInTransitSum,
  selectFiCashTakeUpReport,
  accountingFiCashTakeUp,
  exportFiCashTakeUpReport,
  creditDailyReport,
  creditDailyExport
};
