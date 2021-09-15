import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
//资金计划定义列表查询
export const getDefinePlanList = data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/defineListV2",
    method: "post",
    data
  });
};
//新增资金计划定义
export const addDefinePlan = data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/insertDefine",
    method: "post",
    data
  });
};
//月初资金占用管理
export const selectFiCashTakeUpList = data => {
  return serviceJson({
    url: suffix + "/fiCashTakeUp/selectFiCashTakeUpList.do",
    method: "post",
    data
  });
};
//月初资金占用管理新增
export const savePreMonthFiCashTakeUpList = data => {
  return serviceJson({
    url: suffix + "/fiCashTakeUp/savePreMonthFiCashTakeUpList.do",
    method: "post",
    data
  });
};
//获取上月月末现款占用
export const selectPreMonthFiCashTakeUpList = data => {
  return service({
    url: suffix + "/fiCashTakeUp/selectPreMonthFiCashTakeUpList.do",
    method: "post",
    data
  });
};
//删除
export const deleteFiCashTakeUpList = data => {
  return serviceJson({
    url: suffix + "/fiCashTakeUp/deleteFiCashTakeUpList.do",
    method: "post",
    data
  });
};