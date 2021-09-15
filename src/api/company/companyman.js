import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix1;
export const getUserlists = data => {
  return serviceJson({
    url: suffix + "/base/company/selectBbCompanyBaselist.do",
    method: "post",
    data
  });
};
export const removeMsg = data => {
  //删除
  return serviceJson({
    url: suffix + "/base/company/delBbCompanyBase.do",
    method: "post",
    data
  });
};
export const stopget = data => {
  //禁用
  return serviceJson({
    url: suffix + "/base/company/blockBbCompanyBaseInactive.do",
    method: "post",
    data
  });
};
export const enableget = data => {
  //启用
  return serviceJson({
    url: suffix + "/base/company/startBbCompanyBaseInactive.do",
    method: "post",
    data
  });
};
// //银行账号同步（金蝶）
// export const zhTogether = data => {
//   return service({
//     url: suffix + "/base/king/saveKingdeeAccountBanks.do",
//     method: "post",
//     data
//   });
// };
//用友
export const zhTogether = data => {
  return serviceJson({
    url: suffix + "/base/subject/syncCompanyBank.do",
    method: "post",
    params:data
  });
};
