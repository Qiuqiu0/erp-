import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix1;

//查询仓库主数据列表
const wareList = data => {
  return serviceJson({
    url: suffix + "/base/data/ware/list.do",
    method: "post",
    data
  });
};

//停用仓库基本数据
const wareBblock = data => {
  return serviceJson({
    url: suffix + "/base/data/ware/blockUpBbWarehouse.do",
    method: "post",
    data
  });
};

//删除仓库基础数据
const delWare = data => {
  return serviceJson({
    url: suffix + "/base/data/ware/delBbWarehouseBase.do",
    method: "post",
    data
  });
};

//	启用仓库基础数据
const startWare = data => {
  return serviceJson({
    url: suffix + "/base/data/ware/startUsingBbWarehouseBase.do",
    method: "post",
    data
  });
};

//修改仓库基本数据
const updateWare = data => {
  return serviceJson({
    url: suffix + "/base/data/ware/updateBbWarehouse.do",
    method: "post",
    data
  });
};

//仓库类型
const selectWare = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data
  });
};

//地址查询
const areaList = data => {
  return service({
    url: suffix + "/base/area/list",
    method: "post",
    data
  });
};

//新建仓库
const addBbWare = data => {
  return serviceJson({
    url: suffix + "/base/data/ware/addBbWarehouse.do",
    method: "post",
    data
  });
};

//仓库详情
const detailWare = data => {
  return service({
    url: suffix + "/base/data/ware/getBbWarehouseDetail.do",
    method: "post",
    data
  });
};

//删除仓库联系人基础数据
const detLink = data => {
  return serviceJson({
    url: suffix + "/base/data/warehouseLink/delBbWarehouseLink.do",
    method: "post",
    data
  });
};
//基本单位
const getUnit = data => {
  return service({
    url: suffix + "/gd/goodUnit/getGdGoodsUnitListByIsInactive.do",
    method: "post",
    data
  });
};
//仓库同步
const slTogether = data => {
  return service({
    url: suffix + "/base/data/ware/extractWarehouseFromKD.do",
    method: "get",
    data
  });
};
export default {
  getUnit,
  wareList,
  delWare,
  wareBblock,
  startWare,
  updateWare,
  selectWare,
  areaList,
  addBbWare,
  detailWare,
  detLink,
  slTogether
};
