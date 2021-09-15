import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
let base = window.ROOT_PATH.suffix1;
// 新增付款申请单
export const addPayment = data => {
  return serviceJson({
    url: suffix + "/capital/payment/add.do",
    method: 'post',
    data
  })
}
// 获取付款申请单详情
export const getPaymentMain = params => {
  return serviceJson({
    url: suffix + "/capital/payment/paymentDetail.do",
    method: 'post',
    params
  })
}
// 获取付款单关联明细查询
export const getPaymentDetail = params => {
  return serviceJson({
    url: suffix + "/capital/payment/paymentItemDetail.do",
    method: 'post',
    params
  })
}
// 获取付款单关联票据
export const getBillsByPaymentId = params => {
  return serviceJson({
    url: suffix + "/bill/fiPaymentBill/queryByPaymentId.do",
    method: 'post',
    params
  })
}
// 删除付款单关联票据
export const delConnectBill = data => {
  return serviceJson({
    url: suffix + "/capital/payment/delPaymentBillItems.do",
    method: 'post',
    data
  })
}
// 删除付款申请单明细
export const delPaymentDetail= params => {
  return serviceJson({
    url: suffix + "	/capital/payment/delDetail.do",
    method: 'post',
    params
  })
}
// 保存付款申请单
export const updatePayment = data => {
  return serviceJson({
    url: suffix + "	/capital/payment/update.do",
    method: 'post',
    data
  })
}