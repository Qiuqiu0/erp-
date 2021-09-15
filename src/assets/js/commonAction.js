//判断按钮权限存在与否
export const actionFlag = value => {
  const actionMap = JSON.parse(sessionStorage.getItem("actionMap"));
  const moduleCode = sessionStorage.getItem("moduleCode");
  let list = actionMap[moduleCode];
  if (list) {
    const indx = list.findIndex(ele => {
      return ele == value;
    });
    return indx == -1 ? false : true;
  }else{
    return false;
  }
};
//给数组null值置空字符串"""
export const nullFlag = obj => {
  for (let key in obj) {
    if (obj[key] === "null" || obj[key] === null) {
      obj[key] = "";
    }
  }
  return obj;
};
//查询条件过滤掉""
export const queryFilter = obj => {
  let newObj = {};
  for (let key in obj) {
    if (obj[key] !== "" || obj[key] !== []) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};
//获取地址栏值
export function getUrl(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // var or= location.origin;
  var r = location.href.split("?")[1];
  if (r != null && r != "" && r != undefined) {
    r = r.match(reg);
    if (r != null) {
      return r[2];
    } else {
      return null;
    }
  } else {
    return null;
  }
}
