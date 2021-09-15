import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
//获取收款单明细列表
export const getFigatheringItems = data => {
  return serviceJson({
    url: suffix + "/capital/figatheringitems/selectFiGatheringItemsListV2.do",
    method: "post",
    data
  });
};
//删除收款单明细
export const delFigatheringDetail = data => {
  return serviceJson({
    url: suffix + "/capital/figatheringitems/delShareByItemsId.do",
    method: "post",
    data
  });
};
//审核收款单明细
export const checkFigatheringDetail = data => {
  return serviceJson({
    url: suffix + "/capital/figatheringitems/checkFiGatheringItems.do",
    method: "post",
    data
  });
};
//提交收款单明细
export const submitFigatheringDetail = data => {
  return serviceJson({
    url: suffix + "/capital/figatheringitems/submitFiGatheringItems.do",
    method: "post",
    data
  });
};
