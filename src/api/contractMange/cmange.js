import { service, upload, serviceJson } from "@/axios/index";
const suffix = window.ROOT_PATH.suffix2;
const baseURL = window.ROOT_PATH.suffix1;

//获取范围
const getUnit = data => {
  return service({
    url: baseURL + "/gd/goodUnit/getGdGoodsUnitListByIsInactive.do",
    method: "post",
    data
  });
};
//合同类型查询
const htlx = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1014
    }
  });
};
//提货方式查询
const thfs = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1061
    }
  });
};
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
    url: suffix + "/poContract/getPoContractProfileSimulateDetailList.do",
    method: "post",
    data
  });
};
//删除盈亏预测明细
const delykWl = data => {
  return service({
    url: suffix + "/poContract/deletePoContractProfileSimulateDetail.do",
    method: "post",
    data
  });
};
//合同状态查询
const htzt = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1013
    }
  });
};

//查询采购合同列表
const List = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoContractListV2.do",
    method: "post",
    data
  });
};

//保存采购合同信息
const save = data => {
  return serviceJson({
    url: suffix + "	/poContract/saveOdPoContract.do",
    method: "post",
    data
  });
};
//查询盈亏预测列表
const soList = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoSimulateList.do",
    method: "post",
    data
  });
};
//根据'表编码'查询盈亏预测的行列名列表
const syList = data => {
  return service({
    url: suffix + "/soContract/getSysRowColumnSchemaList.do",
    method: "post",
    data
  });
};

//采购合同审批
const appCon = data => {
  return serviceJson({
    url: suffix + "/poContract/approveOdPoContract.do",
    method: "post",
    data
  });
};

//采购合同审核
const audCon = data => {
  return serviceJson({
    url: suffix + "/poContract/auditOdPoContract.do",
    method: "post",
    data
  });
};
//采购合同审批
const audCon2 = data => {
  return serviceJson({
    url: suffix + "/poContract/auditOdPoContract2.do",
    method: "post",
    data
  });
};

//采购合同开启、关闭
const turnCon = data => {
  return serviceJson({
    url: suffix + "/poContract/turnOdPoContract.do",
    method: "post",
    data
  });
};

//	删除采购合同
const delCon = data => {
  return serviceJson({
    url: suffix + "/poContract/cancellationOdPoContract.do",
    method: "post",
    data
  });
};

//查询汇率
const pariList = data => {
  return service({
    url: baseURL + "/base/data/parities/getParities.do",
    method: "post",
    data
  });
};

//获取汇率 code
export const getParitiesCode = params => {
  return serviceJson({
    url: baseURL + "/base/data/parities/getParitiesByCode.do",
    method: "post",
    params
  });
};

//查询货币
const currency = data => {
  return service({
    url: baseURL + "/base/data/currency/selectById.do",
    method: "post",
    data
  });
};

//收款方式
const skfs = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1031
    }
  });
};

//收款类型
const sklx = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1032
    }
  });
};

//收款方式
const xyzlx = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1022
    }
  });
};

//运输方式查询
const ysfs = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1017
    }
  });
};

//装卸时间查询
const zxsj = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1018
    }
  });
};
//船运方式查询
const cyfs = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1019
    }
  });
};
//价格条款查询
const jgtk = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1016
    }
  });
};
//查询币种
const getCur = data => {
  return serviceJson({
    url: baseURL + "/base/data/currency/list.do",
    method: "post",
    data
  });
};
//购销方式查询
const gxfs = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1047
    }
  });
};
//
//查询采购合同基本信息
const getXx = data => {
  return serviceJson({
    url: suffix + "/poContract/selectOdPoContract.do",
    method: "post",
    data
  });
};
//
//查询采购合同明细列表
const getWl = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoContractItemsList.do",
    method: "post",
    data
  });
};
//查询盈亏预测明细列表
const ykcsWl = data => {
  return serviceJson({
    url: suffix + "	/poContract/getPoContractProfileSimulateDetailList.do",
    method: "post",
    data
  });
};
//删除盈亏预测明细
const delWl = data => {
  return service({
    url: suffix + "/poContract/deletePoContractProfileSimulateDetail.do",
    method: "post",
    data
  });
};
//
//查询收款方式列表
const getSk = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoPaymentList.do",
    method: "post",
    data
  });
};
//删除收款方式
const delSK = data => {
  return service({
    url: suffix + "/poContract/deleteOdPoPayment.do",
    method: "post",
    data
  });
};
//
//查询版本列表
const getHis = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdContractHis.do",
    method: "post",
    data
  });
};
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
    url: suffix + "/poContract/getOdPoTransferInfo.do",
    method: "post",
    data
  });
};
//查询采购合同运输路径列表
const getLj = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoCtiPathsList.do",
    method: "post",
    data
  });
};
//删除采购合同运输路径
const delLj = data => {
  return service({
    url: suffix + "/poContract/deleteOdPoCtiPaths.do",
    method: "post",
    data
  });
};
//
//查询合同条款列表
const getTk = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoContractTermList.do",
    method: "post",
    data
  });
};
//删除合同条款
const delTk = data => {
  return service({
    url: suffix + "/poContract/deleteOdPoTerm.do",
    method: "post",
    data
  });
};
//查询关联合同列表
const getGl = data => {
  return serviceJson({
    url: suffix + "/soContract/getOdPoSoList.do",
    method: "post",
    data
  });
};
//删除关联合同
const delGl = data => {
  return service({
    url: suffix + "/soContract/deleteOdPoSo.do",
    method: "post",
    data
  });
};
//展示 系统附件
const getFif = data => {
  return service({
    url: baseURL + "/base/sys/list",
    method: "post",
    data
  });
};
//删除系统附件
const delFif = data => {
  return service({
    url: baseURL + "/base/sys/delete",
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
    url: suffix + "/poContract/deleteOdPoContractItems.do",
    method: "post",
    data
  });
};
//变更删除采购校验
const delCwlHis = data => {
  return serviceJson({
    url: suffix + "/poContract/checkForChangeDetail.do",
    method: "post",
    data
  });
};

//付款类型查询
const fklx = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1020
    }
  });
};
//付款方式查询
const fkfs = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1021
    }
  });
};
//关税计征方式
const hgzs = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1095
    }
  });
};
//合同类型
const selectDic = data => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data
  });
};
//双签
const doubleCheckOdPoContract = data => {
  return serviceJson({
    url: suffix + "/poContract/doubleCheckOdPoContract.do",
    method: "post",
    data
  });
};
//收到原件
const haveReceiveOrginCopy = data => {
  return serviceJson({
    url: suffix + "/poContract/haveReceiveOrginCopy.do",
    method: "post",
    data
  });
};
export default {
  hgzs,
  getGl,
  delGl,
  gxfs,
  fklx,
  fkfs,
  getUnit,
  getClist,
  getCwl,
  getNum,
  getFif,
  delFif,
  getTk,
  delTk,
  delLj,
  getLj,
  getYsxx,
  getJx,
  getSk,
  delSK,
  getHis,
  delCwl,
  delCwlHis,
  delWl,
  ykcsWl,
  getWl,
  getCur,
  getXx,
  appCon,
  audCon,
  audCon2,
  turnCon,
  delCon,
  htlx,
  thfs,
  xshtlx,
  getykWl,
  delykWl,
  htzt,
  List,
  save,
  pariList,
  getParitiesCode,
  currency,
  skfs,
  sklx,
  xyzlx,
  ysfs,
  zxsj,
  cyfs,
  jgtk,
  soList,
  syList,
  selectDic,
  doubleCheckOdPoContract,
  haveReceiveOrginCopy
};
