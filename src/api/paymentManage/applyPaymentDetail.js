import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
let base = window.ROOT_PATH.suffix1;
// 新增付款申请单
export const addPaymentApply = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/add.do",
    method: "post",
    data
  });
};
// 获取付款申请单详情
export const getPaymentApplyDetail = params => {
  return serviceJson({
    url: suffix + "/capital/payApply/paymentDetail.do",
    method: "post",
    params
  });
};
// 获取付款申请单关联明细查询
export const getPaymentItemDetail = params => {
  return serviceJson({
    url: suffix + "/capital/payApply/paymentItemDetail.do",
    method: "post",
    params
  });
}; // 删除付款申请单明细
export const delPaymentItem = params => {
  return serviceJson({
    url: suffix + "	/capital/payApply/delItem.do",
    method: "post",
    params
  });
};
 // 非业务单据明细删除
 export const delItemV2 = params => {
  return serviceJson({
    url: suffix + "	/capital/payApply/delItemV2.do",
    method: "post",
    params
  });
};
// 保存付款申请单
export const updatePaymentApply = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/update.do",
    method: "post",
    data
  });
};
//获取客户收款银行
export const getSupplierReceiveBank = params => {
  return serviceJson({
    url: base + "/base/supplierData/getBbSupplierReceiveBanksBySupplierId.do",
    method: "post",
    params
  });
};
//获取供应商收款银行
export const getCustomerReceiveBank = params => {
  return serviceJson({
    url: base + "/base/customerData/queryCustomerBankByCustomerId.do",
    method: "post",
    params
  });
};
// 获取关联付款单
export const getPaymentByApplyCode = params => {
  return serviceJson({
    url: suffix + "/capital/payment/paymentByOd.do",
    method: "post",
    params
  });
};
// 费用弹窗
export const costSettlePopup = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/selectCostList",
    method: "post",
    data
  });
};
// 费用弹窗2
export const costSettlePopup2 = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/selectCostListV2",
    method: "post",
    data
  });
};
// 申请付款单关闭
export const closeOdPayApply = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/closeOdPayApply.do",
    method: "post",
    data
  });
};
//查询可授信额度
export const selectLeftAmt = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/selectLeftAmt.do",
    method: "post",
    data
  });
};
//申请认领
export const claimPayApply = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/claimPayApply.do",
    method: "post",
    data
  });
};
//认领审批 通过，驳回
export const auditClaimPayApply = data => {
  return serviceJson({
    url: suffix + "/capital/payApply/auditClaimPayApply.do",
    method: "post",
    data
  });
};

