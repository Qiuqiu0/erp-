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
//新增出库单保存
export const wareSave = data => {
  return serviceJson({
    url: suffix + "/business/otherLeave/insertOdOhOdo.do",
    method: "post",
    data
  });
};
//修改出库单保存
export const wareSaves = data => {
  return serviceJson({
    url: suffix + "/business/otherLeave/updateOdOhOdo.do",
    method: "post",
    data
  });
};
//查看或修改页面时需要加载的数据
//获取其他出库数据根据id
export const getInformation = data => {
  return serviceJson({
    url: suffix + "/business/otherLeave/getOdOhOdo.do",
    method: "post",
    params: data
  });
};
//获取其他出库明细数据根据入库单编码
export const getInformations = data => {
  return serviceJson({
    url: suffix + "/business/otherLeave/getOdOhOdoItems.do",
    method: "post",
    params: data
  });
};
//修改表格删除调接口
export const reducemsg = data => {
  return serviceJson({
    url: suffix + "/business/otherLeave/delOdOhOdoItems.do",
    method: "post",
    params: data
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
