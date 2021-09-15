import { serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
let base = window.ROOT_PATH.suffix1;
// 结售汇执行保存
export const saveFiSettleExecute = data => {
  return serviceJson({
    url: suffix + "/capital/fisettleexecute/saveFiSettleExecute.do",
    method: "post",
    data
  });
};
// 获取结售汇执行详情
export const getFiSettleExecuteDetail = params => {
  return serviceJson({
    url: suffix + "/capital/fisettleexecute/selectFiSettleExecute.do",
    method: "post",
    params
  });
};
// 获取结售汇执行明细
export const getFiSettleExecuteItemDetail = params => {
  return serviceJson({
    url: suffix + "/capital/fisettleexecute/selectFiSettleExecuteItems.do",
    method: "post",
    params
  });
}; 
// 获取结售汇违约明细
export const getFiSettleLiquidateItemDetail = params => {
  return serviceJson({
    url: suffix + "/capital/fisettleexecute/selectFiSettleContractItems.do",
    method: "post",
    params
  });
};
// 获取结售汇展期明细
export const getFiSettleExtendItemDetail = params => {
  return serviceJson({
    url: suffix + "	/capital/fisettleexecute/selectFiSettleRenewalItems.do",
    method: "post",
    params
  });
};
// 删除结售汇执行明细
export const delFiSettleExecuteItem = data => {
  return serviceJson({
    url: suffix + "/capital/fisettleexecute/delFiSettleExecuteItems.do",
    method: "post",
    data
  });
};