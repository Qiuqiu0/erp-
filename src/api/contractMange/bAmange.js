import { service, upload, serviceJson } from "@/axios/index";
const suffix = window.ROOT_PATH.suffix2;
const baseURL = window.ROOT_PATH.suffix1;

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
      dictNo: 1015
    }
  });
};
//采购合同类型查询
const cghtlx = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1014
    }
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

//查询销售合同列表
const List = data => {
  return serviceJson({
    url: suffix + "/soContract/getOdSoContractList.do",
    method: "post",
    data
  });
};

//保存销售合同信息
const save = data => {
  return serviceJson({
    url: suffix + "/soContract/saveOdSoContract.do",
    method: "post",
    data
  });
};
//变更保存销售合同信息
const saveHis = data => {
  return serviceJson({
    url: suffix + "/soContract/saveOdSoContractHis.do",
    method: "post",
    data
  });
};
//删除变更明细校验
const delWlHis = data => {
  return service({
    url: suffix + "/soContract/checkForChangeDetail.do",
    method: "post",
    data
  });
};
//查询盈亏预测列表 销售
const soList = data => {
  return serviceJson({
    url: suffix + "/soContract/getOdSoSimulateArchiveList.do",
    method: "post",
    data
  });
};
//查询盈亏预测列表 采购
const poList = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoSimulateList.do",
    method: "post",
    data
  });
};
//查询盈亏预测列表 采购
const poListHis = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoSimulateArchiveList.do",
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

//销售合同审批
const appCon = data => {
  return serviceJson({
    url: suffix + "/soContract/approveOdSoContract.do",
    method: "post",
    data
  });
};

//销售合同审核
const audCon = data => {
  return serviceJson({
    url: suffix + "/soContract/auditOdSoContract.do",
    method: "post",
    data
  });
};

//销售合同开启、关闭
const turnCon = data => {
  return serviceJson({
    url: suffix + "/soContract/turnOdSoContract.do",
    method: "post",
    data
  });
};

//删除销售合同
const delCon = data => {
  return serviceJson({
    url: suffix + "/soContract/cancellationOdSoContract.do",
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

//
//根据销售合同ID查询销售合同主表数据
const getXx = data => {
  return service({
    url: suffix + "/soContract/getOdSoContractArchive.do",
    method: "post",
    data
  });
};
//
//查询销售合同明细列表
const getWl = data => {
  return serviceJson({
    url: suffix + "/soContract/getOdSoContractItemsArchiveList.do",
    method: "post",
    data
  });
};
//删除盈亏预测明细
const delWl = data => {
  return service({
    url: suffix + "/soContract/deleteOdSoContractItems.do",
    method: "post",
    data
  });
};
//
//查询收款方式列表
const getSk = data => {
  return serviceJson({
    url: suffix + "/soContract/getOdPsContractGatheringArchiveList.do",
    method: "post",
    data
  });
};
//删除收款方式
const delSK = data => {
  return service({
    url: suffix + "/soContract/deleteOdPsContractGathering.do",
    method: "post",
    data
  });
};
//
//根据销售合同ID查询销售合同计息
const getJx = data => {
  return service({
    url: suffix + "/soContract/getOdSoContractProfilePartArchive.do",
    method: "post",
    data
  });
};
//
//根据销售合同ID查询运输信息
const getYsxx = data => {
  return service({
    url: suffix + "/soContract/getOdSoContractTransferInfoArchive.do",
    method: "post",
    data
  });
};
//查询销售合同运输路径列表
const getLj = data => {
  return serviceJson({
    url: suffix + "/soContract/getOdSoCtiPathsArchiveList.do",
    method: "post",
    data
  });
};
//删除销售合同运输路径
const delLj = data => {
  return service({
    url: suffix + "/soContract/deleteOdSoCtiPaths.do",
    method: "post",
    data
  });
};
//查询销售合同交货地点列表
const getJh = data => {
  return serviceJson({
    url: suffix + "/soContract/getOdSoTransferTargetArchiveList.do",
    method: "post",
    data
  });
};
//删除销售合同交货地点
const delJh = data => {
  return service({
    url: suffix + "/soContract/deleteOdSoTransferTarget.do",
    method: "post",
    data
  });
};
//
//查询合同条款列表
const getTk = data => {
  return serviceJson({
    url: suffix + "/soContract/getOdSoContractTermArchiveList.do",
    method: "post",
    data
  });
};
//删除合同条款
const delTk = data => {
  return service({
    url: suffix + "/soContract/deleteOdSoContractTerm.do",
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
//删除关联合同
const delGl = data => {
  return service({
    url: suffix + "/soContract/deleteOdPoSo.do",
    method: "post",
    data
  });
};
//查询盈亏预测明细列表
const getykWl = data => {
  return serviceJson({
    url:
      suffix + "/soContract/getSoContractProfileSimulateDetailArchiveList.do",
    method: "post",
    data
  });
};
//删除盈亏预测明细
const delykWl = data => {
  return service({
    url: suffix + "/soContract/deleteSoContractProfileSimulateDetail.do",
    method: "post",
    data
  });
};
//展示 系统附件
const getFif = data => {
  return service({
    url: baseURL + "/base/sys/listArchive",
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

//采购合同
//查询采购合同列表
const getClist = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoContractList.do",
    method: "post",
    data
  });
};
//查询明细列表
const getCwl = data => {
  return serviceJson({
    url: suffix + "/poContract/getOdPoContractItemsList.do",
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

export default {
  getykWl,
  delykWl,
  hgzs,
  fklx,
  fkfs,
  getUnit,
  getGl,
  delGl,
  getClist,
  getCwl,
  getNum,
  getFif,
  delFif,
  getTk,
  delTk,
  delLj,
  delJh,
  getLj,
  getJh,
  getYsxx,
  getJx,
  getSk,
  delSK,
  delWl,
  getWl,
  getCur,
  getXx,
  appCon,
  audCon,
  turnCon,
  delCon,
  htlx,
  cghtlx,
  htzt,
  gxfs,
  List,
  save,
  saveHis,
  delWlHis,
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
  poList,
  poListHis,
  syList
};
