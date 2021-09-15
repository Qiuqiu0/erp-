import { serviceJson, service } from "../../axios/index";
let capital = window.ROOT_PATH.suffix3;
let base = window.ROOT_PATH.suffix1;
let business = window.ROOT_PATH.suffix2;
export const getConnection = data => {
  //获取客户
  return serviceJson({
    url: base + "/base/supplierData/bbSupplierBaseList2.do",
    method: "post",
    data
  });
};
export const filcissue = data => {
  //获取列表
  return serviceJson({
    url: capital + "/capital/filcissue/listV2.do",
    method: "post",
    data
  });
};
export const getFiLcIssueListSumV2 = data => {
  //获取列表合计
  return serviceJson({
    url: capital + "/capital/filcissue/getFiLcIssueListSumV2.do",
    method: "post",
    data
  });
}
export const letterStatus = params => {
  //获取下拉状态
  return serviceJson({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    params
  });
};
//采购合同
//查询采购合同列表
const getClist = data => {
  return serviceJson({
    url: business + "/poContract/getOdPoContractList.do",
    method: "post",
    data
  });
};
export const saveFiLcReceive = data => {
  //保存
  return serviceJson({
    url: capital + "/capital/filcissue/add.do",
    method: "post",
    data
  });
};
export const selectFiLcReceiveList = data => {
  //列表查询
  return serviceJson({
    url: capital + "/capital/filcreceive/selectFiLcReceiveList.do",
    method: "post",
    data
  });
};
export const selectFiLcReceiveById = data => {
  //修改查看
  return serviceJson({
    url: capital + "/capital/filcissue/detail.do",
    method: "post",
    data
  });
};
export const selectItemList = data => {
  //修改查看明细
  return serviceJson({
    url: capital + "/capital/filcissue/selectItemList.do",
    method: "post",
    params: data
  });
};
export const update = data => {
  //修改保存
  return serviceJson({
    url: capital + "/capital/filcissue/update.do",
    method: "post",
    data
  });
};
export const reduceMsg = data => {
  //删除
  return serviceJson({
    url: capital + "/capital/filcissue/delete.do",
    method: "post",
    data
  });
};
export const delFiLcIssueItems = data => {
  //删除明细
  return serviceJson({
    url: capital + "/capital/filcissue/delFiLcIssueItems.do",
    method: "post",
    params: data
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
export const submit = data => {
  //提交
  return serviceJson({
    url: capital + "/capital/filcissue/submit.do",
    method: "post",
    data
  });
};
export const examine = data => {
  //审核
  return serviceJson({
    url: capital + "/capital/filcissue/examine.do",
    method: "post",
    data
  });
};
export const opening = data => {
  //开证
  return serviceJson({
    url: capital + "/capital/filcissue/opening.do",
    method: "post",
    data
  });
};
export const selectFiLcIssueById = data => {
  //查看开证
  return serviceJson({
    url: capital + "/capital/filcissue/selectFiLcIssueById.do",
    method: "post",
    params: data
  });
};
export const delAcceptance = data => {
  //删除承兑
  return serviceJson({
    url: capital + "/capital/filcissue/delAcceptance.do",
    method: "post",
    params: data
  });
};
export const saveAcceptance = data => {
  //承兑保存
  return serviceJson({
    url: capital + "/capital/filcissue/saveAcceptance.do",
    method: "post",
    data
  });
};
export const selectAcceptanceList = data => {
  //查看承兑
  return serviceJson({
    url: capital + "/capital/filcissue/selectAcceptanceList.do",
    method: "post",
    params: data
  });
};
export const delAcceptancePay = data => {
  //删除承兑付款明细
  return serviceJson({
    url: capital + "/capital/filcissue/delAcceptancePay.do",
    method: "post",
    params: data
  });
};
export const saveAcceptancePay = data => {
  //保存承兑付款
  return serviceJson({
    url: capital + "/capital/filcissue/saveAcceptancePay.do",
    method: "post",
    data
  });
};
export const selectAcceptancePayList = data => {
  //查看承兑付款
  return serviceJson({
    url: capital + "/capital/filcissue/selectAcceptancePayList.do",
    method: "post",
    params: data
  });
};
export const postAcceptancePay = data => {
  //过账
  return serviceJson({
    url: capital + "/capital/filcissue/postAcceptancePay.do",
    method: "post",
    data
  });
};
export const writeOffAcceptancePay = data => {
  //冲销
  return serviceJson({
    url: capital + "/capital/filcissue/writeOffAcceptancePay.do",
    method: "post",
    data
  });
};
export const settle = data => {
  //结清
  return serviceJson({
    url: capital + "/capital/filcissue/settle.do",
    method: "post",
    data
  });
};
export const disSettle = data => {
  //取消结清
  return serviceJson({
    url: capital + "/capital/filcissue/disSettle.do",
    method: "post",
    data
  });
};
export const parities = data => {
  //汇率
  return service({
    url: base + "/base/data/parities/getParitiesForIssuePay.do",
    method: "post",
    data
  });
};
export const openChange = data => {
  //取消结清
  return serviceJson({
    url: capital + "/capital/filcissue/openChange.do",
    method: "post",
    data
  });
};
export const examAcceptance = data => {
  //承兑审核
  return serviceJson({
    url: capital + "/capital/filcissue/examAcceptance.do",
    method: "post",
    data
  });
};
export const submitAcceptance = data => {
  //承兑提交
  return serviceJson({
    url: capital + "/capital/filcissue/submitAcceptance.do",
    method: "post",
    data
  });
};
export const getOdPoContractList = data => {
  //获取供应商国别
  return serviceJson({
    url: business + "/poContract/getOdPoContractList.do",
    method: "post",
    data
  });
};
export const getOdPoTransferInfo = data => {
  //获取运输信息
  return service({
    url: business + "/poContract/getOdPoTransferInfo.do",
    method: "post",
    data
  });
};
export const getOdPoPaymentList = data => {
  //获取信用证类型
  return serviceJson({
    url: business + "/poContract/getOdPoPaymentList.do",
    method: "post",
    data
  });
};
//供应商银行信息弹窗列表
const getBbSupplierCollectionBanksBySupplierId = data => {
  return serviceJson({
    url:
      base + "/base/supplierData/getBbSupplierCollectionBanksBySupplierId.do",
    method: "post",
    data
  });
};
//开证过账
const openingPost = data => {
  return serviceJson({
    url: capital + "/capital/filcissue/openingPost.do",
    method: "post",
    data
  });
};
//开证冲销
const openingWriteOff = data => {
  return serviceJson({
    url: capital + "/capital/filcissue/openingWriteOff.do",
    method: "post",
    data
  });
};
//汇率
const getParitiesByCode = data => {
  return serviceJson({
    url: base + "/base/data/parities/getParitiesByCode.do",
    method: "post",
    params: data
  });
};
//查询公司币别
const selectBbCompanyBaseVoByCode = data => {
  return serviceJson({
    url: base + "/base/company/selectBbCompanyBaseVoByCode.do",
    method: "post",
    params: data
  });
};
export default {
  getConnection,
  filcissue,
  letterStatus,
  saveFiLcReceive,
  selectFiLcReceiveList,
  selectFiLcReceiveById,
  reduceMsg,
  selectReceiptByLcReceiveId,
  delFiLcReceiveReceiptById,
  writeOffAcceptancePay,
  getClist,
  selectItemList,
  update,
  delFiLcIssueItems,
  submit,
  examine,
  opening,
  delAcceptance,
  saveAcceptance,
  selectAcceptanceList,
  delAcceptancePay,
  saveAcceptancePay,
  selectAcceptancePayList,
  postAcceptancePay,
  settle,
  disSettle,
  selectFiLcIssueById,
  parities,
  openChange,
  examAcceptance,
  submitAcceptance,
  getOdPoContractList,
  getOdPoTransferInfo,
  getOdPoPaymentList,
  getBbSupplierCollectionBanksBySupplierId,
  openingPost,
  openingWriteOff,
  getParitiesByCode,
  selectBbCompanyBaseVoByCode
};
