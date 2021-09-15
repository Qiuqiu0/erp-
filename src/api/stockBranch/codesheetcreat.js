import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix2;
let base = window.ROOT_PATH.suffix1;
//新增入库单保存
export const wareSave = data => {
  return serviceJson({
    url: suffix + "/od/dockSo/addDockSo.do",
    method: "post",
    data
  });
};
//修改入库单保存
export const wareSaves = data => {
  return serviceJson({
    url: suffix + "/od/dockSo/editDockSo.do",
    method: "post",
    data
  });
};
//查看或修改页面时需要加载的数据
//获取其他入库数据根据id
export const getInformation = data => {
  return serviceJson({
    url: suffix + "/od/dockSo/queryDockSoById.do",
    method: "post",
    params: data
  });
};
//修改表格明细删除调接口
export const reducemsg = data => {
  return serviceJson({
    url: suffix + "/od/dockSoItems/delDockSoItems.do",
    method: "post",
    data
  });
};
//查询库存可用数
export const kcnumQuery = data => {
  return serviceJson({
    url: suffix + "/odInventory/queryWareQty.do",
    method: "post",
    data
  });
};
export const getMylxs = data => {
  //获取状态
  return serviceJson({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    params: data
  });
};
