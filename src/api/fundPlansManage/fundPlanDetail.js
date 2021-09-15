import { serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
// 资金计划管理详情
export const getFundPlanDetail = params => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/planDetail",
    method: "post",
    params
  });
};
// 资金计划管理保存
export const saveFundPlanDetail = data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/insertOrUpdatePlan",
    method: "post",
    data
  });
};
// 资金计划管理明细删除
export const delFundPlanItem = data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/deletePlanDetail",
    method: "post",
    data
  });
};
// 自动获取资金计划 
export const getdefinePlan = data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/getFinancialPlanDefine",
    method: "post",
    data
  });
};