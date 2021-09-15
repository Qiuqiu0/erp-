import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix2;
let suffix2 = window.ROOT_PATH.suffix3;
//新增入库单保存
export const wareSave = data => {
  return serviceJson({
    url: suffix + "/business/otherArrive/insertOdOhGrn.do",
    method: "post",
    data
  });
};
//修改入库单保存
export const wareSaves = data => {
  return serviceJson({
    url: suffix + "/business/otherArrive/updateOdOhGrn.do",
    method: "post",
    data
  });
};
//查看或修改页面时需要加载的数据
//获取其他入库数据根据id
export const getInformation = data => {
  return serviceJson({
    url: suffix + "/business/otherArrive/getOdOhGrn.do",
    method: "post",
    params: data
  });
};
//获取其他入库明细数据根据入库单编码
export const getInformations = data => {
  return serviceJson({
    url: suffix + "/business/otherArrive/getOdOhGrnItems.do",
    method: "post",
    params: data
  });
};
//修改表格删除调接口
export const reducemsg = data => {
  return serviceJson({
    url: suffix + "/business/otherArrive/delOdOhGrnItems.do",
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
