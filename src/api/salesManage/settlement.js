import { service, serviceJson } from "../../axios/index";
let base = window.ROOT_PATH.suffix1;
let suffix = window.ROOT_PATH.suffix2;
let suffix2 = window.ROOT_PATH.suffix3;
//删除结算单??
export const reduceMsg = data => {
  return serviceJson({
    url: suffix + "/business/settle/delSoSettleInfo.do",
    method: "post",
    data
  });
};
//查询数据列表
export const warelist = data => {
  return serviceJson({
    url: suffix + "/business/settle/listV2.do",
    method: "post",
    data
  });
};
//获取单据状态下拉数据
export const getDjzt = data => {
  return serviceJson({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    params: data
  });
};
//审核计算单??
export const toExamine = data => {
  return serviceJson({
    url: suffix + "/business/settle/examineSoSettleInfo.do",
    method: "post",
    data
  });
};
//提交结算单??
export const subMission = data => {
  return serviceJson({
    url: suffix + "/business/settle/submitSoSettleInfo.do",
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
