import { service, serviceJson } from "../../axios/index";
let base = window.ROOT_PATH.suffix1;
let business=window.ROOT_PATH.suffix2;
let capital = window.ROOT_PATH.suffix3;
//单据状态
const selectDoStatusList = data => {
  return service({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    data
  });
};
//公司下拉列表
const selectBbCompanyBase = data => {
  return service({
    url: base + "/base/company/selectBbCompanyBase.do",
    method: "post",
    data
  });
};
//根据公司id获取部门
const selectBbBranch = data => {
  return service({
    url: base + "/base/branch/selectBbBranch.do",
    method: "post",
    data
  });
};
//客户下拉列表
const selectCustomerList = data => {
  return service({
    url: base + "/base/customerData/selectCustomerList.do",
    method: "post",
    data
  });
};
//获取仓库下拉列表
const getBbWarehouseListSimple = data => {
  return service({
    url: base + "/base/data/ware/getBbWarehouseListSimple.do",
    method: "post",
    data
  });
};
//查询批次拆分详情
const selectListDetail = data => {
  return serviceJson({
    url: business + "/odInventory/selectList2SaleBatchSplit.do",
    method: "post",
    data
  });
};
//查询批次拆分详情2
const selectList2SaleBatchSplitV2 = data => {
  return serviceJson({
    url: business + "/odInventory/selectList2SaleBatchSplitV2.do",
    method: "post",
    data
  });
};
//新增销售出库单
const insertSaleOutboundOrder = data => {
  return serviceJson({
    url: business + "/saleOrderManager/insertSaleOutboundOrder.do",
    method: "post",
    data
  });
};
//销售出库单列表查询
const selectListExtOdDo = data => {
  return serviceJson({
    url: business + "/saleOrderManager/selectListExtOdDoV2.do",
    method: "post",
    data
  });
};
//查询汇率接口 //根据code查询汇率
const getParities = data => {
  return serviceJson({
    url: base + "/base/data/parities/getParitiesByCode.do",
    method: "post",
    params: data
  });
};
//销售出库单查看
const checkSaleOutboundOrder = data => {
  return serviceJson({
    url: business + "/saleOrderManager/checkSaleOutboundOrder.do",
    method: "get",
    params: data
  });
};
//销售合同
const selectOdSoContractInfo = data => {
  return serviceJson({
    url: business + "/soContract/selectOdSoContractInfo.do",
    method: "post",
    data
  });
};
//根据合同id查合同明细
const selectOdSoContractDetail = data => {
  return serviceJson({
    url: business + "/soContract/selectOdSoContractDetail.do",
    method: "post",
    params: data
  });
};

