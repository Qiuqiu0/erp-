import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix1;
export const getAdress = data => {
  //获取地址
  return serviceJson({
    url: suffix + "/base/area/list",
    method: "post",
    params: data
  });
};
export const standardCurrency = data => {
  //本位币
  return serviceJson({
    url: suffix + "/base/data/currency/listSimple.do",
    method: "post",
    data
  });
};
export const alertBank = data => {
  //弹框加载银行数据
  return serviceJson({
    url: suffix + "/base/data/bank/list.do",
    method: "post",
    data
  });
};
export const taxPayer = data => {
  //开票信息纳税人下拉选数据
  return serviceJson({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    params: data
  });
};
export const creatMsg = data => {
  //保存数据
  return serviceJson({
    url: suffix + "/base/company/insertOrUpdateBbCompanyBase.do",
    method: "post",
    data
  });
};
export const getmoremsg = data => {
  //查看信息接口不含表格
  return serviceJson({
    url: suffix + "/base/company/selectBbCompanyBaseVoById.do",
    method: "post",
    params: data
  });
};
export const gettelmsg = data => {
  //查看通讯表格
  return serviceJson({
    url: suffix + "/base/link/selectBbCompanyLinklist.do",
    method: "post",
    params: data
  });
};
export const gettablemsg = data => {
  //查看银行表格接口
  return serviceJson({
    url: suffix + "/base/bank/selectBbCompanyBanklist.do",
    method: "post",
    params: data
  });
};
export const removepeople = data => {
  //删除通讯接口
  return serviceJson({
    url: suffix + "/base/company/delBbCompanyLink.do",
    method: "post",
    data
  });
};
export const removebank = data => {
  //删除银行接口
  return serviceJson({
    url: suffix + "/base/company/delBbCompanyBank.do",
    method: "post",
    data
  });
};
