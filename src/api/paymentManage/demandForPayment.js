import { service, serviceJson } from "../../axios/index";
let base = window.ROOT_PATH.suffix1;
let suffix = window.ROOT_PATH.suffix3;
//获取付费申请单列表
export const getPaymentApplylist = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/listV2.do",
    method: "post",
    data
  });
};
// 删除付款申请单
export const delPaymentApply = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/delPayment.do",
    method: "post",
    data
  });
};
// 付款申请单审核
export const checkPaymentApply = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/examine.do",
    method: "post",
    data
  });
};
// 付款申请单提交
export const submitPaymentApply = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/submit.do",
    method: "post",
    data
  });
};
//付款申请单总计
export const getOdPayApplyListSumV2 = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/getOdPayApplyListSumV2.do",
    method: "post",
    data
  });
};
//获取付费申请单弹窗列表
export const getPaymentApplylistExt = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/listExt.do",
    method: "post",
    data
  });
};
//查询付款申请单明细剩余额度总和
export const selectSumResidueLimit = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/selectSumResidueLimit.do",

    method: 'post',
    params:data
  })
}
//单据状态
export const selectStatusList = data => {
  return service({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    data
  });
};