//根据商品明细id获取批次拆分列表
const selectListBatchByItemId = data => {
  return serviceJson({
    url: business + "/saleOrderManager/selectListBatchByItemId.do",
    method: "get",
    params: data
  });
};
//销售出库单删除///
const deleteSaleOutboundOrder = data => {
  return serviceJson({
    url: business + "/saleOrderManager/deleteSaleOutboundOrder.do",
    method: "post",
    data
  });
};
//销售出库单提交，驳回等操作接口
const operateSaleOutboundOrderStatus = data => {
  return serviceJson({
    url: business + "/saleOrderManager/operateSaleOutboundOrderStatus.do",
    method: "post",
    data
  });
};
//销售出库单修改接口
const updateSaleOutboundOrder = data => {
  return serviceJson({
    url: business + "/saleOrderManager/updateSaleOutboundOrder.do",
    method: "post",
    data
  });
};
//销售出库单签收
const updateReceivedDate = data => {
  return serviceJson({
    url: business + "/saleOrderManager/updateReceivedDate.do",
    method: "post",
    data
  });
};
//获取码单列表
const socketDockSoList = data => {
  return serviceJson({
    url: business + "/od/dockSo/socketDockSoList.do",
    method: "post",
    data
  });
};
//根据码单明细ids查询码单信息	
const socketDockSoListById = data => {
  return serviceJson({
    url: business + "/od/dockSo/socketDockSoListById.do",
    method: "post",
    data
  });
};
//销售出库单明细查询（选择销售出库单）
const selectListExtDoBatch = data => {
  return serviceJson({
    url: business + "/saleOrderManager/selectListExtDoBatch.do",
    method: "post",
    data
  });
};
//销售退货单列表
const selectListExtUndo = data => {
  return serviceJson({
    url: business + "/saleOrderManager/selectListExtUndoV2.do",
    method: "post",
    data
  });
};
//新增销售退货单
const insertSaleUndoOrder = data => {
  return serviceJson({
    url: business + "/saleOrderManager/insertSaleUndoOrder.do",
    method: "post",
    data
  });
};
//删除销售退货单
const deleteSaleUndoOrder = data => {
  return serviceJson({
    url: business + "/saleOrderManager/deleteSaleUndoOrder.do",
    method: "post",
    data
  });
};
//销售退货单提交，审核
const operateReturnStatus = data => {
  return serviceJson({
    url: business + "/saleOrderManager/operateReturnStatus.do",
    method: "post",
    data
  });
};
//销售退货单查看
const checkSaleUndoOrder = data => {
  return serviceJson({
    url: business + "/saleOrderManager/checkSaleUndoOrder.do",
    method: "get",
    params:data
  });
};
//销售退货单修改
const updateUndoOrder = data => {
  return serviceJson({
    url: business + "/saleOrderManager/updateUndoOrder.do",
    method: "post",
    data
  });
};
//销售发票查询	
const selectListExtInvoice = data => {
  return serviceJson({
    url: business + "/saleInvoiceManager/selectListExtInvoiceV2.do",
    method: "post",
    data
  });
};
//销售发票新增
const insertSaleInvoice = data => {
  return serviceJson({
    url: business + "/saleInvoiceManager/insertSaleInvoice.do",
    method: "post",
    data
  });
};
//销售发票删除
const deleteSaleInvoice = data => {
  return serviceJson({
    url: business + "/saleInvoiceManager/deleteSaleInvoice.do",
    method: "post",
    data
  });
};
//销售发票提交，审核
const operateSaleInvoiceStatus = data => {
  return serviceJson({
    url: business + "/saleInvoiceManager/operateSaleInvoiceStatus.do",
    method: "post",
    data
  });
};
//销售发票查看	
const checkSaleInvoicer = data => {
  return serviceJson({
    url: business + "/saleInvoiceManager/checkSaleInvoicer.do",
    method: "get",
    params:data
  });
};
//销售发票，查询销售出库单
const selectOdDo2Invoice = data => {
  return serviceJson({
    url: business + "/saleInvoiceManager/selectOdDo2Invoice.do",
    method: "post",
    data
  });
};
//销售发票 根据销售出库单单号查询详情
const selectOdDoItems2Invoice = data => {
  return serviceJson({
    url: business + "/saleInvoiceManager/selectOdDoItems2Invoice.do",
    method: "post",
    data
  });
};
//销售发票，查询销售退货单
const selectOdUndo2Invoice = data => {
  return serviceJson({
    url: business + "/saleInvoiceManager/selectOdUndo2Invoice.do",
    method: "post",
    data
  });
};
//销售发票 根据销售退货库单单号查询详情
const selectOdUndoItems2Invoice = data => {
  return serviceJson({
    url: business + "/saleInvoiceManager/selectOdUndoItems2Invoice.do",
    method: "post",
    data
  });
};
//销售发票 修改
const updateSaleInvoice = data => {
  return serviceJson({
    url: business + "/saleInvoiceManager/updateSaleInvoice.do",
    method: "post",
    data
  });
};
//销售发票明细删除
const deleteSaleInvoiceItems = data => {
  return serviceJson({
    url: business + "/saleInvoiceManager/deleteSaleInvoiceItems.do",
    method: "post",
    data
  });
};
//销售退货单明细删除
const deleteUndoItems = data => {
  return serviceJson({
    url: business + "/saleOrderManager/deleteUndoItems.do",
    method: "post",
    data
  });
};
//销售出库单明细删除
const deleteDoItems = data => {
  return serviceJson({
    url: business + "/saleOrderManager/deleteDoItems.do",
    method: "post",
    data
  });
};
//销售出库单 费用预提删除
const deleteOdPrefetchCost = data => {
  return serviceJson({
    url: business + "/saleOrderManager/deleteOdPrefetchCost.do",
    method: "post",
    data
  });
};
//月结 过账日期范围
const getAccountPeriodByCompany = data => {
  return serviceJson({
    url: capital + "/capital/monthbanlance/getAccountPeriodByCompany.do",
    method: "post",
    params:data
  });
};
//查询汇率，根据本位币id和业务币code查询
const getParitiesByCompanyCurrencyIdAndContractCurrencyCode = data => {
  return serviceJson({
    url: base + "/base/data/parities/getParitiesByCompanyCurrencyIdAndContractCurrencyCode.do",
    method: "post",
    params:data
  });
};
//g根据公司code查询本位币code
const selectBbCompanyBaseVoByCode = data => {
  return serviceJson({
    url: base + "/base/company/selectBbCompanyBaseVoByCode.do",
    method: "post",
    params:data
  });
};
//销售出库单修改查询的详情
const checkSaleOutOrder4Update = data => {
  return serviceJson({
    url: business + "/saleOrderManager/checkSaleOutOrder4Update.do",
    method: "get",
    params:data
  });
};
//销售出库单复制，查询详情
const checkSaleOutOrder4Copy = data => {
  return serviceJson({
    url: business + "/saleOrderManager/checkSaleOutOrder4Copy.do",
    method: "get",
    params:data
  });
};
//销售退货单修改查询详情
const checkSaleUndoOrder4Update = data => {
  return serviceJson({
    url: business + "/saleOrderManager/checkSaleUndoOrder4Update.do",
    method: "get",
    params:data
  });
};
//销售发票修改时查询详情
const checkSaleInvoicer4Update = data => {
  return serviceJson({
    url: business + "/saleInvoiceManager/checkSaleInvoicer4Update.do",
    method: "get",
    params:data
  });
};
//根据业务币别code查询业务币别名称
const selectCurrencyName = data => {
    return serviceJson({
      url: base+"/base/data/currency/selectByCode.do",
      method: "post",
      params:data
    });
  };
