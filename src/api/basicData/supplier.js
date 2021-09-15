import { service, serviceJson } from "../../axios/index";
let base = window.ROOT_PATH.suffix1;

//供应商主数据列表
const supplierList = data => {
  return serviceJson({
    url: base + "/base/supplierData/bbSupplierBaseList2.do",
    method: "post",
    data
  });
};
//供应商主数据列表（供应商管理列表）
const bbSupplierBaseList2 = data => {
  return serviceJson({
    url: base + "/base/supplierData/bbSupplierBaseList2.do",
    method: "post",
    data
  });
};
//供应商主数据创建
const supplierInsert = data => {
  return serviceJson({
    url: base + "/base/supplierData/insertBbSupplierBase.do",
    method: "post",
    data
  });
};

//供应商主数据获取
const supplierGet = data => {
  return serviceJson({
    url: base + "/base/supplierData/getBbSupplierBase.do",
    method: "post",
    params: data
  });
};

//供应商通讯数据获取
const supplierLinkGet = data => {
  return serviceJson({
    url: base + "/base/supplierData/getBbSupplierMenBySupplierId.do",
    method: "post",
    params: data
  });
};

//供应商银行信息数据获取
const supplierBankGet = data => {
  return serviceJson({
    url: base + "/base/supplierData/getBbSupplierBanksBySupplierId.do",
    method: "post",
    params: data
  });
};

//供应商公司部门数据获取
const supplierBranchGet = data => {
  return serviceJson({
    url: base + "/base/supplierData/getBbSupplierBranchesBySupplierId.do",
    method: "post",
    params: data
  });
};

//供应商主数据修改
const supplierUpdate = data => {
  return serviceJson({
    url: base + "/base/supplierData/updateBbSupplierBase.do",
    method: "post",
    data
  });
};

//供应商主数据删除
const supplierDelete = data => {
  return serviceJson({
    url: base + "/base/supplierData/delBbSupplierBase.do",
    method: "post",
    data
  });
};

//供应商主数据禁用
const supplierDisable = data => {
  return serviceJson({
    url: base + "/base/supplierData/blockUpBbSupplierBase.do",
    method: "post",
    data
  });
};

//供应商主数据启用
const supplierEnable = data => {
  return serviceJson({
    url: base + "/base/supplierData/startUsingBbSupplierBase.do",
    method: "post",
    data
  });
};

//供应商主数据扩展客户
const supplierCopy = data => {
  return serviceJson({
    url: base + "/base/supplierData/copySupplier.do",
    method: "post",
    params: data
  });
};

//删除供应商通讯行
const linkDelete = data => {
  return serviceJson({
    url: base + "/base/supplierData/delBbSupplierMan.do",
    method: "post",
    params: data
  });
};

//删除供应商银行信息行
const bankDelete = data => {
  return serviceJson({
    url: base + "/base/supplierData/delBbSupplierBank.do",
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

//客户字典	
const customerData = data => {
  return serviceJson({
    url: base + "/base/customerData/selectCustomerList.do",
    method: "post",
    data
  });
};

//项目维护列表查询
const projectList = data => {
  return serviceJson({
    url: base + "/base/project/list",
    method: "post",
    data
  });
};

//新增项目
const insertProject = data => {
  return serviceJson({
    url: base + "/base/project/insert",
    method: "post",
    data
  });
};

//附件列表查询
const enclosureList = data => {
  return serviceJson({
    url: base + "/base/sys/list",
    method: "post",
    params:data
  });
};

//项目修改
const projectUpdate = data => {
  return serviceJson({
    url: base + "/base/project/update",
    method: "post",
    data:data
  });
};

//删除项目
const deleteProject= data => {
  return serviceJson({
    url: base + "/base/project/delete",
    method: "post",
    data:data
  });
};
//项目的启用禁用
const updateIsActive= data => {
  return serviceJson({
    url: base + "/base/project/updateIsActive",
    method: "post",
    data:data
  });
};
//	金蝶：核准供应商
const approvalSupplierToKD = data => {
  return service({
    url: base + "/base/supplierData/approvalSupplierToKD.do",
    method: "post",
    data
  });
};
//	金蝶：分配供应商
const assignSupplierToKD = data => {
  return service({
    url: base + "/base/supplierData/assignSupplierToKD.do",
    method: "post",
    data
  });
};
//	金蝶：推送供应商
const pushSupplierToKD = data => {
  return service({
    url: base + "/base/supplierData/pushSupplierToKD.do",
    method: "post",
    data
  });
};
//	金蝶：导入客户财务资料
const importSupplierCompanyToKD = data => {
  return serviceJson({
    url: base + "/base/supplierData/importSupplierCompanyToKD.do",
    method: "post",
    data
  });
};
//物料档案导出
const exportSupplier = data => {
  return service({
      url: base + "/base/supplierData/exportSupplier.do",
      method: "post",
      responseType: 'blob',
     data
  });
};
export default {
  supplierList,
  bbSupplierBaseList2,
  supplierInsert,
  supplierGet,
  supplierLinkGet,
  supplierBankGet,
  supplierBranchGet,
  supplierUpdate,
  supplierDelete,
  supplierDisable,
  supplierEnable,
  supplierCopy,
  linkDelete,
  bankDelete,
  dicQuery,
  areaList,
  customerData,
  insertProject,
  projectList,
  enclosureList,
  projectUpdate,
  deleteProject,
  updateIsActive,
  approvalSupplierToKD,
  assignSupplierToKD,
  pushSupplierToKD,
  importSupplierCompanyToKD,
  exportSupplier
};