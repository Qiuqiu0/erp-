import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix1;

//查询银行主数据列表
const bankList = data => {
  return serviceJson({
    url: suffix + "/base/data/bank/list.do",
    method: "post",
    data
  });
};

//删除银行基础数据
const delBank = data => {
  return serviceJson({
    url: suffix + "/base/data/bank/delBbBankBase.do",
    method: "post",
    data
  });
};

//批量新增/修改银行数据
const insBank = data => {
  return serviceJson({
    url: suffix + "/base/data/bank/insertBbBank.do",
    method: "post",
    data
  });
};

//启用银行基础数据
const startBank = data => {
  return serviceJson({
    url: suffix + "/base/data/bank/startUsingBbBankBase.do",
    method: "post",
    data
  });
};

//停用银行基本数据
const blocBank = data => {
  return serviceJson({
    url: suffix + "/base/data/bank/blockUpBbBank.do",
    method: "post",
    data
  });
};

//国家信息
const areaList = () => {
  return service({
    url: suffix + "/base/area/list",
    method: "post",
    data: {
      regionId: 0
    }
  });
};
// //银行同步(金蝶)
// const yhTogether = data => {
//   return service({
//     url: suffix + "/base/king/saveBank.do",
//     method: "post",
//     data
//   });
// };
//银行同步(用友)
const yhTogether = data => {
  return service({
    url: suffix + "/base/subject/syncBank.do",
    method: "post",
    data
  });
};
export default {
  bankList,
  delBank,
  insBank,
  startBank,
  blocBank,
  areaList,
  yhTogether
};
