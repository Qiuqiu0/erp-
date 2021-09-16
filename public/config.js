window.ROOT_PATH = {};
var baseFlag = "1";
if(baseFlag == "1"){
    //开发
    window.ROOT_PATH={
        "baseURL":"api",//基础
        "suffix1":"/base",//业务功能
        "suffix2":"/business",//资金
        "suffix3":"/capital",//资金
        "suffix4":"/credit",//信用
        "suffix5":"/report",//报表
        "suffix6":"/epvoa",//oa跳转
    }
}else if(baseFlag == "2"){
    //测试
    window.ROOT_PATH={
        "baseURL":"http://epvtest.forestplus.cn/",
        "suffix1":"/base",//基础数据
        "suffix2":"/business",//业务功能
        "suffix3":"/capital",//资金
        "suffix4":"/credit",//信用
        "suffix5":"/report",//报表
        "suffix6":"/epvoa",//oa跳转
    
    }
};
//配置退出地址
window.loginUrl='http://epvtest.forestplus.cn/pages/login.html';
//默认公司信息
window.defaultCompanyInfo={
    companyCode: "0101",
    companyId: "05c99d25a4a948fcb5b80f9c9a760047",
    companyName: "中林国际经贸有限公司"
};
//是否默认显示公司信息
window.IsShowDefaultCompanyInfo=true;
window.authUrl=[
    "/business/odFwContract/getOdFwContractListV2.do",  //框架协议列表
    "/business/poContract/getOdPoContractListV2.do",  //采购合同列表
    "/business/odPsContract/getOdPsContractListV2.do",  //双边合同列表
    "/business/soContract/getOdSoContractListV2.do",  //销售合同列表
    "/business/business/purchase/bl/odBlListV2",  //采购提单列表
    "/business/business/purchase/wv/odWvListV2",  //采购入库列表
	"/business/business/purchase/wv/odWvListSumV2",//采购入库统计列表
    "/business/business/purchase/unwv/odUnwvListV2",  //采购退货列表
    "/business/business/purchase/invoice/odPoInvoiceListV2",  //采购发票列表
    "/business/saleOrderManager/selectListExtOdDoV2.do",  //销售出库单列表
	"/business/saleOrderManager/selectListExtOdDoSumV2.do",//销售出库单列表统计接口
    "/business/saleOrderManager/selectListExtUndoV2.do",  //销售退货单列表
    "/business/saleInvoiceManager/selectListExtInvoiceV2.do",  //销售发票列表
    "/business/business/settle/listV2.do",  //结算单列表
    "/business/business/otherArrive/odOhGrnListV2.do",  //其他入库列表
    "/business/business/otherLeave/odOhOdoListV2.do",  //其他出库列表
    "/business/transfer/odInvTransferListV2.do",  //库存调拨列表
    "/business/od/dockSo/dockSoListV2.do",  //码单管理列表
    "/capital/capital/costPrefetch/listV2",  //费用预提列表
    "/capital/capital/costSettle/listV2",  //费用结算列表
    "/credit/credit/quota/listV2",  //信用账户组额度列表
    "/capital/capital/fisettleapply/selectFiSettleApplyListV2.do",  //结售汇申请列表
    "/capital/capital/fisettleexecute/selectFiSettleExecuteListV2.do",  //结售汇执行
    "/capital/capital/figathering/selectFiGatheringListV2.do",  //收款单列表
	"/capital/capital/figathering/selectFiGatheringSumV2.do",//收款单列表统计接口
    "/capital/capital/figatheringitems/selectFiGatheringItemsListV2.do",  //收款单认领列表
    "/capital/capital/payment/listV2.do",  //付款单列表
	"/capital/capital/payment/selectFiPaymentSumV2.do",//付款单列表统计接口
    "/capital/capital/payApply/listV2.do",  //付款申请单列表
    "/capital/bill/fiPaymentBill/fiPaymentBillListV2.do",  //应付票据列表
    "/capital/bill/FiGatheringBill/fiGatheringBillListV2.do",  //应收票据列表
    "/capital/capital/filcreceive/selectFiLcReceiveListV2.do",  //收到信用证列表
    "/capital/capital/filcissue/listV2.do",  //开出信用证列表
    "/capital/capital/financialPlan/planListV2",  //资金计划管理列表
    "/capital/capital/financialPlan/financialSumReportList",  //资金计划汇总报表
    "/capital/capital/financialPlan/financialDetailReportList",  //资金计划明细报表
    "/capital/capital/financialPlan/financialDeviateReportList",  //资金计划偏离报表
    "/capital/capital/warrant/selectWarrantListV2.do",//凭证推送管理
]