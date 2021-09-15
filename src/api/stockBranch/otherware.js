import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix2;
let base = window.ROOT_PATH.suffix1;
let suffix2 = window.ROOT_PATH.suffix3;
//查询数据列表
export const warelist = data => {
  return serviceJson({
    url: suffix + "/business/otherArrive/odOhGrnListV2.do",
    method: "post",
    data
  });
};
export const getMylx = data => {
  //获取贸易类型(入库全部下拉数据)
  return serviceJson({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    params: data
  });
};
//获取批次号弹框数据(明细)
export const batchNumber = data => {
  return serviceJson({
    url: suffix + "/business/otherArrive/getOdInventoryDetailVOList.do",
    method: "post",
    data
  });
};
//获取批次号弹框数据(非明细)
export const batchNumbers = data => {
  return serviceJson({
    url: suffix + "/odInventory/queryInventory.do",
    method: "post",
    data
  });
};
//删除数据
export const reduceMsg = data => {
  return serviceJson({
    url: suffix + "/business/otherArrive/batchDeleteOdOhGrn.do",
    method: "post",
    data
  });
};
//提交其他入库
export const subMission = data => {
  return serviceJson({
    url: suffix + "/business/otherArrive/submitOdOhGrn.do",
    method: "post",
    data
  });
};
//其他入库总计
export const odOhGrnListSumV2 = data => {
  return serviceJson({
    url: suffix + "/business/otherArrive/odOhGrnListSumV2.do",
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
//审核其他入库
export const toExamine = data => {
  return serviceJson({
    url: suffix + "/business/otherArrive/examineOdOhGrn.do",
    method: "post",
    data
  });
};
//驳回其他入库
export const reJect = data => {
  return serviceJson({
    url: suffix + "/business/otherArrive/rejectOdOhGrn.do",
    method: "post",
    data
  });
};
//驳回其他入库
export const getRktime = data => {
  return serviceJson({
    url: suffix + "/business/otherArrive/getOdOhGrnDateById.do",
    method: "post",
    params: data
  });
};
