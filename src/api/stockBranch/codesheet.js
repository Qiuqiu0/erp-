import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix2;
let base = window.ROOT_PATH.suffix1;
//查询数据列表
export const warelist = data => {
  return serviceJson({
    url: suffix + "/od/dockSo/dockSoList.do",
    method: "post",
    data
  });
};
//删除数据
export const reduceMsg = data => {
  return serviceJson({
    url: suffix + "/od/dockSo/delDockSo.do",
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
export const getEffect = data => {
  //生效
  return serviceJson({
    url: suffix + "/od/dockSo/takeEffect.do",
    method: "post",
    data
  });
};
