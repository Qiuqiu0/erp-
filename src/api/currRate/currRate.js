import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix1;

//查询货币主数据列表分页
const currList = data => {
  return serviceJson({
    url: suffix + "/base/data/currency/list.do",
    method: "post",
    data
  });
};

//停用货币基本数据
const blockCurr = data => {
  return serviceJson({
    url: suffix + "/base/data/currency/blockUpBbCurrency.do",
    method: "post",
    data
  });
};

//删除货币基础数据
const delCurr = data => {
  return serviceJson({
    url: suffix + "/base/data/currency/delBbBankBase.do",
    method: "post",
    data
  });
};

//新增货币数据
const addCur = data => {
  return serviceJson({
    url: suffix + "/base/data/currency/insertBbCurrency.do",
    method: "post",
    data
  });
};

//启用货币基础数据
const startCurr = data => {
  return serviceJson({
    url: suffix + "/base/data/currency/startUsingBbBankBase.do",
    method: "post",
    data
  });
};
// //货币同步（金蝶）
// const hbTogether = data => {
//   return serviceJson({
//     url: suffix + "/base/king/saveCurrency.do",
//     method: "post",
//     data
//   });
// };
//货币同步（用友）
const hbTogether = data => {
  return serviceJson({
    url: suffix + "/base/subject/syncCurrency.do",
    method: "post",
    data
  });
};
export default {
  currList,
  blockCurr,
  delCurr,
  addCur,
  startCurr,
  hbTogether
};
