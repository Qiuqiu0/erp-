import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix1;
//资金计划周期
export const planTypeOption = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1151 }
  });
};

//计划状态
export const planStatusOption = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1154 }
  });
};
//业务类型
export const bizTypeOption = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1155 }
  });
};
//收入类型
export const incomeTypeOption = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1156 }
  });
};
//项目类型
export const projectTypeOption = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1152 }
  });
};
//资金类型
export const fundTypeOption = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1153 }
  });
};