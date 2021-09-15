// eslint-disable-next-line no-unused-vars
import {
  service,
  upload,
  serviceJson
} from "@/axios/index";
// const suffix = window.ROOT_PATH.suffix3; //suffix2: '/api/capital',
const business = window.ROOT_PATH.suffix2; //		suffix1: '/api/base',
const base = window.ROOT_PATH.suffix1; //		suffix1: '/api/base',

//------------审核发票---------
export const approvePoInvoice = data => {
  return serviceJson({
    url: business + "/business/purchase/invoice/approvePoInvoice",
    method: "post",
    data
  });
};
//------------新增采购发票---------
export const createdPurchaseInvoice = data => {
  return serviceJson({
    url: business + "/business/purchase/invoice/createdPurchaseInvoice",
    method: "post",
    data
  });
};
//------------删除发票---------
export const deleteOdPoInvoice = data => {
  return serviceJson({
    url: business + "/business/purchase/invoice/deleteOdPoInvoice",
    method: "post",
    data
  });
};
//------------删除发票明细---------
export const deletePoInvoiceItems = data => {
  return serviceJson({
    url: business + "/business/purchase/invoice/deletePoInvoiceItems",
    method: "post",
    data
  });
};
//------------采购发票详情---------
export const odPoInvoiceDetail = data => {
  return serviceJson({
    url: business + "/business/purchase/invoice/odPoInvoiceDetail",
    method: "post",
    data
  });
};
//------------采购发票列表---------
export const odPoInvoiceList = data => {
  return serviceJson({
    url: business + "/business/purchase/invoice/odPoInvoiceListV2",
    method: "post",
    data
  });
};
//------------发票冲销---------
export const reversePoInvoice = data => {
  return serviceJson({
    url: business + "/business/purchase/invoice/reversePoInvoice",
    method: "post",
    data
  });
};
//------------入库/退货单查询---------
export const preInvoiceList = data => {
  return serviceJson({
    url: business + "/business/purchase/invoice/preInvoiceList",
    method: "post",
    data
  });
};
//------------发票提交审核---------
export const submitApprove = data => {
  return serviceJson({
    url: business + "/business/purchase/invoice/submitApprove",
    method: "post",
    data
  });
};
//------------修改采购发票---------
export const updatePurchaseInvoice = data => {
  return serviceJson({
    url: business + "/business/purchase/invoice/updatePurchaseInvoice",
    method: "post",
    data
  });
};
//------------发票状态获取---------
export const getInvoiceStatusList = data => {
  return service({
    url: base + "/base/sys/dic/select.do",
    method: "post",
    data
  });
};
//------------生成采购发票明细的入库单明细列表---------
export const odWvItemsList2PoInvoice = data => {
  return serviceJson({
    url: business + "/business/purchase/wv/odWvItemsList2PoInvoice",
    method: "post",
    data
  });
};
//------------生成退货发票明细的退货单明细列表---------
export const odUnwvItemsList2PoInvoice = data => {
  return serviceJson({
    url: business + "/business/purchase/unwv/odUnwvItemsList2PoInvoice",
    method: "post",
    data
  });
};
//采购发票合计
export const odPoInvoiceListSumV2 = data => {
  return serviceJson({
      url: business + "/business/purchase/invoice/odPoInvoiceListSumV2",
      method: "post",
      data
  });
};