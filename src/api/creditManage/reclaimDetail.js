import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
//	获取收款明细主内容
export const getClaimMain= params => {
  return serviceJson({
    url: suffix + "/capital/figatheringitems/selectFiGatheringItemsById.do",
    method: "post",
    params
  });
};
//	认领明细保存
export const saveClaimDetail = data => {
  return serviceJson({
    url: suffix + "/capital/figatheringitems/saveFiGatheringItems.do",
    method: "post",
    data
  });
};
//	认领明细查询
export const getClaimDetail= params => {
  return serviceJson({
    url: suffix + "/capital/figatheringitems/selectFiGatheringItemsShareByItemsId.do",
    method: "post",
    params
  });
};
//认领明细删除
export const delClaimDetail = data => {
  return serviceJson({
    url: suffix + "/capital/figatheringitems/delFiGatheringItemsShare.do",
    method: "post",
    data
  });
};

