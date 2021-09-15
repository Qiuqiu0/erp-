import { service, serviceJson, upload } from "../axios/index";
let base = window.ROOT_PATH.suffix1;
let contract = window.ROOT_PATH.suffix2;
let capital = window.ROOT_PATH.suffix3;
let credit=window.ROOT_PATH.suffix4;

//客户信息弹窗列表
const customerSelect = data => {
  return serviceJson({
    url: base + "/base/customerData/bbCustomerBaseList.do",
    method: "post",
    data
  });
};
//客户信息弹窗列表
const customerSelect2 = data => {
  return serviceJson({
    url: base + "/base/customerData/bbCustomerBaseCollectList.do",
    method: "post",
    data
  });
};
//收藏
const customerCollect = data => {
  return serviceJson({
    url: base + "/base/customerData/bbCustomerBaseCollect.do",
    method: "post",
    data
  });
};
//取消收藏
const customerDeleteCollect = data => {
  return serviceJson({
    url: base + "/base/customerData/bbCustomerBaseCollectdDelete.do",
    method: "post",
    data
  });
};

//供应商信息弹窗列表
const supplierSelect = data => {
  return serviceJson({
    url: base + "/base/supplierData/bbSupplierBaseList2.do",
    method: "post",
    data
  });
};
//供应商信息弹窗列表
const supplierSelect2 = data => {
  return serviceJson({
    url: base + "/base/supplierData/bbSupplierBaseCollectList.do",
    method: "post",
    data
  });
};

//供应商收藏
const supplierCollection = data => {
  return serviceJson({
    url: base + "/base/supplierData/bbSupplierBaseCollect.do",
    method: "post",
    data
  });
};
//供应商移除
const supplierCollectionDelete = data => {
  return serviceJson({
    url: base + "/base/supplierData/bbSupplierBaseCollectDelete.do",
    method: "post",
    data
  });
};

//信用账户组信息弹窗列表
const creditGroupSelect = data => {
  return serviceJson({
    url: base + "/base/creditGroup/list",
    method: "post",
    data
  });
};

//费用类别信息弹窗
const costCategorySelect = data => {
  return serviceJson({
    url: capital + "/capital/costCategory/getCostNames",
    method: "post",
    data
  });
};

//银行信息弹窗列表
const bankPopup = data => {
  return serviceJson({
    url: base + "/base/data/bank/list.do",
    method: "post",
    data
  });
};

//公司银行信息弹窗列表
const companyBankPopup = params => {
  return serviceJson({
    url: base + "/base/bank/selectBbCompanyBanklist.do",
    method: "post",
    params
  });
};
//单位弹窗
const unitPopup =  data => {
  return serviceJson({
    url: base + "/gd/goodUnit/queryGdGoodsUnitList.do",
    method: "post",
    data
  });
};
//供应商银行信息弹窗列表
const supplierBankPopup = params => {
  return serviceJson({
    url: base + "/base/supplierData/getBbSupplierBanksBySupplierId.do",
    method: "post",
    params
  });
};
//客户银行信息弹窗列表
const customerBankPopup = params => {
  return serviceJson({
    url: base + "/base/customerData/getCustomerBanksByCustomerId.do",
    method: "post",
    params
  });
};
//采购合同弹窗列表
const odPoContractPopup = data => {
  return serviceJson({
    url: contract + "/poContract/getOdPoContractListEffect.do",
    method: "post",
    data
  });
};

//销售合同弹窗列表
const odSoContractPopup = data => {
  return serviceJson({
    url: contract + "/soContract/getOdSoContractListEffect.do",
    method: "post",
    data
  });
};

//框架协议弹窗列表
const odFwContractPopup = data => {
  return serviceJson({
    url: contract + "/odFwContract/getOdFwContractList.do",
    method: "post",
    data
  });
};

// //文件上传
// const uploadFile = data => {
//   return upload({
//     url: "/uploadFile.file",
//     method: "post",
//     data: data
//   });
// };
const uploadFile = data => {
  return upload({
    url:base+"/oss/uploadOss.do",
    method: "post",
    data: data
  });
};
//查询附件
const selectFileList = data => {
  return upload({
    url:base+"/base/sys/list",
    method: "post",
    params: data
  });
};
//销售合同
const selectOdSoContractInfo = data => {
  return serviceJson({
    url: contract + "/soContract/selectOdSoContractInfo.do",
    method: "post",
    data
  });
};

