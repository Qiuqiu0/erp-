import { service, serviceJson } from "../axios/index";
import axios from "axios";
let base = window.ROOT_PATH.suffix1;
let epvoa=window.ROOT_PATH.suffix6;//oa跳转
export const GetUserSystems = () => {
  return axios({
    url: "./userSys.json",
    method: "get"
  });
};
export const GetSystems = () => {
  return service({
    url: "system.json",
    method: "get"
  });
};
export const logRecord = data => {
  return serviceJson({
    url: "/login/logRecord",
    method: "post",
    params: data
  });
};
//获取菜单信息
export const getUserAuth = data =>{
  return serviceJson({
    url:base+'/base/user/getUserAuthNew',
    method:"post",
    params:data
  })
};
//重定向oa接口
export const getRedictToOaUrl = data =>{
  return serviceJson({
    url:epvoa+'/oa/getRedictToOaUrl',
    method:"post",
    params:data
  })
};
//收藏菜单功能
  //添加菜单
export const addCollections = data =>{
  return serviceJson({
    url:base+'/base/collections',
    method:"post",
    data
  })
};
  //获取菜单
export const getCollections = () =>{
  return serviceJson({
    url:base+'/base/collections',
    method:"get"
  })
};
  // 移除菜单
export const deletCollections = data =>{
  return serviceJson({
    url:base+`/base/collections/${data}`,
    method:"delete"
  })
};
//用户常用菜单添加
export const commonList = data => {
  return serviceJson({
    url: base + '/base/common/module/commonly/used',
    method: "post",
    data
  })
}