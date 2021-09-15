import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
//资金计划管理列表查询
export const getFundPlanList = data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/planListV2",
    method: "post",
    data
  });
};
// 资金计划管理删除
export const delFundPlan = data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/deletePlan",
    method: 'post',
    data
  })
}
// 资金计划管理提交
export const submitFundPlan= data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/submitPlan",
    method: 'post',
    data
  })
}
// 资金计划管理审核
export const checkFundPlan = data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/approvePlan",
    method: 'post',
    data
  })
}
