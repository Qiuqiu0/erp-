import {
    service,
    serviceJson,
    upload
} from "../../axios/index";
let suffix = window.ROOT_PATH.suffix2;
let base = window.ROOT_PATH.suffix1;
let capital = window.ROOT_PATH.suffix3;

//采购查询列表
const odBlList = data => {
    return serviceJson({
        url: suffix + "/business/purchase/bl/odBlListV2",
        method: "post",
        data: data
    });
};
//单据状态
const select = data => {
    return service({
        url: base + "/base/sys/dic/select.do",
        method: "post",
        data: data
    });
};
//更新采购提单
const insertOrUpdateOdBl = data => {
    return serviceJson({
        url: suffix + "/business/purchase/bl/insertOrUpdateOdBl",
        method: "post",
        data: data
    });
};
//采购提单详情
const odBlDetail = data => {
    return serviceJson({
        url: suffix + "/business/purchase/bl/odBlDetail",
        method: "post",
        data: data
    });
};
//采购提单删除
const deleteOdBl = data => {
    return serviceJson({
        url: suffix + "/business/purchase/bl/deleteOdBl",
        method: "post",
        data: data
    });
};
//采购提单用印审批
const executeApprove = data => {
    return serviceJson({
        url: suffix + "/business/purchase/bl/executeApprove",
        method: "post",
        data
    });
};
//采购提单提交接口
const sealApprove = data => {
    return serviceJson({
        url: suffix + "/business/purchase/bl/sealApprove",
        method: "post",
        params:data
    });
};
//采购生成到港
const updateBlArrivalPort = data => {
    return serviceJson({
        url: suffix + "/business/purchase/bl/updateBlArrivalPort",
        method: "post",
        data: data
    });
};
//采购生成清单
const updateBlCustomsClearance = data => {
    return serviceJson({
        url: suffix + "/business/purchase/bl/updateBlCustomsClearance",
        method: "post",
        data: data
    });
};
//采购合同查询
const selectOdPoContractInfo = data => {
    return serviceJson({
        url: suffix + "/poContract/selectOdPoContractInfo.do",
        method: "post",
        data: data
    });
};
//公司获取汇率
const selectBbCompanyBase = data => {
    return service({
        url: base + "/base/company/selectBbCompanyBaseVoByCode.do",
        method: "post",
        data: data
    });
};
//部门下拉
const selectBbBranch = data => {
    return serviceJson({
        url: base + "/base/branch/selectBbBranch.do",
        method: "post",
        params: data
    });
};
//采购合同详情
const selectOdPoContractDetail = data => {
    return serviceJson({
        url: suffix + "/poContract/selectOdPoContractDetail.do",
        method: "post",
        params: data
    });
};
//采购合同运输信息详情
const selectOdPoContractTransfer = data => {
    return serviceJson({
        url: suffix + "/poContract/selectOdPoContractTransfer.do",
        method: "post",
        params: data
    });
};
//采购合同运输信息详情
const selectOdPoContract = data => {
    return serviceJson({
        url: suffix + "/poContract/selectOdPoContract.do",
        method: "post",
        data: data
    });
};
//获取提单明细最大金额
const getContractItemsMaxAmt = data => {
    return serviceJson({
        url: suffix + "/business/purchase/bl/getContractItemsMaxAmt",
        method: "post",
        params: data
    });
};
//采购入库查询
const odWvList = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/odWvListV2",
        method: "post",
        data: data
    });
};
//采购入库创建/保存
const createOdWv = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/createOdWv",
        method: "post",
        data: data
    });
};
//业务币币别
const listSimple = data => {
    return serviceJson({
        url: base + "/base/data/currency/listSimple.do",
        method: "post",
        data: data
    });
};
//业务员下拉列表
const employeeSelect = data => {
    return serviceJson({
        url: base + "/base/employee/employeeSelect",
        method: "post",
        data: data
    });
};
//创建提单查询接口
const selectBlListByWv = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/selectBlListByWv",
        method: "post",
        data: data
    });
};
//项目下拉
const selectProjectList = data => {
    return serviceJson({
        url: base + "/base/project/selectProjectList",
        method: "post",
        data: data
    });
};
//采购入库详情
const odWvDetail = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/odWvDetail",
        method: "post",
        data: data
    });
};
//采购入库删除
const deleteOdWv = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/deleteOdWv",
        method: "post",
        data: data
    });
};
//采购入库删除
const purchaseSendOut = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/purchaseSendOut",
        method: "post",
        data: data
    });
};
//采购提单保存校验
const checkIsPoCloseableByBl = data => {
    return serviceJson({
        url: suffix + "/business/purchase/bl/checkIsPoCloseableByBl",
        method: "post",
        params: data
    });
};
//采购入库单修改保存
const updateWv = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/updateWv",
        method: "post",
        data: data
    });
};
//采购入库确认保存
const wvWarehouseConfirm = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/wvWarehouseConfirm",
        method: "post",
        data: data
    });
};
//采购入库提交
const wvCommitApprove = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/wvCommitApprove",
        method: "post",
        data: data
    });
};
//采购入库审核
const wvApprove = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/wvApprove",
        method: "post",
        data: data
    });
};
//采购入库审核
const checkIsCloseableByWv = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/checkIsCloseableByWv",
        method: "post",
        data: data
    });
};
//采购入库商品详情删除
const deleteOdWvItems = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/deleteOdWvItems",
        method: "post",
        data: data
    });
}; //采购提单商品详情删除
const deleteOdBlItems = data => {
    return serviceJson({
        url: suffix + "/business/purchase/bl/deleteOdBlItems",
        method: "post",
        data: data
    });
};
//采购提单运输路径删除
const deleteOdBlCtiPaths = data => {
    return serviceJson({
        url: suffix + "/business/purchase/bl/deleteOdBlCtiPaths",
        method: "post",
        data: data
    });
};
//采购入库运输路径删除
const deleteOdWvCtiPaths = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/deleteOdWvCtiPaths",
        method: "post",
        data: data
    });
};
//采购费用预提删除
const deleteCostDetail = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/deleteCostDetail",
        method: "post",
        data: data
    });
};
//供应商主数据列表
const supplierList = data => {
    return serviceJson({
        url: base + "/base/supplierData/bbSupplierBaseList2.do",
        method: "post",
        data
    });
};
//采购提交，审核
const operateSaleInvoiceStatus = data => {
    return serviceJson({
        url: suffix + "/saleInvoiceManager/operateSaleInvoiceStatus.do",
        method: "post",
        data
    });
};
//月结 过账日期范围
const getAccountPeriodByCompany = data => {
    return serviceJson({
        url: capital + "/capital/monthbanlance/getAccountPeriodByCompany.do",
        method: "post",
        params: data
    });
};
//查询港口
const portList = data => {
    return serviceJson({
        url: suffix + "/base/port/list",
        method: "post",
        data
    });
};
//查询汇率
const getParitiesByCode = data => {
    return service({
        url: base + "/base/data/parities/getParitiesByCode.do",
        method: "post",
        data
    });
};
//查询港口
const batchList = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/batchList",
        method: "post",
        data
    });
};
const uploadFile = data => {
    return upload({
        url: base + "/oss/uploadOss.do",
        method: "post",
        data: data
    });
};
//整单作废提交
const cancellationOdWv = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/cancellationOdWv",
        method: "post",
        data
    });
};
//整单作废审核
const cancellationApproveOdWv = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/cancellationApproveOdWv",
        method: "post",
        data
    });
};
//获取本位币汇率 根据公司id及业务币种
const getParitiesForIssuePay = data => {
    return service({
      url: base + "/base/data/parities/getParitiesForIssuePay.do",
      method: "post",
      data
    });
  };
  //采购入库单总计
  const odWvListSum = data => {
    return serviceJson({
      url: suffix + "/business/purchase/wv/odWvListSumV2",
      method: "post",
      data
    });
  };
