import { serviceJson } from "../../axios/index";
let capital = window.ROOT_PATH.suffix3;
let base = window.ROOT_PATH.suffix1;
export const getConnection = data => {
  //获取客户
  return serviceJson({
    url: base + "/base/supplierData/bbSupplierBaseList2.do",
    method: "post",
    data
  });
};
export const letterReceipt = data => {
  //获取列表
  return serviceJson({
    url: capital + "/capital/filcreceive/selectFiLcReceiveList.do",
    method: "post",
    data
  });
};
export const letterStatus = params => {
  //获取下拉状态
  return serviceJson({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    params
  });
};
export const saveFiLcReceive = data => {
  //保存
  return serviceJson({
    url: capital + "/capital/filcreceive/saveFiLcReceive.do",
    method: "post",
    data
  });
};
export const selectFiLcReceiveList = data => {
  //列表查询
  return serviceJson({
    url: capital + "/capital/filcreceive/selectFiLcReceiveListV2.do",
    method: "post",
    data
  });
};
export const selectFiLcReceiveListSumV2 = data => {
  //列表查询
  return serviceJson({
    url: capital + "/capital/filcreceive/selectFiLcReceiveListSumV2.do",
    method: "post",
    data
  });
}
export const selectFiLcReceiveById = data => {
  //修改查看
  return serviceJson({
    url: capital + "/capital/filcreceive/selectFiLcReceiveById.do",
    method: "post",
    params: data
  });
};
export const reduceMsg = data => {
  //删除
  return serviceJson({
    url: capital + "/capital/filcreceive/delFiLcReceive.do",
    method: "post",
    data
  });
};
export const selectClaimByLcReceiveId = data => {
  //认领
  return serviceJson({
    url: capital + "/capital/filcreceive/selectClaimByLcReceiveId.do",
    method: "post",
    params: data
  });
};
export const delFiLcReceiveClaimById = data => {
  //删除明细
  return serviceJson({
    url: capital + "/capital/filcreceive/delFiLcReceiveClaimById.do",
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
export const selectReceiptByLcReceiveId = data => {
  //收款
  return serviceJson({
    url: capital + "/capital/filcreceive/selectReceiptByLcReceiveId.do",
    method: "post",
    params: data
  });
};
export const delFiLcReceiveReceiptById = data => {
  //删除收款
  return serviceJson({
    url: capital + "/capital/filcreceive/delFiLcReceiveReceiptById.do",
    method: "post",
    data
  });
};
export const postingFiLcReceive = data => {
  //过账
  return serviceJson({
    url: capital + "/capital/filcreceive/postingFiLcReceive.do",
    method: "post",
    data
  });
};
export const chargeFiLcReceive = data => {
  //冲销
  return serviceJson({
    url: capital + "/capital/filcreceive/chargeFiLcReceive.do",
    method: "post",
    data
  });
};
export const getAccountPeriodByCompany = data => {
  //时间范围
  return serviceJson({
    url: capital + "/capital/monthbanlance/getAccountPeriodByCompany.do",
    method: "post",
    params: data
  });
};
export const postClaim = data => {
  //认领过账
  return serviceJson({
    url: capital + "/capital/filcreceive/postClaim.do",
    method: "post",
    data
  });
};
export const chargeClaim = data => {
  //认领冲销
  return serviceJson({
    url: capital + "/capital/filcreceive/chargeClaim.do",
    method: "post",
    data
  });
};
export default {
  getConnection,
  letterReceipt,
  letterStatus,
  saveFiLcReceive,
  selectFiLcReceiveList,
  selectFiLcReceiveById,
  reduceMsg,
  selectClaimByLcReceiveId,
  delFiLcReceiveClaimById,
  selectReceiptByLcReceiveId,
  delFiLcReceiveReceiptById,
  postingFiLcReceive,
  chargeFiLcReceive,
  getAccountPeriodByCompany,
  postClaim,
  chargeClaim
};
