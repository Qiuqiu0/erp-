import { serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
let base = window.ROOT_PATH.suffix1;
//收款单抬头详情
export const getCreditMainDetail = params => {
  return serviceJson({
    url: suffix + "/capital/figathering/selectFiGathering.do",
    method: "post",
    params
  });
};
//应收票据信息
export const getfiPaymentBil = params => {
  return serviceJson({
    url: suffix + "/capital/figathering/selectFiGatheringBill.do",
    method: "post",
    params
  });
};
//收款单明细查询
export const getFiGatheringItems = params => {
  return serviceJson({
    url: suffix + "/capital/figathering/selectFiGatheringItems.do",
    method: "post",
    params
  });
};
//收款单明细删除
export const deleteFiGatheringItems = data => {
  return serviceJson({
    url: suffix + "/capital/figatheringitems/deleteFiGatheringItems.do",
    method: "post",
    data
  });
};
//认领明细查询
export const getFiGatheringItemsShare = params => {
  return serviceJson({
    url: suffix + "/capital/figathering/selectFiGatheringItemsShare.do",
    method: "post",
    params
  });
};
//保存收款单
export const saveCredit = data => {
  return serviceJson({
    url: suffix + "/capital/figathering/saveFiGathering.do",
    method: "post",
    data
  });
};
//获取汇率
export const getParities = params => {
  return serviceJson({
    url: base + "/base/data/parities/getParities.do",
    method: "post",
    params
  });
};
//获取汇率 code
export const getParitiesCode = params => {
  return serviceJson({
    url: base + "/base/data/parities/getParitiesByCode.do",
    method: "post",
    params
  });
};
//获取本位币&&人民币汇率
export const getStandardCurrencyParities = params => {
  return serviceJson({
    url: base + "/base/data/parities/getStandardCurrencyParities.do",
    method: "post",
    params
  });
};
//获取业务币种&&人民币汇率
export const getRmbParitiesByCurrencyCode = params => {
  return serviceJson({
    url: base + "/base/data/parities/getParitiesByCode.do",
    method: "post",
    params: { ...params, toCurrencyCode: "CNY" }
  });
};
//获取本位币汇率 根据公司id及业务币种
export const getBaseParitiesByCompanyId = params => {
  return serviceJson({
    url: base + "/base/data/parities/getParitiesForIssuePay.do",
    method: "post",
    params
  });
};
