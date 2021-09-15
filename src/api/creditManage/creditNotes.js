import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix3;
//获取收款单列表
export const getCreditList = data => {
  return serviceJson({
    url: suffix + "/capital/figathering/selectFiGatheringListV2.do",
    method: "post",
    data
  });
};
//删除收款单
export const delCredit = data => {
  return serviceJson({
    url: suffix + "/capital/figathering/deleteFiGathering.do",
    method: "post",
    data
  });
};
//过账收款单
export const postCredit = data => {
  return serviceJson({
    url: suffix + "/capital/figathering/postingFiGathering.do",
    method: "post",
    data
  });
};
//冲销收款单
export const writeOffCredit = data => {
  return serviceJson({
    url: suffix + "/capital/figathering/chargeFiGathering.do",
    method: "post",
    data
  });
};
export const exportFiGatheringList = data => {
  return serviceJson({
    url: suffix + "/capital/figathering/exportFiGatheringList.do",
    method: "post",
    responseType: "blob",
    data
  });
};
//收款单总计
export const selectFiGatheringSum = data => {
  return serviceJson({
    url: suffix + "/capital/figathering/selectFiGatheringSumV2.do",
    method: "post",
    data
  });
};
//收款单批量过账
export const postingFiGatheringBatch = data => {
  return serviceJson({
    url: suffix + "/capital/figathering/postingFiGatheringBatch.do",
    method: "post",
    data
  });
};
//计息调整
export const turnFiGatheringInterest = data => {
  return serviceJson({
    url: suffix + "/capital/figathering/turnFiGatheringInterest.do",
    method: "post",
    data
  });
};