//采购入库在途提交
const transitCommit = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/transitCommit.do",
        method: "post",
        data
    });
};
//采购入库在途审核
const transitApprove = data => {
    return serviceJson({
        url: suffix + "/business/purchase/wv/transitApprove.do",
        method: "post",
        data
    });
};
//采购提单合计
const odBlListSumV2 = data => {
    return serviceJson({
        url: suffix + "/business/purchase/bl/odBlListSumV2",
        method: "post",
        data
    });
};
//采购退货合计
const odUnwvListSumV2 = data => {
    return serviceJson({
        url: suffix + "/business/purchase/unwv/odUnwvListSumV2",
        method: "post",
        data
    });
};

export default {
    uploadFile,
    getParitiesByCode,
    odBlList,
    select,
    insertOrUpdateOdBl,
    odBlDetail,
    deleteOdBl,
    executeApprove,
    sealApprove,
    updateBlArrivalPort,
    updateBlCustomsClearance,
    selectOdPoContractInfo,
    selectBbCompanyBase,
    selectBbBranch,
    selectOdPoContractDetail,
    selectOdPoContractTransfer,
    selectOdPoContract,
    getContractItemsMaxAmt,
    odWvList,
    createOdWv,
    listSimple,
    employeeSelect,
    selectBlListByWv,
    selectProjectList,
    odWvDetail,
    deleteOdWv,
    purchaseSendOut,
    checkIsPoCloseableByBl,
    updateWv,
    wvWarehouseConfirm,
    wvCommitApprove,
    wvApprove,
    checkIsCloseableByWv,
    deleteOdWvItems,
    deleteOdBlItems,
    deleteOdBlCtiPaths,
    deleteOdWvCtiPaths,
    deleteCostDetail,
    supplierList,
    operateSaleInvoiceStatus,
    getAccountPeriodByCompany,
    portList,
    batchList,
    cancellationOdWv,
    cancellationApproveOdWv,
    getParitiesForIssuePay,
    odWvListSum,
    transitCommit,
    transitApprove,
    odBlListSumV2,
    odUnwvListSumV2

};