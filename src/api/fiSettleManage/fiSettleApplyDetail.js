import { serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
let base = window.ROOT_PATH.suffix1;
// 结售汇申请保存
export const saveFiSettleApply = data => {
  return serviceJson({
    url: suffix + "/capital/fisettleapply/saveFiSettleApply.do",
    method: "post",
    data
  });
};
// 获取结售汇申请详情
export const getFiSettleApplyDetail = params => {
  return serviceJson({
    url: suffix + "/capital/fisettleapply/selectFiSettleApply.do",
    method: "post",
    params
  });
};
// 获取结售汇申请明细
export const getFiSettleApplyItemDetail = params => {
  return serviceJson({
    url: suffix + "/capital/fisettleapply/selectFiSettleApplyItems.do",
    method: "post",
    params
  });
}; 
// 删除结售汇申请明细
export const delFiSettleApplyItem = data => {
  return serviceJson({
    url: suffix + "/capital/fisettleapply/delFiSettleApplyItems.do",
    method: "post",
    data
  });
};