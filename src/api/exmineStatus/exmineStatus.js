/*
 * @Author: your name
 * @Date: 2021-05-19 14:27:34
 * @LastEditTime: 2021-05-20 15:07:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zjhz_erp-source\src\api\exmineStatus\exmineStatus.js
 */
// eslint-disable-next-line no-unused-vars
import { serviceJson,service } from "@/axios/index";
const suffix = window.ROOT_PATH.suffix2; // suffix2: '/api/business', //业务功能
const baseURL = window.ROOT_PATH.suffix1; // suffix1: '/api/base', //基础数据
const oaUrl = window.ROOT_PATH.suffix6; // suffix6： '/api/oaa', // oa
//------------流程列表---------
export const getOaFlowInfo = data => {
  return serviceJson({
    url: baseURL + "/oa/getOaFlowInfo.do",
    method: "post",
    data
  });
};
//------------列表详情---------
export const getRequestOperatorInfo = data => {
  return service({
    url: oaUrl + "/oa/getRequestOperatorInfo.do ",
    method: "post",
    data
  });
};