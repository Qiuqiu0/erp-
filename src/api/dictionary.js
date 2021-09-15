/* 字典值转义 */

/* 客户管理、供应商管理 */
//联系人类型
export const linkTypeObj = [
  {dict_key: 10030005, dict_value: "业务员", dict_code: "10030005"},
  {dict_key: 10030010, dict_value: "经理", dict_code: "10030010"},
  {dict_key: 10030015, dict_value: "财务", dict_code: "10030015"},
  {dict_key: 10030020, dict_value: "法人", dict_code: "10030020"},
  {dict_key: 10030025, dict_value: "其他", dict_code: "10030025"}
];

/* 客户信用额度、供应商信用额度、信用账户组信用额度 */
//状态
export const creditStatusObj = [
  {dict_key: 10300005, dict_value: "已保存", dict_code: "10300005"},
  {dict_key: 10300010, dict_value: "审批中", dict_code: "10300010"},
  {dict_key: 10300015, dict_value: "已审批", dict_code: "10300015"},
  {dict_key: 10300020, dict_value: "已驳回", dict_code: "10300020"}
];

/* 费用预提 */
//单据状态
export const prefetchStatusObj = [
  {dict_key: 10650005, dict_value: "保存", dict_code: "10650005"},
  {dict_key: 10650010, dict_value: "审核中", dict_code: "10650010"},
  {dict_key: 10650015, dict_value: "已审核", dict_code: "10650015"},
  {dict_key: 10650020, dict_value: "已冲销", dict_code: "10650020"},
  {dict_key: 10650025, dict_value: "已驳回", dict_code: "10650025"}
];

/* 费用类别管理 */
//费用环节
export const costLinkObj = [
  {dict_key: 10600005, dict_value: "采购", dict_code: "10600005"},
  {dict_key: 10600010, dict_value: "销售", dict_code: "10600010"}
];
//摊销维度
export const amortizeObj = [
  {dict_key: 10640005, dict_value: "批次", dict_code: "10640005"},
  {dict_key: 10640010, dict_value: "合同", dict_code: "10640010"},
  {dict_key: 10640015, dict_value: "项目", dict_code: "10640015"}
];

/* 费用结算 */
//状态
export const settleStatusObj = [
  {dict_key: 10650005, dict_value: "保存", dict_code: "10650005"},
  {dict_key: 10650010, dict_value: "审核中", dict_code: "10650010"},
  {dict_key: 10650015, dict_value: "已审核", dict_code: "10650015"},
  {dict_key: 10650020, dict_value: "已冲销", dict_code: "10650020"},
  {dict_key: 10650025, dict_value: "已驳回", dict_code: "10650025"}
];