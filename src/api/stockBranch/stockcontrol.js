import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix2;
let base = window.ROOT_PATH.suffix1;
let suffix2 = window.ROOT_PATH.suffix3;
export const getMylx = data => {
  //获取调拨单状态
  return serviceJson({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    params: data
  });
};
export const getMylxs = data => {
  //获取调拨单类型
  return serviceJson({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    params: data
  });
};
//查询数据列表
export const warelist = data => {
  return serviceJson({
    url: suffix + "/transfer/odInvTransferListV2.do",
    method: "post",
    data
  });
};
//删除数据
export const reduceMsg = data => {
  return serviceJson({
    url: suffix + "/transfer/delOdInvTransfer.do",
    method: "post",
    data
  });
};
//提交
export const submissionMsg = data => {
  return serviceJson({
    url: suffix + "/transfer/submitOdInvTransfer.do",
    method: "post",
    data
  });
};
//冲销
export const writeoffMsg = data => {
  return serviceJson({
    url: suffix + "/transfer/writeOffOdInvTransfer.do",
    method: "post",
    data
  });
};
//时间选择器选择范围接口
export const getTimes = data => {
  return serviceJson({
    url: suffix2 + "/capital/monthbanlance/getAccountPeriodByCompany.do",
    method: "post",
    params: data
  });
};
//审核其他出库
export const toExamine = data => {
  return serviceJson({
    url: suffix + "	/transfer/examineOdInvTransfer.do",
    method: "post",
    data
  });
};
//获取调拨时间
export const getDbtime = data => {
  return serviceJson({
    url: suffix + "/transfer/queryDateById.do",
    method: "post",
    params: data
  });
};
//驳回调拨
export const reJect = data => {
  return serviceJson({
    url: suffix + "/transfer/rejectOdInvTransfer.do",
    method: "post",
    data
  });
};
//库存调拨总计
export const odInvTransferListSumV2 = data => {
  return serviceJson({
    url: suffix + "/transfer/odInvTransferListSumV2.do",
    method: "post",
    data
  });
};
