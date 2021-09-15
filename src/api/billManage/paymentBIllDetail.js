import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
//添加应付票据
export const addFiPaymentBill = data => {
  return serviceJson({
    url: suffix + "/bill/fiPaymentBill/addFiPaymentBill.do",
    method: "post",
    data
  });
};
//修改应付票据
export const editFiPaymentBill = data => {
  return serviceJson({
    url: suffix + "/bill/fiPaymentBill/editFiPaymentBill.do",
    method: "post",
    data
  });
};
//应付票据详情
export const getFiPaymentBillDetail = data => {
  return serviceJson({
    url: suffix + "/bill/fiPaymentBill/queryFiPaymentBillById.do",
    method: "post",
    data
  });
};
//冲销应付票据
export const postFiPaymentBill = data => {
  return serviceJson({
    url: suffix + "/bill/fiPaymentBill/paymentBill.do",
    method: "post",
    data
  });
};
//冲销应付票据
export const writeOffFiPaymentBill = data => {
  return serviceJson({
    url: suffix + "/bill/fiPaymentBill/writeOffBill.do",
    method: "post",
    data
  });
};
 // 删除付款申请单明细
 export const delFiPaymentBillItem = params => {
  return serviceJson({
    url: suffix + "/bill/fiPaymentBillItems/delFiPaymentBillItems.do",
    method: "post",
    params
  });
};