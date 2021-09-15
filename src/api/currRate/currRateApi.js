// eslint-disable-next-line no-unused-vars
import {
  service,
  upload,
  serviceJson
} from "@/axios/index";
// const suffix = window.ROOT_PATH.suffix3; //suffix2: '/api/capital',
const baseURL = window.ROOT_PATH.suffix1; //		suffix1: '/api/base', //基础数据

//------------校验货币名称或者代码---------
export const NameAndCode = data => {
  return serviceJson({
    url: baseURL + "/base/data/currency/NameAndCode.do",
    method: "post",
    data
  });
};