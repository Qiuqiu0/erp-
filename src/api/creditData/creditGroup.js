import { service, serviceJson } from "../../axios/index";
let base = window.ROOT_PATH.suffix1;
let credit = window.ROOT_PATH.suffix4;

//信用账户组列表
const creditGroupList = data => {
  return serviceJson({
    url: base + "/base/creditGroup/list",
    method: "post",
    data
  });
};

//信用账户组保存
const creditGroupSave = data => {
  return serviceJson({
    url: base + "/base/creditGroup/insertOrUpdate",
    method: "post",
    data
  });
};

//信用账户组删除
const creditGroupDelete = data => {
  return serviceJson({
    url: base + "/base/creditGroup/delete",
    method: "post",
    data
  });
};

//根据信用账户组查询客户
const creditGroupToCustomer = data => {
  return serviceJson({
    url: base + "/base/customerData/queryCustomersByCreditGroup.do",
    method: "post",
    params: data
  });
};

//信用账户组信用额度列表
const creditGroupCreditList = data => {
  return serviceJson({
    url: credit + "/credit/quota/listV2",
    method: "post",
    data
  });
};

//信用账户组信用额度创建
const creditGroupCreditInsert = data => {
  return serviceJson({
    url: credit + "/credit/quota/insert",
    method: "post",
    data
  });
};

//信用账户组信用额度修改
const creditGroupCreditUpdate = data => {
  return serviceJson({
    url: credit + "/credit/quota/update",
    method: "post",
    data
  });
};

//信用账户组信用额度删除
const creditGroupCreditDelete = data => {
  return serviceJson({
    url: credit + "/credit/quota/delete",
    method: "post",
    params: data
  });
};

//信用账户组信用额度提交
const creditGroupCreditSubmit = data => {
  return serviceJson({
    url: credit + "/credit/quota/submit",
    method: "post",
    data
  });
};

//信用账户组信用额度审核通过
const creditGroupCreditPass = data => {
  return serviceJson({
    url: credit + "/credit/quota/approve/1",
    method: "post",
    data
  });
};

//信用账户组信用额度审核驳回
const creditGroupCreditReject = data => {
  return serviceJson({
    url: credit + "/credit/quota/approve/-1",
    method: "post",
    data
  });
};

//信用账户组信用额度查询信用额度总额
const creditGroupCreditQueryTotal = data => {
  return serviceJson({
    url: credit + "/groupDetail/custsCreidtAmtNow",
    method: "post",
    params: data
  });
};

//信用账户组信用额度查询月初余额
const creditGroupCreditQueryBalance = data => {
  return serviceJson({
    url: credit + "/groupDetail/custsMonthBalance",
    method: "post",
    params: data
  });
};

//信用账户组信用额度查询占用部分
const creditGroupCreditQueryLeftPart = data => {
  return serviceJson({
    url: credit + "/groupDetail/custsUnpostPart",
    method: "post",
    params: data
  });
};

//信用账户组信用额度查询余额部分
const creditGroupCreditQueryRightPart = data => {
  return serviceJson({
    url: credit + "/groupDetail/custsThisMonPostedPart",
    method: "post",
    params: data
  });
};

//信用账户组信用额度查询历史
const creditGroupCreditQueryHistory = data => {
  return serviceJson({
    url: credit + "/groupDetail/custsHistoryList",
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

export default {
  creditGroupList,
  creditGroupSave,
  creditGroupDelete,
  creditGroupToCustomer,
  creditGroupCreditList,
  creditGroupCreditInsert,
  creditGroupCreditUpdate,
  creditGroupCreditDelete,
  creditGroupCreditSubmit,
  creditGroupCreditPass,
  creditGroupCreditReject,
  creditGroupCreditQueryTotal,
  creditGroupCreditQueryBalance,
  creditGroupCreditQueryLeftPart,
  creditGroupCreditQueryRightPart,
  creditGroupCreditQueryHistory,
  dicQuery,
  currencySelect
};