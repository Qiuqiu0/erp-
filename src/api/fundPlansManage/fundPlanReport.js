import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
//资金计划汇总报表查询
export const getFundPlanReport = data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/financialSumReportList",
    method: "post",
    data
  });
};
//导出资金计划汇总报表
export const exportFundPlanReport = data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/financialSumReportListExport",
    responseType: 'arraybuffer',
    method: "post",
    data
  });
};