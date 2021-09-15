import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix2;
let base = window.ROOT_PATH.suffix1;
let suffix2 = window.ROOT_PATH.suffix3;
export const getMylx = data => {
  //获取方放款类型(出库全部下拉数据)
  return serviceJson({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    params: data
  });
};
export const getMylxs = data => {
  //获取出库单状态
  return serviceJson({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    params: data
  });
};
//删除数据
export const reduceMsg = data => {
  return serviceJson({
    url: suffix + "/business/otherLeave/batchDeleteOdOhOdo.do",
    method: "post",
    data
  });
};
//查询数据列表
export const warelist = data => {
  return serviceJson({
    url: suffix + "/business/otherLeave/odOhOdoListV2.do",
    method: "post",
    data
  });
};
//提交其他出库
export const subMission = data => {
  return serviceJson({
    url: suffix + "	/business/otherLeave/submitOdOhOdo.do",
    method: "post",
    data
  });
};
//其他出库总计
export const odOhOdoListSumV2 = data => {
  return serviceJson({
    url: suffix + "	/business/otherLeave/odOhOdoListSumV2.do",
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
    url: suffix + "/business/otherLeave/examineOdOhOdo.do",
    method: "post",
    data
  });
};
//驳回其他出库
export const reJect = data => {
  return serviceJson({
    url: suffix + "/business/otherLeave/rejectOdOhOdo.do",
    method: "post",
    data
  });
};
//获取出库时间
export const getCktime = data => {
  return serviceJson({
    url: suffix + "/business/otherLeave/getOdOhOdoDateById.do",
    method: "post",
    params: data
  });
};
