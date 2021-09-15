import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix1;
let suffix3 = window.ROOT_PATH.suffix3;
//销售合同类型
export const soContractTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1015 }
  });
};
//销售合同状态
export const soContractStatusOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1013 }
  });
};
//采购合同类型
export const poContractTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data
  });
}
//采购提货方式
export const pickupTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1061 }
  });
}
//发票类型
export const invoiceTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1070 }
  });
}
//销售发票状态
export const soInvoiceStatusOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1071 }
  });
}
//采购发票状态
export const poInvoiceStatusOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1081 }
  });
}
//出入库明细 业务类型
export const warehouseTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1079 }
  });
}
//国家信息
export const areaOptions = () => {
  return service({
    url: suffix + "/base/area/list",
    method: "post",
    data: {
      regionId: 0
    }
  });
};