import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
//获取应付票据列表
export const getfiPaymentBillList = data => {
  return serviceJson({
    url: suffix + "/bill/fiPaymentBill/fiPaymentBillListV2.do",
    method: "post",
    data
  });
};
//删除应付票据
export const delFiPaymentBill = data => {
  return serviceJson({
    url: suffix + "/bill/fiPaymentBill/delFiPaymentBill.do",
    method: "post",
    data
  });
};
//应付票据合计
export const fiPaymentBillListSumV2 = data => {
  return serviceJson({
    url: suffix + "/bill/fiPaymentBill/fiPaymentBillListSumV2.do",
    method: "post",
    data
  });
};
