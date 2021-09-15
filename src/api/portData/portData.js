import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix1;

//查询港口
const portList = data => {
  return serviceJson({
    url: suffix + "/base/port/list",
    method: "post",
    data
  });
};

//插入港口
const portInse = data => {
  return serviceJson({
    url: suffix + "/base/port/insertOrUpdate",
    method: "post",
    data
  });
};

//启用港口
const portOpen = data => {
  return serviceJson({
    url: suffix + "/base/port/open",
    method: "post",
    data
  });
};

//禁用港口
const portBlock = data => {
  return serviceJson({
    url: suffix + "/base/port/block",
    method: "post",
    data
  });
};

//删除港口
const portDel = data => {
  return serviceJson({
    url: suffix + "/base/port/delete",
    method: "post",
    data
  });
};

//地址查询
const areaList = data => {
  return service({
    url: suffix + "/base/area/list",
    method: "post",
    data
  });
};

export default {
  portList,
  portInse,
  portDel,
  areaList,
  portOpen,
  portBlock
};
