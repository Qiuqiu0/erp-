import { service, serviceJson,upload } from "../../axios/index";
let base = window.ROOT_PATH.suffix1;
let credit = window.ROOT_PATH.suffix4;

//客户信用额度列表
const customerCreditList = data => {
  return serviceJson({
    url: credit + "/credit/customer/listV2",
    method: "post",
    data
  });
};
//客户信用额度合计
const getCmCustCreditListSumV2 = data => {
  return serviceJson({
    url: credit + "/credit/customer/getCmCustCreditListSumV2.do",
    method: "post",
    data
  });
};

//客户信用额度创建
const customerCreditInsert = data => {
  return serviceJson({
    url: credit + "/credit/customer/insert",
    method: "post",
    data
  });
};

//客户信用额度修改
const customerCreditUpdate = data => {
  return serviceJson({
    url: credit + "/credit/customer/update",
    method: "post",
    data
  });
};

//客户信用额度删除
const customerCreditDelete = data => {
  return serviceJson({
    url: credit + "/credit/customer/delete",
    method: "post",
    params: data
  });
};

//客户信用额度提交
const customerCreditSubmit = data => {
  return serviceJson({
    url: credit + "/credit/customer/submit",
    method: "post",
    data
  });
};

//客户信用额度审核通过
const customerCreditPass = data => {
  return serviceJson({
    url: credit + "/credit/customer/approve/1",
    method: "post",
    data
  });
};

//客户信用额度审核驳回
const customerCreditReject = data => {
  return serviceJson({
    url: credit + "/credit/customer/approve/-1",
    method: "post",
    data
  });
};

//客户信用额度查询信用额度总额
const customerCreditQueryTotal = data => {
  return serviceJson({
    url: credit + "/custDetail/custCreidtAmtNow",
    method: "post",
    params: data
  });
};

//客户信用额度查询月初余额
const customerCreditQueryBalance = data => {
  return serviceJson({
    url: credit + "/custDetail/custMonthBalance",
    method: "post",
    params: data
  });
};

//客户信用额度查询占用部分
const customerCreditQueryLeftPart = data => {
  return serviceJson({
    url: credit + "/custDetail/unpostPart",
    method: "post",
    params: data
  });
};

//客户信用额度查询余额部分
const customerCreditQueryRightPart = data => {
  return serviceJson({
    url: credit + "/custDetail/thisMonPostedPart",
    method: "post",
    params: data
  });
};

//客户信用额度查询历史
const customerCreditQueryHistory = data => {
  return serviceJson({
    url: credit + "/custDetail/custHistoryList",
    method: "post",
    params: data
  });
};

//供应商信用额度列表
const supplierCreditList = data => {
  return serviceJson({
    url: credit + "/credit/supplier/listV2",
    method: "post",
    data
  });
};

//供应商信用额度创建
const supplierCreditInsert = data => {
  return serviceJson({
    url: credit + "/credit/supplier/insert",
    method: "post",
    data
  });
};

//供应商信用额度修改
const supplierCreditUpdate = data => {
  return serviceJson({
    url: credit + "/credit/supplier/update",
    method: "post",
    data
  });
};

//供应商信用额度删除
const supplierCreditDelete = data => {
  return serviceJson({
    url: credit + "/credit/supplier/delete",
    method: "post",
    params: data
  });
};

//供应商信用额度提交
const supplierCreditSubmit = data => {
  return serviceJson({
    url: credit + "/credit/supplier/submit",
    method: "post",
    data
  });
};

//供应商信用额度审核通过
const supplierCreditPass = data => {
  return serviceJson({
    url: credit + "/credit/supplier/approve/1",
    method: "post",
    data
  });
};

//供应商信用额度审核驳回
const supplierCreditReject = data => {
  return serviceJson({
    url: credit + "/credit/supplier/approve/-1",
    method: "post",
    data
  });
};

//供应商信用额度查询信用额度总额
const supplierCreditQueryTotal = data => {
  return serviceJson({
    url: credit + "/suppDetail/supCreidtAmtNow",
    method: "post",
    params: data
  });
};

//供应商信用额度查询月初余额
const supplierCreditQueryBalance = data => {
  return serviceJson({
    url: credit + "/suppDetail/supMonthBalance",
    method: "post",
    params: data
  });
};

//供应商信用额度查询占用部分
const supplierCreditQueryLeftPart = data => {
  return serviceJson({
    url: credit + "/suppDetail/unpostPart",
    method: "post",
    params: data
  });
};

//供应商信用额度查询余额部分
const supplierCreditQueryRightPart = data => {
  return serviceJson({
    url: credit + "/suppDetail/thisMonPostedPart",
    method: "post",
    params: data
  });
};

