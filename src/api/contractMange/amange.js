import { service, upload, serviceJson } from "@/axios/index";
const suffix4 = window.ROOT_PATH.suffix4;
const suffix = window.ROOT_PATH.suffix2;
const baseURL = window.ROOT_PATH.suffix1;

//基本单位
const getUnit = data => {
  return service({
    url: baseURL + "/gd/goodUnit/getGdGoodsUnitListByIsInactive.do",
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
//供应商合同状态查询
const gyshtzt = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1014
    }
  });
};
//客户合同状态查询
const khhtzt = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1015,
      bizCategory: 1
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
//信用证类型查询
const xyzlx = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1022
    }
  });
};
//保证金释放方式查询
const bzjsffs = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1023
    }
  });
};
//收保证金方式查询
const sbzj = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1024
    }
  });
};
//回款方式
const hkfs = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1025
    }
  });
};
//数量验收标准
const slys = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1026
    }
  });
};
//杂费承担方
const zfcd = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1051
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
const skfs = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1031
    }
  });
};

//查询双边合同主数据列表
const getList = data => {
  return serviceJson({
    url: suffix + "/odPsContract/getOdPsContractListV2.do",
    method: "post",
    data
  });
};

//双边合同审批
const appCon = data => {
  return serviceJson({
    url: suffix + "/odPsContract/approveOdPsContract.do",
    method: "post",
    data
  });
};

//双边合同审核
const audCon = data => {
  return serviceJson({
    url: suffix + "/odPsContract/auditOdPsContract.do",
    method: "post",
    data
  });
};
//双边合同审批（开启，关闭中状态）
const audCon2 = data => {
  return serviceJson({
    url: suffix + "/odPsContract/auditOdPsContract2.do",
    method: "post",
    data
  });
};
//双边合同开启、关闭
const turnCon = data => {
  return serviceJson({
    url: suffix + "/odPsContract/turnOdPsContract.do",
    method: "post",
    data
  });
};

//删除双边合同
const delCon = data => {
  return serviceJson({
    url: suffix + "/odPsContract/cancellationOdPsContract.do",
    method: "post",
    data
  });
};

//获取双边合同物料明细列表
const getWuCon = data => {
  return serviceJson({
    url: suffix + "/odPsContract/getOdPsContractItemsList.do",
    method: "post",
    data
  });
};

//删除双边合同物料明细
const delWuCon = data => {
  return service({
    url: suffix + "/odPsContract/deleteOdPsContractItems.do",
    method: "post",
    data
  });
};

//根据双边合同ID获取双边合同主数据
const getCon = data => {
  return service({
    url: suffix + "/odPsContract/getOdPsContract.do",
    method: "post",
    data
  });
};

//保存双边合同信息
const savetList = data => {
  return serviceJson({
    url: suffix + "/odPsContract/saveOdPsContract.do",
    method: "post",
    data
  });
};

