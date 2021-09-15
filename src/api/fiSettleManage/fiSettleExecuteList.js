import { serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
let base = window.ROOT_PATH.suffix1;
//获取结售汇执行列表
export const getFiSettleExecuteList = data => {
  return serviceJson({
    url: suffix + "/capital/fisettleexecute/selectFiSettleExecuteListV2.do",
    method: 'post',
    data
  })
}
// 删除结售汇执行
export const delFiSettleExecute = data => {
  return serviceJson({
    url: suffix + "/capital/fisettleexecute/delFiSettleExecute.do",
    method: 'post',
    data
  })
}