// eslint-disable-next-line no-unused-vars
import { service, upload, serviceJson } from "@/axios/index";
const suffix = window.ROOT_PATH.suffix3; //suffix2: '/api/capital',
// const baseURL = window.ROOT_PATH.suffix1; //		suffix1: '/api/base', //基础数据

//------------月结信息结转---------
export const carryFiCompany = data => {
  return serviceJson({
    url: suffix + "/capital/monthbanlance/carryFiCompany.do",
    method: "post",
    data
  });
};
//------------根据公司查询会计期间---------
export const getAccountPeriodByCompany = data => {
  return serviceJson({
    url: suffix + "/capital/monthbanlance/getAccountPeriodByCompany.do",
    method: "post",
    data
  });
};
//------------月结信息新增---------
export const saveFiCompany = data => {
  return serviceJson({
    url: suffix + "/capital/monthbanlance/saveFiCompany.do",
    method: "post",
    data
  });
};
//------------	月结列表查询---------
export const selectFiCompanyList = data => {
  return serviceJson({
    url: suffix + "/capital/monthbanlance/selectFiCompanyList.do",
    method: "post",
    data
  });
};
//------------月结信息上期记账状态修改---------
export const updateAccountState = data => {
  return serviceJson({
    url: suffix + "/capital/monthbanlance/updateAccountState.do",
    method: "post",
    data
  });
};
