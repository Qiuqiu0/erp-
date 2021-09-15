import {dataExport} from "@/api/export";
import {Loading} from "element-ui";
let {suffix2,suffix3} = window.ROOT_PATH;

const urlMap={
    "T0030101":{
        url: `${suffix2}/odFwContract/exportOdFwContractList.do`,
        label:'框架协议'
    },
    "T0030102":{
        url: `${suffix2}/poContract/exportOdPoContractList.do`,
        label:'内贸采购合同'
    },
    "T0030103":{
        url: `${suffix2}/poContract/exportOdPoContractList.do`,
        label:'进口采购合同'
    },
    "T0030104":{
        url: `${suffix2}/odPsContract/exportOdPsContractList.do`,
        label:'双边合同'
    },
    "T0030105":{
        url: `${suffix2}/soContract/exportOdSoContractList.do`,
        label:'内贸销售合同'
    },
    "T0030106":{
        url: `${suffix2}/soContract/exportOdSoContractList.do`,
        label:'出口销售合同'
    },
    "T0030201":{
        url:`${suffix2}/business/purchase/bl/exportOdBlList`,
        label:'采购提单'
    },
    "T0030202":{
        url:`${suffix2}/business/purchase/wv/exportOdWvList`,
        label:'采购入库'
    },
    "T0030203":{
        url:`${suffix2}/business/purchase/unwv/exportOdUnwvList`,
        label:'采购退货'
    },
    "T0030301":{
        url:`${suffix2}/saleOrderManager/exportOdDoList.do`,
        label:'销售出库单'
    },
    "T0030302":{
        url:`${suffix2}/saleOrderManager/exportOdUndoList.do`,
        label:'销售退货单'
    },
    "T0030304":{
        url:`${suffix2}/business/settle/exportSoSettleInfoList.do`,
        label:'结算单'
    },
    "T0030401":{
        url:`${suffix2}/business/otherArrive/exportOdOhGrnList.do`,
        label:'其他入库'
    },
    "T0030402":{
        url:`${suffix2}/business/otherLeave/exportOdOhOdoList.do`,
        label:'其他出库'
    },
    "T0030403":{
        url:`${suffix2}/transfer/exportOdInvTransferList.do`,
        label:'库存调拨'
    },
    "T0030303":{
        url:`${suffix2}/saleInvoiceManager/exportOdSoInvoiceList`,
        label:'销售发票'
    },
    "T0030404":{
        url:`${suffix2}/od/dockSo/exportOdDockSoList.do`,
        label:'码单管理'
    },
    "T0040301":{
        url:`${suffix3}/capital/figathering/exportFiGatheringListV2.do`,
        label:'收款单'
    },
    "T0040401":{
        url:`${suffix3}/capital/payment/exportFiPaymentListV2.do`,
        label:'付款单'
    }
}
export const exportData={
    methods: {
        exportData(data) {
            const moduleCode = sessionStorage.getItem("moduleCode")
            const {url,label} = urlMap[moduleCode]
            const loading2 = Loading.service({
                lock: true,
                text: "加载中...",
                background: "rgba(0, 0, 0, 0.7)"
            });
            dataExport({data,url}).then((res)=>{
                if(res.code=="fail"){
                    this.$openWarning(res.message);
                }else{
                    const blob = new Blob([res.data]);
                    const a = document.createElement("a");
                    const link = window.URL.createObjectURL(blob);
                    const filename =`${label}.xls`;
                    a.href = link;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(link);
                }
                loading2.close();
            }).catch(e=>{
                console.log(e)
                loading2.close();
            });
        }
    }
}
