import { service, serviceJson } from "../../axios/index";
let base = window.ROOT_PATH.suffix1;
let suffix = window.ROOT_PATH.suffix2;
//获取单据状态下拉数据
export const getDjzt = data => {
  return serviceJson({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    params: data
  });
};
//查询汇率
export const pariList = data => {
  return serviceJson({
    url: base + "	/base/data/parities/list.do",
    method: "post",
    data
  });
};

//根据双边合同id查询物料明细(接口没了？？)
export const queryMateriel = data => {
  return serviceJson({
    url: suffix + "/odPsContract/getOdPsContractItemsList.do",
    method: "post",
    data
  });
};
//根据双边合同号、结算日期，生成利息贴现
export const discountInterest = data => {
  return serviceJson({
    url: suffix + "/business/settle/discountOnInterest.do",
    method: "post",
    params: data
  });
};
//根据双边合同号生成销售结算明细
export const salesDetail = data => {
  return serviceJson({
    url: suffix + "/business/settle/generateSoSettleDetail.do",
    method: "post",
    params: data
  });
};
//根据双边合同号生成结算情况
export const Settlement = data => {
  return serviceJson({
    url: suffix + "/business/settle/getSettleInfoMicro.do",
    method: "put",
    params: data
  });
};
//根据双边合同号生成合同补充情况
export const suppleMent = data => {
  return serviceJson({
    url: suffix + "/business/settle/getSettleInfoPro.do",
    method: "put",
    params: data
  });
};
//根据双边合同号查询付款单信息(写的表格)
export const paymentForm = data => {
  return serviceJson({
    url: suffix + "/business/settle/selectByContractNo.do",
    method: "post",
    params: data
  });
};
//根据双边合同号查询费用情况
export const costSituation = data => {
  return serviceJson({
    url: suffix + "/business/settle/selectCostByContractNoAndMoneyContent.do",
    method: "post",
    params: data
  });
};
//	查询结算明细(修改编辑,销售明细)
export const queryDetails = data => {
  return serviceJson({
    url: suffix + "/business/settle/selectSoSettleDetail.do",
    method: "post",
    params: data
  });
};
//	查询结算付款信息(修改编辑 表格信息)
export const queryInformation = data => {
  return serviceJson({
    url: suffix + "/business/settle/selectSoSettlePaymentInfo.do",
    method: "post",
    params: data
  });
};
//	查询结算利息贴现(修改编辑)
export const queryDiscount = data => {
  return serviceJson({
    url: suffix + "/business/settle/selectSoSettleProfitDiscount.do",
    method: "post",
    params: data
  });
};
//	查询结算单(修改编辑)
export const queryInput = data => {
  return serviceJson({
    url: suffix + "/business/settle/selectSoSettle.do",
    method: "post",
    params: data
  });
};
//保存/修改结算单??
export const wareSave = data => {
  return serviceJson({
    url: suffix + "/business/settle/save.do",
    method: "post",
    data
  });
};
//根据双边合同号和付款类型查询付款类型付款单信息(暂时不用)
export const queryDbtable = data => {
  return serviceJson({
    url: suffix + "/business/settle/selectByContractNoAndMoneyContent.do",
    method: "post",
    params: data
  });
};
//	根据双边合同号生成进口采购业务、内贸采购
export const queryBusiness = data => {
  return serviceJson({
    url: suffix + "/business/settle/selectFeeByContractNo.do",
    method: "post",
    params: data
  });
};
//	删除销售结算付款信息
export const reducemsg = data => {
  return serviceJson({
    url: suffix + "/business/settle/delSoSettlePaymentInfo.do",
    method: "post",
    data
  });
};

