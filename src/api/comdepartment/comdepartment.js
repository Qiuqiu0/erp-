import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix1;
export const getCompany = data => {
  //获取地址
  return serviceJson({
    url: suffix + "/base/branch/selectBbBranchBaselist.do",
    method: "post",
    data
  });
};
export const saveMsg = data => {
  //保存数据
  return serviceJson({
    url: suffix + "/base/branch/insertOrUpdateBbBranchBase.do",
    method: "post",
    data
  });
};
export const reduceMsg = data => {
  //删除
  return serviceJson({
    url: suffix + "/base/branch/delBbBranchBaseInactive.do",
    method: "post",
    data
  });
};
export const departEnable = data => {
  //启用
  return serviceJson({
    url: suffix + "/base/branch/startBbBranchBaseInactive.do",
    method: "post",
    data
  });
};
export const departProhibit = data => {
  //禁用
  return serviceJson({
    url: suffix + "/base/branch/blockBbBranchBaseInactive.do",
    method: "post",
    data
  });
};
export const codeMore = data => {
  //检验是否重复code
  return serviceJson({
    url: suffix + "/base/branch/checkRepeated.do",
    method: "post",
    params: data
  });
};
export const treesFrame = data => {
  //右边表格
  return serviceJson({
    url: suffix + "/bbHrOrg/getOrgsByCodeAndName",
    method: "post",
    data
  });
};
export const treeAload = data => {
  //左边树
  return serviceJson({
    url: suffix + "/bbHrOrg/getRootNode",
    method: "post",
    params: data
  });
};
