// eslint-disable-next-line no-unused-vars
import {
  service,
  upload,
  serviceJson
} from "@/axios/index";
// const suffix = window.ROOT_PATH.suffix3; //suffix2: '/api/capital',
const baseURL = window.ROOT_PATH.suffix1; //		suffix1: '/api/base', //基础数据

//------------校验银行名称、行号---------
export const nameAndCode = data => {
  return serviceJson({
    url: baseURL + "/base/data/bank/nameAndCode.do",
    method: "post",
    data
  });
};