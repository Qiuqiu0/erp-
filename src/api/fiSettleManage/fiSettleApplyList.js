import { serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
let base = window.ROOT_PATH.suffix1;
//获取结售汇申请列表
export const getFiSettleApplyList = data => {
  return serviceJson({
    url: suffix + "/capital/fisettleapply/selectFiSettleApplyListV2.do",
    method: "post",
    data
  });
};
// 删除结售汇申请
export const delFiSettleApply = data => {
  return serviceJson({
    url: suffix + "/capital/fisettleapply/delFiSettleApply.do",
    method: "post",
    data
  });
};
// 结售汇申请审核
export const checkFiSettleApply = data => {
  return serviceJson({
    url: suffix + "/capital/fisettleapply/approveFiSettleApply.do",
    method: "post",
    data
  });
};
// 结售汇申请提交
export const submitFiSettleApply = data => {
  return serviceJson({
    url: suffix + "/capital/fisettleapply/submitFiSettleApply.do",
    method: "post",
    data
  });
};
// 结售汇申请快捷执行
export const fisettleapplyJudge = data => {
  return serviceJson({
    url: suffix + "/capital/fisettleapply/judge.do",
    method: "post",
    data
  });
};
