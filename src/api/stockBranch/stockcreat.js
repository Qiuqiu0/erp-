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
//查询汇率
export const pariList = data => {
  return service({
    url: base + "/base/data/parities/getParities.do",
    method: "post",
    data
  });
};
//新增入库单保存
export const wareSave = data => {
  return serviceJson({
    url: suffix + "/transfer/addOdInvTransfer.do",
    method: "post",
    data
  });
};
//修改入库单保存
export const wareSaves = data => {
  return serviceJson({
    url: suffix + "/transfer/editOdInvTransfer.do",
    method: "post",
    data
  });
};
//查看或修改页面时需要加载的数据
//获取其他入库数据根据id
export const getInformation = data => {
  return serviceJson({
    url: suffix + "/transfer/odInvTransferById.do",
    method: "post",
    params: data
  });
};
//表格删除明细
export const reducemsg = data => {
  return serviceJson({
    url: suffix + "/transfer/delOdInvTransferItems.do",
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
//查询业务币种
export const comCurrency = data => {
  return serviceJson({
    url: base + "/base/data/currency/list.do",
    method: "post",
    data
  });
};