//查询所有业务币信息
const listSimple = data => {
    return serviceJson({
      url: base+"/base/data/currency/listSimple.do",
      method: "post",
      data
    });
  };
  //获取本位币汇率 根据公司id及业务币种
const getParitiesForIssuePay = data => {
  return service({
    url: base + "/base/data/parities/getParitiesForIssuePay.do",
    method: "post",
    data
  });
};
//打印修改保存提货人信息
const sealUpdate = data => {
  return serviceJson({
    url: business + "/saleOrderManager/sealUpdate.do",
    method: "post",
    data
  });
};
//出库单总计
const selectListExtOdDoSum = data => {
  return serviceJson({
    url: business + "/saleOrderManager/selectListExtOdDoSumV2.do",
    method: "post",
    data
  });
};
//实发确认

const saleOrderSentConfirm = data => {
  return serviceJson({
    url: business + "/saleOrderManager/saleOrderSentConfirm.do",
    method: "post",
    data
  });
};
//销售退货总计
const selectListExtUndoSumV2 = data => {
  return serviceJson({
    url: business + "/saleOrderManager/selectListExtUndoSumV2.do",
    method: "post",
    data
  });
};
//销售发票总计
const selectListExtInvoiceSumV2 = data => {
  return serviceJson({
    url: business + "/saleInvoiceManager/selectListExtInvoiceSumV2.do",
    method: "post",
    data
  });
};
export default {
  selectDoStatusList,
  selectListDetail,
  insertSaleOutboundOrder,
  selectListExtOdDo,
  getParities,
  checkSaleOutboundOrder,
  selectOdSoContractInfo,
  selectListBatchByItemId,
  selectOdSoContractDetail,
  deleteSaleOutboundOrder,
  operateSaleOutboundOrderStatus,
  updateSaleOutboundOrder,
  updateReceivedDate,
  socketDockSoList,
  socketDockSoListById,
  selectListExtDoBatch,
  selectBbCompanyBase,
  selectBbBranch,
  selectCustomerList,
  getBbWarehouseListSimple,
  selectListExtUndo,
  insertSaleUndoOrder,
  deleteSaleUndoOrder,
  operateReturnStatus,
  checkSaleUndoOrder,
  updateUndoOrder,
  selectListExtInvoice,
  insertSaleInvoice,
  deleteSaleInvoice,
  operateSaleInvoiceStatus,
  checkSaleInvoicer,
  selectOdDo2Invoice,
  selectOdUndo2Invoice,
  selectOdDoItems2Invoice,
  selectOdUndoItems2Invoice,
  updateSaleInvoice,
  deleteSaleInvoiceItems,
  deleteUndoItems,
  deleteDoItems,
  deleteOdPrefetchCost,
  getAccountPeriodByCompany,
  getParitiesByCompanyCurrencyIdAndContractCurrencyCode,
  selectBbCompanyBaseVoByCode,
  checkSaleOutOrder4Update,
  checkSaleUndoOrder4Update,
  checkSaleInvoicer4Update,
  checkSaleOutOrder4Copy,
  selectCurrencyName,
  listSimple,
  getParitiesForIssuePay,
  sealUpdate,
  selectListExtOdDoSum,
  saleOrderSentConfirm,
  selectListExtUndoSumV2,
  selectListExtInvoiceSumV2,
  selectList2SaleBatchSplitV2
 
};
