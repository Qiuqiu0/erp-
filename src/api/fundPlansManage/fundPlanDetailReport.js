import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
//资金计划管理列表查询
export const getFundPlanDetailReport = data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/financialDetailReportList",
    method: "post",
    data
  });
};
//导出资金计划明细
export const exportFundPlanDetailReport = data => {
  return serviceJson({
    url: suffix + "/capital/financialPlan/financialDetailReportListExport",
    method: "post",
    responseType: 'arraybuffer',
    data
  });
};