import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
//资金计划偏离报表查询
export const getTheVarianceFundPlanReport = data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/financialDeviateReportList",
    method: "post",
    data
  });
};
//导出资金计划偏离报表
export const exportTheVarianceFundPlanReport = data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/financialDeviateReportListExport",
    responseType: 'arraybuffer',
    method: "post",
    data
  });
};