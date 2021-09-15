import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
//添加应收票据
export const addFiGatheringBill = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/addFiGatheringBill.do",
    method: "post",
    data
  });
};
//修改应收票据
export const editFiGatheringBill = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/editFiGatheringBill.do",
    method: "post",
    data
  });
};
//应收票据详情
export const getFiGatheringBillDetail = params => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/queryFiGatheringBillById.do",
    method: "post",
    params
  });
};
//内部贴现
export const internalDiscount = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/internalDiscount.do",
    method: "post",
    data
  });
};
//贴现
export const discount = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/Discount.do",
    method: "post",
    data
  });
};
//获取背书信息
export const getFiGatheringbillRecite = params => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/billRecite.do",
    method: "post",
    params
  });
};
//托收
export const collection = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/collection.do",
    method: "post",
    data
  });
};
//质押赎回
export const pledgeOrRedeem = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/pledgeOrRedeem.do",
    method: "post",
    data
  });
};
//获取关联付款单
export const getRelationPayment = params => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/relationPayment.do",
    method: "post",
    params
  });
};
//获取关联收款单
export const getRelationGathering = params => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/relation.do",
    method: "post",
    params
  });
};
//内部贴现过账
export const postInsideDiscount = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/internalDiscountPost.do",
    method: "post",
    data
  });
};
//内部贴现冲销
export const writeOffInsideDiscount = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/internalDiscountWriteOff.do",
    method: "post",
    data
  });
};
//贴现过账
export const postDiscount = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/DiscountPost.do",
    method: "post",
    data
  });
};
//贴现冲销
export const writeOffDiscount = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/DiscountWriteOff.do",
    method: "post",
    data
  });
};
//托收过账
export const postCollection = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/collectionPost.do",
    method: "post",
    data
  });
};
//托收冲销
export const writeOffCollection = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/collectionWriteOff.do",
    method: "post",
    data
  });
};