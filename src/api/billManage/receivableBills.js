import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
//获取应收票据列表
export const getfiGatheringBillList = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/fiGatheringBillListV2.do",
    method: "post",
    data
  });
};
//删除应收票据
export const delFiGatheringBill = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/delFiGatheringBill.do",
    method: "post",
    data
  });
};
//应收票据合计
export const fiGatheringBillListSumV2 = data => {
  return serviceJson({
    url: suffix + "/bill/FiGatheringBill/fiGatheringBillListSumV2.do",
    method: "post",
    data
  });
};
