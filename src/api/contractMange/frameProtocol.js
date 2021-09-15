// eslint-disable-next-line no-unused-vars
import { service, upload, serviceJson } from "@/axios/index";
const suffix = window.ROOT_PATH.suffix2; //suffix2: '/api/business', //业务功能
const baseURL = window.ROOT_PATH.suffix1; //		suffix1: '/api/base', //基础数据

//------------框架协议审批---------
export const approveOdFwContract = data => {
  return serviceJson({
    url: suffix + "/odFwContract/approveOdFwContract.do",
    method: "post",
    data
  });
};
//------------框架协议审核---------
export const auditOdFwContract = data => {
  return serviceJson({
    url: suffix + "/odFwContract/auditOdFwContract.do",
    method: "post",
    data
  });
};
//------------框架协议合同审批（状态：开启中，关闭中）---------
export const auditOdFwContract2 = data => {
  return serviceJson({
    url: suffix + "/odFwContract/auditOdFwContract2.do",
    method: "post",
    data
  });
};
//------------删除框架协议---------
export const cancellationOdFwContract = data => {
  return serviceJson({
    url: suffix + "/odFwContract/cancellationOdFwContract.do",
    method: "post",
    data
  });
};
//------------删除框架协议物料明细---------
export const deleteOdFwContractItems = data => {
  return service({
    url: suffix + "/odFwContract/deleteOdFwContractItems.do",
    method: "post",
    data
  });
};
//------------删除框架协议合同条款---------
export const deleteOdFwContractTerm = data => {
  return service({
    url: suffix + "/odFwContract/deleteOdFwContractTerm.do",
    method: "post",
    data
  });
};
//------------根据框架协议ID获取框架协议主数据---------
export const getOdFwContract = data => {
  return serviceJson({
    url: suffix + "/odFwContract/getOdFwContract.do",
    method: "post",
    data
  });
};
//------------获取框架协议物料明细列表---------
export const getOdFwContractItemsList = data => {
  return serviceJson({
    url: suffix + "/odFwContract/getOdFwContractItemsList.do",
    method: "post",
    data
  });
};
//------------获取框架协议合同条款列表---------
export const getOdFwContractTermList = data => {
  return serviceJson({
    url: suffix + "/odFwContract/getOdFwContractTermList.do",
    method: "post",
    data
  });
};
//------------查询框架协议主数据列表---------
export const getOdFwContractList = data => {
  return serviceJson({
    url: suffix + "/odFwContract/getOdFwContractListV2.do",
    method: "post",
    data
  });
};
//------------保存框架协议信息---------
export const saveOdFwContract = data => {
  return serviceJson({
    url: suffix + "/odFwContract/saveOdFwContract.do",
    method: "post",
    data
  });
};
//------------框架协议开启、关闭---------
export const turnOdFwContract = data => {
  return serviceJson({
    url: suffix + "/odFwContract/turnOdFwContract.do",
    method: "post",
    data
  });
};
//------------查询合同历史列表---------
export const getOdContractHis = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdContractHis.do",
    method: "post",
    data
  });
};
//------------根据框架协议ID获取框架协议主数据-历史---------
export const getOdFwContractActive = data => {
  return service({
    url: suffix + "/odFwContract/getOdFwContractActive.do",
    method: "post",
    data
  });
};
//------------获取框架协议物料明细列表-历史---------
export const getOdFwContractItemsArchiveList = data => {
  return serviceJson({
    url: suffix + "/odFwContract/getOdFwContractItemsArchiveList.do",
    method: "post",
    data
  });
};
//------------获取框架协议合同条款列表-历史---------
export const getOdFwContractTermArchiveList = data => {
  return serviceJson({
    url: suffix + "/odFwContract/getOdFwContractTermArchiveList.do",
    method: "post",
    data
  });
};

//------------展示系统附件-历史---------
export const listArchive = data => {
  return service({
    url: baseURL + "/base/sys/listArchive.do",
    method: "post",
    data
  });
};
//------------查询货币主数据列表分页---------
export const list = data => {
  return serviceJson({
    url: baseURL + "/base/data/currency/list.do",
    method: "post",
    data
  });
};
//------------查询单位---------
export const getGdGoodsUnitListByIsInactive = data => {
  return serviceJson({
    url: baseURL + "/gd/goodUnit/queryGdGoodsUnitList.do",
    method: "post",
    data
  });
};
//------------字典表查询---------
export const getDictionary = data => {
  return serviceJson({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data
  });
};
//------------展示 系统附件---------
export const getFiles = data => {
  return serviceJson({
    url: baseURL + "/base/sys/list",
    method: "post",
    data
  });
};
//------------获取汇率---------
export const getCurrencyRate = data => {
  return service({
    url: baseURL + "/base/data/parities/getParities.do",
    method: "post",
    data
  });
};
//------------删除系统附件---------
export const fileDelete = data => {
  return service({
    url: baseURL + "/base/sys/delete",
    method: "post",
    data
  });
};
//双签
export const doubleCheckOdFwContract = data => {
  return serviceJson({
    url: suffix + "/odFwContract/doubleCheckOdFwContract.do",
    method: "post",
    data
  });
};

export const haveReceiveOrginCopy = data => {
  return serviceJson({
    url: suffix + "/odFwContract/haveReceiveOrginCopy.do",
    method: "post",
    data
  });
};
