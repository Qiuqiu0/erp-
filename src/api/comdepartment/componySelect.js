import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix1;
let suffix2 = window.ROOT_PATH.suffix2;
//查询公司主数据列表
const componyList = data => {
  return serviceJson({
    url: suffix + "/base/company/selectBbCompanyBaselist.do",
    method: "post",
    data
  });
};

//查询公司主数据列表
const brnchList = data => {
  return serviceJson({
    url: suffix + "/base/branch/selectBbBranchBaselist.do",
    method: "post",
    data
  });
};
//查询公司主数据列表
const brnchList2 = data => {
  return serviceJson({
    url: suffix + "/base/branch/bbBranchBaseCollectList.do",
    method: "post",
    data
  });
};
//收藏
const branchCollect = data => {
  return serviceJson({
    url: suffix + "/base/branch/bbBranchBaseCollect.do",
    method: "post",
    data
  });
};
//取消收藏
const branchDeleteCollect = data => {
  return serviceJson({
    url: suffix + "/base/branch/bbBranchBaseCollectDelete.do",
    method: "post",
    data
  });
};


//查询员工列表
const empList = data => {
  return serviceJson({
    url: suffix + "/base/employee/list",
    method: "post",
    data
  });
};

//查询员工列表
const empList2 = data => {
  return serviceJson({
    url: suffix + "/base/employee/collect/list",
    method: "post",
    data
  });
};
//员工收藏
const empCollection = data => {
  return serviceJson({
    url: suffix + "/base/employee/collect",
    method: "post",
    data
  });
};
//员工删除
const empCollectionDelete = data => {
  return serviceJson({
    url: suffix + "/base/employee/remove",
    method: "post",
    data
  });
};
//查询项目列表
const projectList = data => {
  return serviceJson({
    url: suffix + "/base/project/list",
    method: "post",
    data
  });
};

//查询供应商列表
const supplierList = data => {
  return serviceJson({
    url: suffix + "/base/supplierData/bbSupplierBaseList2.do",
    method: "post",
    data
  });
};

//查询货币列表
const currenList = data => {
  return serviceJson({
    url: suffix + "/base/data/currency/list.do",
    method: "post",
    data
  });
};

//国家信息
const areaList = () => {
  return service({
    url: suffix + "/base/area/list",
    method: "post",
    data: {
      regionId: 0
    }
  });
};

//通过条件查询物料分类
const matterList = data => {
  return serviceJson({
    url: suffix + "/goodsCategory/select.do",
    method: "post",
    data
  });
};
//查询spu主数据列表
const spuList = data => {
  return serviceJson({
    url: suffix + "/base/spu/getGdGoodsBaseSpuList.do",
    method: "post",
    data
  });
};
//通过SPUID获取属性信息
const infoList = data => {
  return service({
    url: suffix + "/gd/specificationInfo/getGdSpecificationInfoListBySpuId.do",
    method: "post",
    data
  });
};
//根据属性ID获取属性值信息
const getSpec = data => {
  return service({
    url:
      suffix +
      "/gd/specificationValue/getGdSpecificationValueBySpecificationId.do",
    method: "post",
    data
  });
};
//查询sku公共组件-new
const skuList = data => {
  return serviceJson({
    url: suffix + "/base/sku/getSkuModulListNew.do",
    method: "post",
    data
  });
};
//字典表查询 项目类型
const dicList = () => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1005
    }
  });
};
//物料大类下拉列表
const categorySelectBox = data => {
  return serviceJson({
    url: suffix + "/goodsCategory/getGoodsCategorySelectBox.do",
    method: "get"
  });
};
//弹窗物料号列表接口
const skuModulList = data => {
  return serviceJson({
    url: suffix + "/base/sku/getSkuModulList.do",
    method: "post",
    data
  });
};
//查询港口列表
const portList = data => {
  return serviceJson({
    url: suffix + "/base/port/list",
    method: "post",
    data
  });
};
//查询框架协议主数据列表
const fwList = data => {
  return serviceJson({
    url: suffix2 + "/odFwContract/getOdFwContractList.do",
    method: "post",
    data
  });
};
//合同状态查询
const htzt = () => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1013
    }
  });
};
export default {
  htzt,
  fwList,
  componyList,
  brnchList,
  brnchList2,
  empList,
  empList2,
  projectList,
  dicList,
  supplierList,
  currenList,
  matterList,
  categorySelectBox,
  skuModulList,
  portList,
  areaList,
  spuList,
  infoList,
  getSpec,
  branchCollect,
  branchDeleteCollect,
  empCollection,
  empCollectionDelete,
  skuList
};
