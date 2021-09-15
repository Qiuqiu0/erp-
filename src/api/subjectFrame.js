import { service, serviceJson } from "../axios/index";
let suffix = window.ROOT_PATH.suffix1;
export const getSubject = data => {
    //获取科目弹框
    return serviceJson({
      url: suffix + "/base/syncaccountview/selectSyncAccountView.do",
      method: "post",
      data
    });
  };
export const getflowCode = data => {
  //获取现金流弹框
  return serviceJson({
    url: suffix + "/base/cashflow/selectCashflowItem.do",
    method: "post",
    data
  });
};