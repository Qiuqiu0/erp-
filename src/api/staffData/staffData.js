import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix1;

//查询员工列表
const empList = data => {
  return serviceJson({
    url: suffix + "/base/employee/list",
    method: "post",
    data
  });
};

//插入员工列表
const empInsert = data => {
  return serviceJson({
    url: suffix + "/base/employee/insertOrUpdate",
    method: "post",
    data
  });
};

//批量删除员工列表
const empDelete = data => {
  return serviceJson({
    url: suffix + "/base/employee/delete",
    method: "post",
    data
  });
};

//公司下拉列表
const companyList = data => {
  return serviceJson({
    url: suffix + "/base/company/selectBbCompanyBase.do",
    method: "post",
    data
  });
};

//公司部门下拉列表
const branchList = data => {
  return service({
    url: suffix + "/base/branch/selectBbBranch.do",
    method: "post",
    data
  });
};
//启用
const open = data => {
  return serviceJson({
    url: suffix + "/base/employee/open",
    method: "post",
    data
  });
};
//禁用
const block = data => {
  return serviceJson({
    url: suffix + "/base/employee/block",
    method: "post",
    data
  });
};

export default {
  empList,
  empInsert,
  empDelete,
  companyList,
  branchList,
  open,
  block
};
