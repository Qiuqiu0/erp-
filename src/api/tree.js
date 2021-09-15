import { service, serviceJson } from "../axios/index";
let base = "/business";
export const getTree = (data) =>{
    return serviceJson({
      url:base+`/biz/tree?bizCode=${data.bizCode}&bizType=${data.bizType}`,
      method:"get"
    })
};
export const goTreeDetail = (data) =>{
  return serviceJson({
    url:base+`/biz/tree/router?bizCode=${data.bizCode}&bizType=${data.bizType}`,
    method:"get",
  })
};
