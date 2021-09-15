import { service, upload, serviceJson } from "@/axios/index";
const suffix = window.ROOT_PATH.suffix2;
const baseURL = window.ROOT_PATH.suffix1;

//销售合同类型查询
const xshtlx = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1015
    }
  });
};
//查询盈亏预测明细列表
const getykWl = data => {
  return serviceJson({
    url:
      suffix + "/poContract/getPoContractProfileSimulateDetailArchiveList.do",
    method: "post",
    data
  });
};
//删除盈亏预测明细
const delykWl = data => {
  return service({
    url: suffix + "/poContract/deletePoContractProfileSimulateDetailArchive.do",
    method: "post",
    data
  });
};
//查询盈亏预测列表
const soList = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoSimulateArchiveList.do",
    method: "post",
    data
  });
};
//根据'表编码'查询盈亏预测的行列名列表
const syList = data => {
  return service({
    url: suffix + "/soContract/getSysRowColumnSchemaArchiveList.do",
    method: "post",
    data
  });
};

//查询采购合同基本信息
const getXx = data => {
  return serviceJson({
    url: suffix + "/poContract/selectOdPoContractArchive.do",
    method: "post",
    data
  });
};
//
//查询采购合同明细列表
const getWl = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoContractItemsArchiveList.do",
    method: "post",
    data
  });
};
//查询盈亏预测明细列表
const ykcsWl = data => {
  return serviceJson({
    url:
      suffix + "	/poContract/getPoContractProfileSimulateDetailArchiveList.do",
    method: "post",
    data
  });
};
//删除盈亏预测明细
const delWl = data => {
  return service({
    url: suffix + "/poContract/deletePoContractProfileSimulateDetailArchive.do",
    method: "post",
    data
  });
};
//
//查询收款方式列表
const getSk = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoPaymentArchiveList.do",
    method: "post",
    data
  });
};
//删除收款方式
const delSK = data => {
  return service({
    url: suffix + "/poContract/deleteOdPoPaymentArchive.do",
    method: "post",
    data
  });
};
//
//根据销售合同ID查询销售合同计息
const getJx = data => {
  return service({
    url: suffix + "/soContract/getOdSoContractProfilePart.do",
    method: "post",
    data
  });
};
//
//根据采购合同ID查询运输信息
const getYsxx = data => {
  return service({
    url: suffix + "/poContract/getOdPoTransferInfoArchive.do",
    method: "post",
    data
  });
};
//查询采购合同运输路径列表
const getLj = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoCtiPathsArchiveList.do",
    method: "post",
    data
  });
};
//
//查询合同条款列表
const getTk = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoContractTermArchiveList.do",
    method: "post",
    data
  });
};
//删除合同条款
const delTk = data => {
  return service({
    url: suffix + "/poContract/deleteOdPoTermArchive.do",
    method: "post",
    data
  });
};
//查询关联合同列表
const getGl = data => {
  return serviceJson({
    url: suffix + "/soContract/getOdPoSoArchiveList.do",
    method: "post",
    data
  });
};

//按条件查询已发货的数量
const getNum = data => {
  return serviceJson({
    url: suffix + "/saleOrderManager/selectOdDoItemsDeliverd.do",
    method: "post",
    data
  });
};

//销售合同
//查询销售合同列表
const getClist = data => {
  return serviceJson({
    url: suffix + "/soContract/getOdSoContractList.do",
    method: "post",
    data
  });
};
//查询销售明细列表
const getCwl = data => {
  return serviceJson({
    url: suffix + "/soContract/getOdSoContractItemsList.do",
    method: "post",
    data
  });
};
//删除采购合同明细
const delCwl = data => {
  return service({
    url: suffix + "/poContract/deleteOdPoContractItemsArchive.do",
    method: "post",
    data
  });
};
//变更合同展示 系统附件
const getFif = data => {
  return service({
    url: baseURL + "/base/sys/listArchive",
    method: "post",
    data
  });
};

export default {
  getGl,
  getClist,
  getCwl,
  getNum,
  getTk,
  delTk,
  getLj,
  getYsxx,
  getJx,
  getSk,
  delSK,
  delCwl,
  delWl,
  ykcsWl,
  getWl,
  getXx,
  xshtlx,
  getykWl,
  delykWl,
  soList,
  syList,
  getFif
};