//供应商信用额度查询历史
const supplierCreditQueryHistory = data => {
  return serviceJson({
    url: credit + "/suppDetail/supHistoryList",
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

//货币信息下拉列表
const currencySelect = data => {
  return serviceJson({
    url: base + "/base/data/currency/listSimple.do",
    method: "post",
    data
  });
};
//公司额度管理主表查询
const selectCmCompanyCreditList = data => {
  return serviceJson({
    url: credit + "/cmCompanyCredit/selectCmCompanyCreditList.do",
    method: "post",
    data
  });
};
//公司额度管理创建 
const saveCmCompanyCredit = data => {
  return serviceJson({
    url: credit + "/cmCompanyCredit/saveCmCompanyCredit.do",
    method: "post",
    data
  });
};
//公司额度管理删除 
const deleteCmCompanyCredit = data => {
  return serviceJson({
    url: credit + "/cmCompanyCredit/deleteCmCompanyCredit.do",
    method: "post",
    data
  });
};
//公司额度管理提交
const submitCmCompanyCredit = data => {
  return serviceJson({
    url: credit + "/cmCompanyCredit/submitCmCompanyCredit.do",
    method: "post",
    data
  });
};
//公司额度管理审核
const approveCmCompanyCredit = data => {
  return serviceJson({
    url: credit + "/cmCompanyCredit/approveCmCompanyCredit.do",
    method: "post",
    data
  });
};
//客商调整额度列表信息
const selectCmCompanyCreditGrantingList = data => {
  return serviceJson({
    url: credit + "/cmCompanyCreditGranting/selectCmCompanyCreditGrantingList.do",
    method: "post",
    data
  });
};
//客商额度保存
const saveCmCompanyCreditGranting = data => {
  return serviceJson({
    url: credit + "/cmCompanyCreditGranting/saveCmCompanyCreditGranting.do",
    method: "post",
    data
  });
};
//查询客商额度调整页面明细
const selectCmCompanyCreditGrantingItemsList = data => {
  return serviceJson({
    url: credit + "/cmCompanyCreditGranting/selectCmCompanyCreditGrantingItemsList.do",
    method: "post",
    data
  });
};
//删除客商额度调整页面明细
const deleteCmCompanyCreditGrantingItems = data => {
  return serviceJson({
    url: credit + "/cmCompanyCreditGranting/deleteCmCompanyCreditGrantingItems.do",
    method: "post",
    data
  });
};
//客商额度查询主表信息
const selectCmCompanyCreditGrantingById = data => {
  return serviceJson({
    url: credit + "/cmCompanyCreditGranting/selectCmCompanyCreditGrantingById.do",
    method: "post",
    params:data
  });
};
//客商额度主表删除
const deleteCmCompanyCreditGranting = data => {
  return serviceJson({
    url: credit + "/cmCompanyCreditGranting/deleteCmCompanyCreditGranting.do",
    method: "post",
    data
  });
};
//客商额度调整模板下载
const exportTemplate = data => {
  return serviceJson({
    url: credit + "/cmCompanyCreditGranting/exportTemplate.do",
    method: "post",
    responseType: 'blob',
    data
  });
};
//客商额度调整页面明细导入
const importCmCompanyCreditGrantingItems = data => {
  return upload({
    url: credit + "/cmCompanyCreditGranting/importCmCompanyCreditGrantingItems.do",
    method: "post",
    data
  });
};
//客商额度调整页面提交
const submitCmCompanyCreditGranting = data => {
  return serviceJson({
    url: credit + "/cmCompanyCreditGranting/submitCmCompanyCreditGranting.do",
    method: "post",
    data
  });
};
//客商额度调整页面审核
const approveCmCompanyCreditGranting = data => {
  return serviceJson({
    url: credit + "/cmCompanyCreditGranting/approveCmCompanyCreditGranting.do",
    method: "post",
    data
  });
};
//公司额度调整 启用，停用
const updateCmCompanyCreditStatus = data => {
  return serviceJson({
    url: credit + "/cmCompanyCredit/updateCmCompanyCreditStatus.do",
    method: "post",
    data
  });
};
export default {
  customerCreditList,
  customerCreditInsert,
  customerCreditUpdate,
  customerCreditDelete,
  customerCreditSubmit,
  customerCreditPass,
  customerCreditReject,
  customerCreditQueryTotal,
  customerCreditQueryBalance,
  customerCreditQueryLeftPart,
  customerCreditQueryRightPart,
  customerCreditQueryHistory,
  supplierCreditList,
  supplierCreditInsert,
  supplierCreditUpdate,
  supplierCreditDelete,
  supplierCreditSubmit,
  supplierCreditPass,
  supplierCreditReject,
  supplierCreditQueryTotal,
  supplierCreditQueryBalance,
  supplierCreditQueryLeftPart,
  supplierCreditQueryRightPart,
  supplierCreditQueryHistory,
  dicQuery,
  currencySelect,
  selectCmCompanyCreditList,
  saveCmCompanyCredit,
  deleteCmCompanyCredit,
  submitCmCompanyCredit,
  approveCmCompanyCredit,
  selectCmCompanyCreditGrantingList,
  saveCmCompanyCreditGranting,
  selectCmCompanyCreditGrantingItemsList,
  deleteCmCompanyCreditGrantingItems,
  selectCmCompanyCreditGrantingById,
  deleteCmCompanyCreditGranting,
  exportTemplate,
  importCmCompanyCreditGrantingItems,
  submitCmCompanyCreditGranting,
  approveCmCompanyCreditGranting,
  updateCmCompanyCreditStatus,
  getCmCustCreditListSumV2
};