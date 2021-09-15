import { service, serviceJson } from "../../axios/index";
let base = window.ROOT_PATH.suffix1;

//客户主数据列表
const customerList = data => {
  return serviceJson({
    url: base + "/base/customerData/bbCustomerBaseList.do",
    method: "post",
    data
  });
};

//客户主数据创建
const customerInsert = data => {
  return serviceJson({
    url: base + "/base/customerData/insertBbCustomerBase.do",
    method: "post",
    data
  });
};

//客户主数据获取
const customerGet = data => {
  return serviceJson({
    url: base + "/base/customerData/getBbCustomerBase.do",
    method: "post",
    params: data
  });
};

//客户通讯数据获取
const customerLinkGet = data => {
  return serviceJson({
    url: base + "/base/customerData/getCustomerLinksByCustomerId.do",
    method: "post",
    params: data
  });
};

//客户银行信息数据获取
const customerBankGet = data => {
  return serviceJson({
    url: base + "/base/customerData/getCustomerBanksByCustomerId.do",
    method: "post",
    params: data
  });
};

//客户公司部门数据获取
const customerBranchGet = data => {
  return serviceJson({
    url: base + "/base/customerData/getCustomerBranchesByCustomerId.do",
    method: "post",
    params: data
  });
};

//客户主数据修改
const customerUpdate = data => {
  return serviceJson({
    url: base + "/base/customerData/updateBbCustomerBase.do",
    method: "post",
    data
  });
};

//客户主数据删除
const customerDelete = data => {
  return serviceJson({
    url: base + "/base/customerData/delBbCustomerBase.do",
    method: "post",
    data
  });
};

//客户主数据禁用
const customerDisable = data => {
  return serviceJson({
    url: base + "/base/customerData/blockUpBbCustomerBase.do",
    method: "post",
    data
  });
};

//客户主数据启用
const customerEnable = data => {
  return serviceJson({
    url: base + "/base/customerData/startUsingBbCustomerBase.do",
    method: "post",
    data
  });
};

//客户主数据扩展供应商
const customerCopy = data => {
  return serviceJson({
    url: base + "/base/customerData/copyCustomer.do",
    method: "post",
    params: data
  });
};

//删除客户通讯行
const linkDelete = data => {
  return serviceJson({
    url: base + "/base/customerData/delBbCustomerLink.do",
    method: "post",
    params: data
  });
};

//删除客户银行信息行
const bankDelete = data => {
  return serviceJson({
    url: base + "/base/customerData/delBbCustomerBank.do",
    method: "post",
    params: data
  });
};

//字典表查询
const dicQuery = data => {
  return serviceJson({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    params: data
  });
};

//省市区查询
const areaList = data => {
  return service({
    url: base + "/base/area/list",
    method: "post",
    data
  });
};
//	金蝶：核准客户
const approvalCustomerToKD = data => {
  return service({
    url: base + "/base/customerData/approvalCustomerToKD.do",
    method: "post",
    data
  });
};
//	金蝶：分配客户
const assignCustomerToKD = data => {
  return service({
    url: base + "/base/customerData/assignCustomerToKD.do",
    method: "post",
    data
  });
};
//	金蝶：推送客户
const pushCustomerToKD = data => {
  return service({
    url: base + "/base/customerData/pushCustomerToKD.do",
    method: "post",
    data
  });
};
//导入 金蝶：导入客户财务资料
const importCustomerCompanyToKD = data => {
  return serviceJson({
    url: base + "/base/customerData/importCustomerCompanyToKD.do",
    method: "post",
    data
  });
};
// 
//物料档案导出
const exportCustomer = data => {
  return service({
      url: base + "/base/customerData/exportCustomer.do",
      method: "post",
      responseType: 'blob',
     data
  });
};
export default {
  customerList,
  customerInsert,
  customerGet,
  customerLinkGet,
  customerBankGet,
  customerBranchGet,
  customerUpdate,
  customerDelete,
  customerDisable,
  customerEnable,
  customerCopy,
  linkDelete,
  bankDelete,
  dicQuery,
  areaList,
  approvalCustomerToKD,
  assignCustomerToKD,
  pushCustomerToKD,
  importCustomerCompanyToKD,
  exportCustomer
};