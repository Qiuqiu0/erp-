import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix1;

//汇率列表
const pariList = data => {
  return serviceJson({
    url: suffix + "/base/data/parities/list.do",
    method: "post",
    data
  });
};

//新增汇率数据
const addParitie = data => {
  return serviceJson({
    url: suffix + "/base/data/parities/insertBbParities.do",
    method: "post",
    data
  });
};

//删除汇率基础数据
const delBbParitiesBase = data => {
  return serviceJson({
    url: suffix + "/base/data/parities/delBbParitiesBase.do",
    method: "post",
    data
  });
};

//启用汇率基础数据
const startParitie = data => {
  return serviceJson({
    url: suffix + "/base/data/parities/startUsingBbParitiesBase.do",
    method: "post",
    data
  });
};

//停用汇率基本数据
const blockUpBbParities = data => {
  return serviceJson({
    url: suffix + "/base/data/parities/blockUpBbParities.do",
    method: "post",
    data
  });
};

//修改汇率基本数据
const updateParitie = data => {
  return serviceJson({
    url: suffix + "/base/data/parities/updateBbParities.do",
    method: "post",
    data
  });
};

//查询货币主数据列表无分页
const listSimple = data => {
  return serviceJson({
    url: suffix + "/base/data/currency/listSimple.do",
    method: "post",
    data
  });
};
//税率同步
const slTogether = data => {
  return serviceJson({
    url: suffix + "/base/taxRate/saveTaxRate.do",
    method: "post",
    data
  });
};
// //汇率同步（金蝶）
// const hlTogether = data => {
//   return serviceJson({
//     url: suffix + "/base/king/saveParities.do",
//     method: "post",
//     data
//   });
// };
//汇率同步（金蝶）
const hlTogether = data => {
  return serviceJson({
    url: suffix + "/base/subject/syncParities.do",
    method: "post",
    data
  });
};
export default {
  pariList,
  addParitie,
  blockUpBbParities,
  delBbParitiesBase,
  startParitie,
  updateParitie,
  listSimple,
  slTogether,
  hlTogether
};
