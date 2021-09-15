// eslint-disable-next-line no-unused-vars
import {
  service,
  upload,
  serviceJson
} from "@/axios/index";
// const suffix = window.ROOT_PATH.suffix3; //suffix2: '/api/capital',
const baseURL = window.ROOT_PATH.suffix1; //		suffix1: '/api/base', //基础数据

//------------添加物料单位---------
export const addGdGoodsUnit = data => {
  return serviceJson({
    url: baseURL + "/gd/goodUnit/addGdGoodsUnit.do",
    method: "post",
    data
  });
};
//------------作废物料单位---------
export const cancelGdGoodsUnit = data => {
  return serviceJson({
    url: baseURL + "/gd/goodUnit/cancelGdGoodsUnit.do",
    method: "post",
    data
  });
};
//------------验证物料单位编码唯一---------
export const checkUnitCode = data => {
  return service({
    url: baseURL + "/gd/goodUnit/checkUnitCode.do",
    method: "post",
    data
  });
};
//------------验证物料单位编码名称唯一---------
export const checkUnitName = data => {
  return service({
    url: baseURL + "/gd/goodUnit/checkUnitName.do",
    method: "post",
    data
  });
};
//------------修改物料单位---------
export const editGdGoodsUnit = data => {
  return serviceJson({
    url: baseURL + "/gd/goodUnit/editGdGoodsUnit.do",
    method: "post",
    data
  });
};
//------------启用物料单位---------
export const enableGdGoodsUnit = data => {
  return serviceJson({
    url: baseURL + "/gd/goodUnit/enableGdGoodsUnit.do",
    method: "post",
    data
  });
};
//------------按照状态查询物料单位列表---------
export const getGdGoodsUnitListByIsInactive = data => {
  return serviceJson({
    url: baseURL + "/gd/goodUnit/getGdGoodsUnitListByIsInactive.do",
    method: "post",
    data
  });
};
//------------查询物料单位列表---------
export const queryGdGoodsUnitList = data => {
  return serviceJson({
    url: baseURL + "/gd/goodUnit/queryGdGoodsUnitList.do",
    method: "post",
    data
  });
};
//------------通过ID获取物料单位---------
export const queryUnitById = data => {
  return serviceJson({
    url: baseURL + "/gd/goodUnit/queryUnitById.do",
    method: "post",
    data
  });
};
//------------停用物料单位---------
export const stopGdGoodsUnit = data => {
  return serviceJson({
    url: baseURL + "/gd/goodUnit/stopGdGoodsUnit.do",
    method: "post",
    data
  });
};