import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix2;
let base = window.ROOT_PATH.suffix1;
let suffix3 = window.ROOT_PATH.suffix3;

//采购退货入库单列表
const odWvList2CreatedUnWv = data => {
  return serviceJson({
    url: suffix + "/business/purchase/wv/odWvList2CreatedUnWv",
    method: "post",
    data: data
  });
};
//供应商主数据列表
const supplierList = data => {
  return serviceJson({
    url: base + "/base/supplierData/bbSupplierBaseList2.do",
    method: "post",
    data
  });
};
//获取仓库下拉列表
const getBbWarehouseListSimple = data => {
  return service({
    url: base + "/base/data/ware/getBbWarehouseListSimple.do",
    method: "post",
    data
  });
};
//获取员工下拉列表
const employeeSelect = data => {
  return service({
    url: base + "/base/employee/employeeSelect",
    method: "post",
    data
  });
};
//采购费用预提删除
const odUnwvList = data => {
  return serviceJson({
    url: suffix + "/business/purchase/unwv/odUnwvListV2",
    method: "post",
    data: data
  });
};
//采购退货单详情
const odUnwvDetail = data => {
  return serviceJson({
    url: suffix + "/business/purchase/unwv/odUnwvDetail",
    method: "post",
    data: data
  });
};
//单据状态
const select = data => {
  return service({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    data: data
  });
};
//采购退货单详情
const odWvDetail = data => {
  return serviceJson({
    url: suffix + "/business/purchase/wv/odWvDetail",
    method: "post",
    data: data
  });
};
//采购退货单详情删除行
const deleteUnwvItems = data => {
  return serviceJson({
    url: suffix + "/business/purchase/unwv/deleteUnwvItems",
    method: "post",
    data: data
  });
};
//采购退货单新增
const createUnwv = data => {
  return serviceJson({
    url: suffix + "/business/purchase/unwv/createUnwv",
    method: "post",
    data: data
  });
};
//采购退货单删除
const deleteOdUnwv = data => {
  return serviceJson({
    url: suffix + "/business/purchase/unwv/deleteOdUnwv",
    method: "post",
    data: data
  });
};
//采购退货单提交
const submitApprove = data => {
  return serviceJson({
    url: suffix + "/business/purchase/unwv/submitApprove",
    method: "post",
    data: data
  });
};
//月结 退货日期范围
const getAccountPeriodByCompany = data => {
  return serviceJson({
    url: suffix3 + "/capital/monthbanlance/getAccountPeriodByCompany.do",
    method: "post",
    params:data
  });
};
//退货单审核
const ApproveUnwv = data => {
  return serviceJson({
    url: suffix + "/business/purchase/unwv/ApproveUnwv",
    method: "post",
    data
  });
};
//退货单修改保存
const updateUnwv = data => {
  return serviceJson({
    url: suffix + "/business/purchase/unwv/updateUnwv",
    method: "post",
    data
  });
};
//查询汇率
const getParitiesByCode = data => {
  return service({
    url: base + "/base/data/parities/getParitiesByCode.do",
    method: "post",
    data
  });
};
 //本位币
 const listSimple = data => {
 return serviceJson({
  url: base + "/base/data/currency/listSimple.do",
  method: "post",
  data
});
};
export default {
  odWvList2CreatedUnWv,
  supplierList,
  employeeSelect,
  getBbWarehouseListSimple,
  odUnwvList,
  odUnwvDetail,
  select,
  odWvDetail,
  deleteUnwvItems,
  createUnwv,
  deleteOdUnwv,
  submitApprove,
  getAccountPeriodByCompany,
  ApproveUnwv,
  updateUnwv,
  getParitiesByCode,
  listSimple
};
