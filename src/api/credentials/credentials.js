// eslint-disable-next-line no-unused-vars
import { service, upload, serviceJson } from "@/axios/index";
const suffix = window.ROOT_PATH.suffix3; //suffix3: '/api/business', //业务功能
const baseURL = window.ROOT_PATH.suffix1; //		suffix1: '/api/base', //基础数据

export const getexamineDate = data => {
  return serviceJson({
    url: suffix + "/capital/warrant/updateOdWarrantData.do",
    method: "post",
    data
  });
};
//------------字典查询---------
export const getDicList = data => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data
  });
};
//------------凭证列表查询---------
export const selectWarrantList = data => {
  return serviceJson({
    url: suffix + "/capital/warrant/selectWarrantListV2.do",
    method: "post",
    data
  });
};
//------------凭证明细列表查询---------
export const selectWarrantDetailList = data => {
  return service({
    url: suffix + "/capital/warrant/selectWarrantDetailList.do",
    method: "post",
    data
  });
};
//------------单据号查询列表---------
export const selectDocNoList = data => {
  return service({
    url: suffix + "/capital/warrant/selectDocNoList.do",
    method: "post",
    data
  });
};
//------------凭证模板新增操作---------
export const insertWarrantTemplateInfo = data => {
  return serviceJson({
    url: suffix + "/capital/template/insertWarrantTemplateInfo.do",
    method: "post",
    data
  });
};
//------------凭证模板查看操作---------
export const queryWarrantTemplateData = data => {
  return service({
    url: suffix + "/capital/template/queryWarrantTemplateData.do",
    method: "post",
    data
  });
};

//------------凭证模板列表查询操作---------
export const selectWarrantTemplateList = data => {
  return serviceJson({
    url: suffix + "/capital/template/selectWarrantTemplateListV2.do",
    method: "post",
    data
  });
};

//------------	凭证模板启用禁用删除操作---------
export const updateWarrantTemplateStatus = data => {
  return service({
    url: suffix + "/capital/template/updateWarrantTemplateStatus.do",
    method: "post",
    data
  });
};
//------------凭证模板修改操作---------
export const updateWarrantTemplateInfo = data => {
  return serviceJson({
    url: suffix + "/capital/template/updateWarrantTemplateInfo.do",
    method: "post",
    data
  });
};
//------------EAS凭证推送---------
export const importVoucher = data => {
  return serviceJson({
    url: suffix + "/capital/warrant/importVoucher.do",
    method: "post",
    data
  });
};
//------------EAS凭证推送   ---------
export const importVoucherYY = data => {
  return serviceJson({
    url: suffix + "/capital/warrant/importVoucherYY.do",
    method: "post",
    data
  });
};
//------------EAS凭证号删除---------
export const deleteVoucher = data => {
  return serviceJson({
    url: suffix + "/capital/warrant/deleteVoucher.do",
    method: "post",
    data
  });
};
//------------EAS凭证号删除- --------
export const deleteVoucherYY = data => {
  return serviceJson({
    url: suffix + "/capital/warrant/deleteVoucherYY.do",
    method: "post",
    data
  });
};
//------------凭证模板得导出---------
export const doOutputExportExcel = data => {
  return service({
    url: suffix + "/capital/warrant/doOutputExportExcel.json",
    method: "get",
    responseType: "blob",
    params: data
  });
};
//------------凭证生成---------
export const credentialsReborn = (url, data) => {
  return service({
    url: url,
    method: "post",
    params: data
  });
};
//------------现金流保存---------
export const saveCashflow = data => {
  return serviceJson({
    url: baseURL + "/base/cashflow/saveCashflow.do",
    method: "post",
    data
  });
};
//------------金蝶科目-辅助项关联关系表保存---------
export const saveSyncAccountAsst = data => {
  return serviceJson({
    url: baseURL + "/base/syncaccountasst/saveSyncAccountAsst.do",
    method: "post",
    data
  });
};
//------------会计科目保存---------
export const saveSyncAccountView = data => {
  return serviceJson({
    url: baseURL + "/base/syncaccountview/saveSyncAccountView.do",
    method: "post",
    data
  });
};

//凭证作废
export const invalidOdWarrant = data => {
  return serviceJson({
    url: suffix + "/capital/warrant/invalidOdWarrant.do",
    method: "post",
    data
  });
};
