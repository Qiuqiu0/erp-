import { service, serviceJson } from "@/axios/index";
import axios from "axios";
let base = window.ROOT_PATH.suffix1;
let business= window.ROOT_PATH.suffix2;
//获取用户常用菜单
export const getCommonList = () =>{
    return serviceJson({
      url:base+'/base/common/module/commonly/used',
      method:"get"
    })
};
//获取用户待审核模块列表
export const getAuditedList = data =>{
    return serviceJson({
      url:base+`/pending/review/users/${data}`,
      method:"get"
    })
};
//获取自定义事项列表（总量）
export const getAllMatter = () =>{
    return serviceJson({
      url:base+'/pending/review/base',
      method:"get"
    })
};
//从总量添加到业务或者财务
export const addMoudel = data =>{
    return serviceJson({
      url:base+'/pending/review/users',
      method: "post",
      params:data
    })
};
//移除业务可看单据
export const deleteMoudel = data =>{
  return serviceJson({
    url:base+'/pending/review/users',
    method: "delete",
    params:data
  })
};
//清空全部单据
// /pending/review/users/{displayType}
export const deleteAllModel = data =>{
  return serviceJson({
    url:base+`/pending/review/users/${data}`,
    method: "delete"
  })
};
//预警信息
export const getOdWarningList = data =>{
  return serviceJson({
    url:business+`/odWarning/getOdWarningList.do`,
    method: "post",
    data
  })
};
//------------字典查询---------
export const getDicList = data => {
  return service({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    data
  });
};