//公司下拉
const selectBbCompanyBase = data => {
  return service({
    url: base + "/base/company/selectBbCompanyBase.do",
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
//应付票据弹窗
const fiPaymentBillPopup = data => {
  return serviceJson({
    url: capital + "/bill/fiPaymentBill/fiPaymentBillRegisterList.do",
    method: "post",
    data
  });
};
//应收票据弹窗
const fiGatheringBillPopup = data => {
  return serviceJson({
    url: capital + "/bill/FiGatheringBill/fiGatheringBillregisterList.do",
    method: "post",
    data
  });
};
//销售出库弹窗
const extOdDoPopup = data => {
  return serviceJson({
    url: contract + "/saleOrderManager/selectListExtOdDo.do",
    method: "post",
    data
  });
};
//销售发票弹窗
const extInvoicePopup = data => {
  return serviceJson({
    url: contract + "/saleInvoiceManager/selectListExtInvoice.do",
    method: "post",
    data
  });
};
//采购提单弹窗
const purchaseBillPopup = data => {
  return serviceJson({
    url: contract + "/business/purchase/bl/odBlList",
    method: "post",
    data
  });
};
//信用证弹窗
const  letterCreditPopup = data =>{
  return serviceJson({
    url: capital + "/capital/filcissue/listSimple.do",
    method: "post",
    data
  });
}
//删除系统附件
const delFif = data => {
  return service({
    url: base + "/base/sys/delete",
    method: "post",
    data
  });
};
//打印提货单信息
const  selectSaleOrder4Pickup = data =>{
  return serviceJson({
    url: contract + "/saleOrderManager/selectSaleOrder4Pickup.do",
    method: "post",
    data
  });
}
//发票开票申请单
const  selectOdSoInvoicePrint = data =>{
  return service({
    url: contract + "/saleInvoiceManager/selectOdSoInvoicePrint.do",
    method: "post",
    data
  });
}
//双签合同删除
const deleteDoubleCheckAccessory = data => {
  return service({
    url: contract + "/odPsContract/deleteDoubleCheckAccessory.do",
    method: "post",
    data
  });
};
//双签合同查询
const selectSysSystemAccessoryList = data => {
  return serviceJson({
    url: base + "/base/sys/selectSysSystemAccessoryList.do",
    method: "post",
    data
  });
};
//费用结算打印信息查询
const costSettlePrint = params => {
  return serviceJson({
    url: capital + "/capital/costSettle/print/"+params,
    method: "get",
  });
};
//费用预提打印信息查询
const costPrefetchPrint = params => {
  return serviceJson({
    url: capital + "/capital/costPrefetch/print/"+params,
    method: "get",
  });
};
//客商组件查询
const getCreditLimitCustSupplierList = data => {
  return serviceJson({
    url: credit + "/cmCompanyCreditGranting/getCreditLimitCustSupplierList.do",
    method: "post",
    data
  });
};
//销售出库单pdf打印
const privateSaleOrderSent = data => {
  return serviceJson({
    url: contract + "/saleOrderManager/privateSaleOrderSent.do",
    method: "post",
    responseType: 'blob',
    data
  });
};
export default {
  customerSelect,
  customerSelect2,
  supplierSelect,
  supplierSelect2,
  creditGroupSelect,
  costCategorySelect,
  bankPopup,
  unitPopup,
  companyBankPopup,
  supplierBankPopup,
  odPoContractPopup,
  odSoContractPopup,
  odFwContractPopup,
  uploadFile,
  selectOdSoContractInfo,
  selectBbCompanyBase,
  selectCustomerList,
  fiPaymentBillPopup,
  fiGatheringBillPopup,
  extOdDoPopup,
  customerBankPopup,
  extInvoicePopup,
  letterCreditPopup,
  selectFileList,
  delFif,
  purchaseBillPopup,
  selectSaleOrder4Pickup,
  selectOdSoInvoicePrint,
  deleteDoubleCheckAccessory,
  customerCollect,
  customerDeleteCollect,
  supplierCollection,
  supplierCollectionDelete,
  selectSysSystemAccessoryList,
  costSettlePrint,
  costPrefetchPrint,
  getCreditLimitCustSupplierList,
  privateSaleOrderSent
};
