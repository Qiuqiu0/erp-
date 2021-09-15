import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
//获取付款申请单列表
export const getPaymentOrderList = data => {
  return serviceJson({
    url: suffix + "/capital/payment/listV2.do",
    method: "post",
    data
  });
};
//删除付款单
export const deletePaymentOrder = data => {
  return serviceJson({
    url: suffix + "/capital/payment/delPayment.do",
    method: "post",
    data
  });
};
//过账付款单
export const postPaymentOrder = data => {
  return serviceJson({
    url: suffix + "/capital/payment/posting.do",
    method: "post",
    data
  });
};
//冲销付款单
export const writeOffPaymentOrder = data => {
  return serviceJson({
    url: suffix + "/capital/payment/writeOff.do",
    method: "post",
    data
  });
};
export const exportFiPaymentList = data => {
  return serviceJson({
    url: suffix + "/capital/payment/exportFiPaymentList.do",
    method: "post",
    responseType: "blob",
    data
  });
};
//付款单总计
export const selectFiPaymentSum = data => {
  return serviceJson({
    url: suffix + "/capital/payment/selectFiPaymentSumV2.do",
    method: "post",
    data
  });
};
//批量过账
export const postingBatch = data => {
  return serviceJson({
    url: suffix + "/capital/payment/postingBatch.do",
    method: "post",
    data
  });
};
//计息调整
export const turnFiPaymentInterest = data => {
  return serviceJson({
    url: suffix + "/capital/payment/turnFiPaymentInterest.do",
    method: "post",
    data
  });
};