//删除供应商合同-供应商付款方式
const delGFK = data => {
  return service({
    url: suffix + "	/odPsContractPo/deleteOdPsContractPayment.do",
    method: "post",
    data
  });
};
//删除供应商合同采购物料明细
const delGWl = data => {
  return service({
    url: suffix + "	/odPsContractPo/deleteOdPsContractPoItems.do",
    method: "post",
    data
  });
};
//删除供应商合同条款
const delGHT = data => {
  return service({
    url: suffix + "	/odPsContractPo/deleteOdPsContractTerm.do",
    method: "post",
    data
  });
};
//删除供应商合同运输路径
const delGYS = data => {
  return service({
    url: suffix + "	/odPsContractPo/deleteOdPsCtiPaths.do",
    method: "post",
    data
  });
};
//获取供应商合同-供应商付款方式列表
const getGfk = data => {
  return serviceJson({
    url: suffix + "	/odPsContractPo/getOdPsContractPaymentList.do",
    method: "post",
    data
  });
};
//根据双边合同ID获取供应商采购合同
const getGcg = data => {
  return service({
    url: suffix + "	/odPsContractPo/getOdPsContractPo.do",
    method: "post",
    data
  });
};
//获取供应商合同采购物料明细列表
const getGwl = data => {
  return serviceJson({
    url: suffix + "	/odPsContractPo/getOdPsContractPoItemsList.do",
    method: "post",
    data
  });
};
//获取供应商合同条款列表
const getGht = data => {
  return serviceJson({
    url: suffix + "	/odPsContractPo/getOdPsContractTermList.do",
    method: "post",
    data
  });
};
//根据双边合同ID获取供应商合同运输信息
const getGys = data => {
  return service({
    url: suffix + "	/odPsContractPo/getOdPsContractTransferInfo.do",
    method: "post",
    data
  });
};
//获取供应商合同运输路径列表
const getGlj = data => {
  return serviceJson({
    url: suffix + "	/odPsContractPo/getOdPsCtiPathsList.do",
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

//查询币种
const getCur = data => {
  return serviceJson({
    url: baseURL + "/base/data/currency/list.do",
    method: "post",
    data
  });
};

// 客户
//删除销售合同交货地
const delKjh = data => {
  return service({
    url: suffix + "/odPsContractSo/deleteOdPsContractSoAddress.do",
    method: "post",
    data
  });
};
//删除双边销售合同预计杂费
const delKzf = data => {
  return service({
    url: suffix + "/odPsContractSo/deleteOdPsSoContractFee.do",
    method: "post",
    data
  });
};
//删除销售合同物料明细
const delKwl = data => {
  return service({
    url: suffix + "/odPsContractSo/deleteOdPsSoContractItems.do",
    method: "post",
    data
  });
};
//删除双边销售合同条款
const delKtk = data => {
  return service({
    url: suffix + "/odPsContractSo/deleteOdPsSoContractTerm.do",
    method: "post",
    data
  });
};
//删除双边销售收款方式
const delKsk = data => {
  return service({
    url: suffix + "/odPsContractSo/deleteOdPsSoContractPayee.do",
    method: "post",
    data
  });
};
//删除双边合同运输路径
const delys = data => {
  return service({
    url: suffix + "/odPsContractSo/deleteOdPsSoCtiPaths.do",
    method: "post",
    data
  });
};
//根据双边合同ID获取双边合同销售合同
const getKxx = data => {
  return service({
    url: suffix + "/odPsContractSo/getOdPsContractSo.do",
    method: "post",
    data
  });
};
//获取销售合同交货地列表777
const getKjh = data => {
  return serviceJson({
    url: suffix + "/odPsContractSo/getOdPsContractSoAddressList.do",
    method: "post",
    data
  });
};
//获取双边销售合同预计杂费列表
const getKzf = data => {
  return serviceJson({
    url: suffix + "/odPsContractSo/getOdPsSoContractFeeList.do",
    method: "post",
    data
  });
};
//获取销售合同物料明细列表
const getKwl = data => {
  return serviceJson({
    url: suffix + "/odPsContractSo/getOdPsSoContractItemsList.do",
    method: "post",
    data
  });
};
//获取双边销售收款方式列表
const getKsk = data => {
  return serviceJson({
    url: suffix + "/odPsContractSo/getOdPsSoContractPayeeList.do",
    method: "post",
    data
  });
};
//根据双边合同ID获取销售合同运输信息
const getKys = data => {
  return service({
    url: suffix + "/odPsContractSo/getOdPsSoContractTransferInfo.do",
    method: "post",
    data
  });
};
//获取双边合同运输路径列表
const getKlj = data => {
  return serviceJson({
    url: suffix + "/odPsContractSo/getOdPsSoCtiPathsList.do",
    method: "post",
    data
  });
};
//获取双边销售合同条款列表
const getKtk = data => {
  return serviceJson({
    url: suffix + "/odPsContractSo/getOdPsSoContractTermList.do",
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

//供应商信用额度	基础信息
const supXyed = data => {
  return service({
    url: suffix4 + "/suppDetail/supCreidtAmtNow",
    method: "post",
    data
  });
};
//供应商信用额度	未过账部分
const supWgz = data => {
  return service({
    url: suffix4 + "/suppDetail/unpostPart",
    method: "post",
    data
  });
};
//客户信用额度	基础信息
const cusXyed = data => {
  return service({
    url: suffix4 + "/custDetail/custCreidtAmtNow",
    method: "post",
    data
  });
};
//客户信用额度	未过账部分
const cusWgz = data => {
  return service({
    url: suffix4 + "/custDetail/unpostPart",
    method: "post",
    data
  });
};
//供应商级别查询
const gysjb = () => {
  return service({
    url: baseURL + "/base/sys/dic/select.do",
    method: "post",
    data: {
      dictNo: 1097
    }
  });
};
//双签
const doubleCheckOdPsContract = data => {
  return serviceJson({
    url: suffix + "/odPsContract/doubleCheckOdPsContract.do",
    method: "post",
    data
  });
};
//收到原件
const haveReceiveOrginCopy = data => {
  return serviceJson({
    url: suffix + "/odPsContract/haveReceiveOrginCopy.do",
    method: "post",
    data
  });
};
export default {
  gysjb,
  cusXyed,
  cusWgz,
  supWgz,
  supXyed,
  getUnit,
  delFif,
  getFif,
  getKtk,
  delKtk,
  getKlj,
  getKys,
  getKsk,
  getKwl,
  getKzf,
  getKjh,
  getKxx,
  delys,
  delKsk,
  delKwl,
  delKjh,
  delKzf,
  getCur,
  delGFK,
  delGWl,
  delGHT,
  delGYS,
  getGfk,
  getGcg,
  getGwl,
  getGht,
  getGys,
  getGlj,
  currency,
  appCon,
  audCon,
  audCon2,
  turnCon,
  delCon,
  delWuCon,
  getCon,
  getWuCon,
  htzt,
  thfs,
  getList,
  savetList,
  gyshtzt,
  khhtzt,
  pariList,
  getParitiesCode,
  jgtk,
  ysfs,
  zxsj,
  cyfs,
  fklx,
  fkfs,
  xyzlx,
  bzjsffs,
  sbzj,
  hkfs,
  slys,
  zfcd,
  sklx,
  skfs,
  doubleCheckOdPsContract,
  haveReceiveOrginCopy
};
