import Vue from "vue";
import Count from "@/assets/js/calculation";
import {
  actionFlag,
  nullFlag,
  queryFilter,
  getUrl
} from "@/assets/js/commonAction";
//加法 this.$cal.accAdd(2,1);减法 accSub;除法 accDiv;乘法 accMul;
Vue.prototype.$cal = Count;
Vue.prototype.$actionFlag = actionFlag; //自定义按钮权限
Vue.prototype.$nullFlag = nullFlag; //给对象中的null值赋值为空串""
Vue.prototype.$queryFilter = queryFilter; //查询条件过滤掉""
Vue.prototype.$getUrl = getUrl; //获取地址栏值
//金额保留两位小数，千位分隔
Vue.prototype.$moneyFormat = (row, column, cellValue) => {
  if (!cellValue) {
    return '';
  }
  cellValue = getRound(parseFloat(cellValue),2);
    var res=cellValue.toString().replace(/\d+/, function(n){ // 先提取整数部分
      return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
        return $1+",";
      });
  })
  return res;
};
Vue.prototype.$sumTolFormat = (cellValue) => {
  if (!cellValue) {
    return '';
  }
  var res=cellValue.toString().replace(/\d+/, function(n){ // 先提取整数部分
      return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
        return $1+",";
      });
  })
  return res;
};
//毛利
Vue.prototype.$unitProfitFormat = (row, column, cellValue) => {
  if (!cellValue) {
    return '';
  }
  cellValue=getRound(parseFloat(cellValue),6);
  var res=cellValue.toString().replace(/\d+/, function(n){ // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
      return $1+",";
    });
})
return res;
};
//数字保留n位小数,千分位分隔符
Vue.prototype.$numberToFixed = function(value, n) {
  if (!value) {
    return '';
  }
  value = getRound(parseFloat(value),n);
    var res=value.toString().replace(/\d+/, function(n){ // 先提取整数部分
      return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
        return $1+",";
      });
  })
  return res;
};
//获取当前日期
Vue.prototype.$nowDate = () => {
  let date = new Date();
  let month = parseInt(date.getMonth() + 1);
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  if (month < 10) month = "0" + month;
  let dateResult = date.getFullYear() + "-" + month + "-" + day;
  return dateResult;
};
//时间转换方法
//type类型 true返回时间类型为年月日 false时间类型为年月日时分秒
Vue.prototype.$timeFun = (value, type) => {
  if (value == null || value == "") {
    return "";
  } else {
    let date = new Date(value); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + "-";
    let M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let h =
      date.getHours() < 10
        ? "0" + date.getHours() + ":"
        : date.getHours() + ":";
    let m =
      date.getMinutes() < 10
        ? "0" + date.getMinutes() + ":"
        : date.getMinutes() + ":";
    let s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // return Y + M + D;
    return type ? Y + M + D : Y + M + D + " " + h + m + s;
  }
};
//查询条件显示一行
Vue.prototype.$showOne = function(value) {
  var search = document.getElementsByClassName("search-div")[0];
  if (search.className.indexOf("change-height") !== -1) {
    search.classList.remove("change-height");
    value = true;
  } else {
    value = false;
    search.classList.add("change-height");
  }
  return value;
};
//弹窗查询条件显示
Vue.prototype.$dialogShowOne = function(value) {
  var search = document.getElementsByClassName("dialog-search-div")[0];
  if (search.className.indexOf("change-height") !== -1) {
    search.classList.remove("change-height");
    value = true;
  } else {
    value = false;
    search.classList.add("change-height");
  }
  return value;
};
//数字保留n位小数,并去除小数点后面的0
Vue.prototype.$toFixed = function(value, n) {
  return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
};
//输入价格时只能是大于等于0的n位小数
Vue.prototype.$filterPriceNum = function(value, n) {
  value += "";
  value = value.replace(/[^\d.]/g, ""); //只能输入数字或"."
  if (value != "") {
    let pointIndex = value.indexOf(".");
    if (pointIndex < 0) {
      value = value * 1 + "";
    } else if (pointIndex == 0) {
      value = value.substring(1, value.length);
    } else {
      let pointLeft = value.substring(0, pointIndex);
      let pointRight = value.substr(pointIndex + 1, n + 1);
      if (pointRight == "") {
        value = pointLeft * 1 + ".";
      } else {
        pointRight = pointRight.replace(".", "");
        value = pointLeft * 1 + "." + pointRight.substr(0, n);
      }
    }
  }
  return value;
};
//四舍五入
function getRound(value, n) {
  return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
}
//供应商已用授信额度计算：
//供应商已用授信额度=供应商预付账款+付款单已创建未过账金额汇总+付款申请单已创建未付款总额汇总+销售发票已创建未过账总金额；
Vue.prototype.$supplierUsed = function(num1, num2, num3, num4) {
  let tol1 = Count.accAdd(num1, num2);
  let tol2 = Count.accAdd(num3, num4);
  let res = Count.accAdd(tol1, tol2);
  return res;
};

//客户已用授信额度计算：
//已用授信额度=客户应收账款+出库单已创建未过账总金额+出库单已过账未开票总金额+销售发票已创建未过账总金额；
Vue.prototype.$custUsed = function(num1, num2, num3, num4) {
  let tol1 = Count.accAdd(num1, num2);
  let tol2 = Count.accAdd(num3, num4);
  let res = Count.accAdd(tol1, tol2);
  return res;
};

// 采购不含税单价 unorginPrice = 采购含税单价÷（1+增值税率）
Vue.prototype.$unorginPrice = (orginPrice, taxRate) => {
  let sl = Count.accDiv(taxRate, 100);
  let tol1 = Count.accAdd(1, sl);
  let res = Count.accDiv(orginPrice, tol1);
  return Number.isInteger(res) ? res : getRound(res, 6);
};

// 采购含税单价 orginPrice = 采购含税金额 ÷ 数量
Vue.prototype.$orginPrice = (orginAmt, itemQty) => {
  let res = Count.accDiv(orginAmt, itemQty);
  return Number.isInteger(res) ? res : getRound(res, 6);
};

// 采购不含税单价 unorginPrice = 采购不含税金额 ÷ 数量
Vue.prototype.$unPrice = (unorginAmt, itemQty) => {
  let res = Count.accDiv(unorginAmt, itemQty);
  return Number.isInteger(res) ? res : getRound(res, 6);
};

// 采购含税金额 orginAmt = 采购含税单价*数量
Vue.prototype.$orginAmt = (orginPrice, itemQty) => {
  let res = Count.accMul(orginPrice, itemQty);
  return Number.isInteger(res) ? res : getRound(res, 2);
};

// 采购不含税金额 unorginAmt = 采购含税金额 ÷（1+增值税率)
Vue.prototype.$unorginAmt = (orginAmt, taxRate) => {
  let sl = Count.accDiv(taxRate, 100);
  let tol1 = Count.accAdd(1, sl);
  let res = Count.accDiv(orginAmt, tol1);
  return Number.isInteger(res) ? res : getRound(res, 2);
};

//税额变动时
// 采购不含税金额 unorginAmt = 采购含税金额--税额
Vue.prototype.$unorginAmtCh = (orginAmt, taxAmt) => {
  let res = Count.accSub(orginAmt, taxAmt);
  return Number.isInteger(res) ? res : getRound(res, 2);
};

// 增值税额 taxAmt = 采购含税金额-采购不含税金额
Vue.prototype.$taxAmt = (orginAmt, unorginAmt) => {
  let res = Count.accSub(orginAmt, unorginAmt);
  return Number.isInteger(res) ? res : getRound(res, 2);
};

// 本币含税单价=业务币含税单价*汇率
Vue.prototype.$bbhsdj = (ywbhsdj, hl) => {
  let res = Count.accMul(ywbhsdj, hl);
  return Number.isInteger(res) ? res : getRound(res, 6);
};

// 本币不含税单价=业务币不含税单价*汇率
Vue.prototype.$bbnhsdj = (ywbBhsdj, hl) => {
  let res = Count.accMul(ywbBhsdj, hl);
  return Number.isInteger(res) ? res : getRound(res, 6);
};

// 本币含税金额=业务币含税金额*汇率
Vue.prototype.$bbhsje = (ywbhsje, hl) => {
  let res = Count.accMul(ywbhsje, hl);
  return Number.isInteger(res) ? res : getRound(res, 2);
};

// 本币不含税金额=业务币不含税金额*汇率
Vue.prototype.$bbnhsje = (ywbnhsje, hl) => {
  let res = Count.accMul(ywbnhsje, hl);
  return Number.isInteger(res) ? res : getRound(res, 2);
};

// 本币不含税金额 统一：本位币不含税=本位币含税金额-本位币税额
Vue.prototype.$tybbnhsje = (bwbhsje, bwbse) => {
  let res = Count.accSub(bwbhsje, bwbse);
  return Number.isInteger(res) ? res : getRound(res, 2);
};

// 本币增值税额=业务币增值税额*汇率
Vue.prototype.$bbzzse = (ywbzzse, hl) => {
  let res = Count.accMul(ywbzzse, hl);
  return Number.isInteger(res) ? res : getRound(res, 2);
};

// 比例 rate = 含税金额/采购含税总金额*100
Vue.prototype.$rate = (vatAmt, all) => {
  let tol = ``;
  for (const item of all) {
    tol = Count.accAdd(tol, item.originAmt);
  }
  let aly = Count.accDiv(vatAmt, tol);
  let res = Count.accMul(aly, 100).toFixed(2);
  return res;
};
// 含税金额 vatAmt = 比例 rate * 采购含税总金额 / 100
Vue.prototype.$vatAmt = (rate, all) => {
  let tol = ``;
  for (const item of all) {
    tol = Count.accAdd(tol, item.originAmt);
  }
  let rea = Count.accMul(rate, tol);
  let res = Count.accDiv(rea, 100);
  return Number.isInteger(res) ? res : getRound(res, 2);
};

// 含税代理费 = 含税代理费费率*采购含税金额*采购汇率
Vue.prototype.$vatProxyAmt = (vatProxyRate, all, rate) => {
  let tol = ``;
  for (const item of all) {
    tol = Count.accAdd(tol, item.originAmt);
  }
  let res = Count.accMul(vatProxyRate, tol);
  let red = Count.accMul(res, rate);
  return Number.isInteger(red) ? red : getRound(red, 6);
};

// 不含税代理费 = 不含税代理费费率*采购不含税金额*采购汇率
Vue.prototype.$extaxProxyAmt = (extaxProxyRate, all, rate) => {
  let tol = ``;
  for (const item of all) {
    tol = Count.accAdd(tol, item.unoriginAmt || item.unOriginAmt);
  }
  let res = Count.accMul(extaxProxyRate, tol);
  let red = Count.accMul(res, rate);
  return Number.isInteger(red) ? red : getRound(red, 6);
};

// 放货单价=（发票外汇金额*（1+含税代理费率）+ 发票外汇金额 *（1-保证金比率）* 含税月息利率 * 计息放货天数/30）
//          *（1+增值税率）* 结算汇率/数量
// 发票外汇金额 是 采购业务币含税金额
Vue.prototype.$unitPrice = (
  orginAmt,
  vatProxyRate,
  insuranceRate,
  vatProfileRate,
  calcDays,
  taxRate,
  settleCurrencyRate,
  itemQty
) => {
  //发票外汇金额*（1+含税代理费率）
  //orginAmt * (1 + vatProxyRate)
  let tol1 = Count.accMul(orginAmt, Count.accAdd(1, vatProxyRate));
  // 发票外汇金额 *（1-保证金比率）
  // orginAmt * (1-insuranceRate)
  let tol2 = Count.accMul(orginAmt, Count.accSub(1, insuranceRate));
  // 发票外汇金额 *（1-保证金比率）* 含税月息利率
  // tol2 * vatProfileRate
  let tol3 = Count.accMul(tol2, vatProfileRate);
  // 计息放货天数/30
  // calcDays/30
  let tol4 = Count.accSub(calcDays, 30);
  let tol5 = Count.accMul(tol3, tol4);

  let tol6 = Count.accAdd(tol1, tol5);

  //（1+增值税率）* 结算汇率/数量
  // (1+taxRate) * settleCurrencyRate/itemQty
  let sl = Count.accDiv(taxRate, 100);
  let tol7 = Count.accMul(
    Count.accAdd(1, sl),
    Count.accDiv(settleCurrencyRate, itemQty)
  );
  let res = Count.accMul(tol6, tol7);
  return res;
};

// 保费 = 销售合同金额*9/10000自动计算
Vue.prototype.$baofei = jine => {
  let tol = Count.accMul(jine, 9);
  let red = Count.accDiv(tol, 10000);
  return Number.isInteger(red) ? red : getRound(red, 6);
};

// 成本合计 = 采购货价（含税）-增值税+运费
Vue.prototype.$cbhj = (cghj, zzs, yf) => {
  let tol = Count.accSub(cghj, zzs);
  let res = Count.accAdd(tol, yf);
  return Number.isInteger(res) ? res : getRound(res, 6);
};

// 税金合计 = 自动汇总增值税
Vue.prototype.$sjhj = all => {
  let res = 0;
  for (const item of all) {
    res = Count.accAdd(res, item);
  }
  return Number.isInteger(res) ? res : getRound(res, 2);
};

// 销售收入（不含税） = 销售收入（含税）-销项增值税
Vue.prototype.$xssr = (xssr, xszzs) => {
  let res = Count.accSub(xssr, xszzs);
  return Number.isInteger(res) ? res : getRound(res, 6);
};

// 成本及费用合计 = 成本合计+保费
Vue.prototype.$cbfyhj = (cbhj, bf) => {
  let res = Count.accAdd(cbhj, bf);
  return Number.isInteger(res) ? res : getRound(res, 6);
};

// 实现利润 = 其他收入+销售收入（不含税）-税金合计-成本及费用合计
Vue.prototype.$sxlr = (qtsr, xssr, sjhj, cbfy) => {
  let tol = Count.accAdd(qtsr, xssr);
  let elo = Count.accAdd(sjhj, cbfy);
  let res = Count.accSub(tol, elo);
  return Number.isInteger(res) ? res : getRound(res, 6);
};

//采购
// 实现利润 = 其他收入+销售收入（不含税）-其他支出-成本及费用合计
Vue.prototype.$sxlr = (qtsr, xssr, qtzc, cbfy) => {
  let tol = Count.accAdd(qtsr, xssr);
  let elo = Count.accAdd(qtzc, cbfy);
  let res = Count.accSub(tol, elo);
  return Number.isInteger(res) ? res : getRound(res, 6);
};

// 利润率 = 实现利润/（成本及费用+税金合计）
Vue.prototype.$xslrl = (sxlr, cbfy, sjhj) => {
  let tol = Count.accAdd(cbfy, sjhj);
  let res = Count.accDiv(sxlr, tol);
  res = Count.accMul(res, 100);
  return Number.isInteger(res) ? res : getRound(res, 6);
};

//采购
// 利润率 = 实现利润/销售收入（不含税）   //（成本及费用）
Vue.prototype.$lrl = (sxlr, xssrb) => {
  let res = Count.accDiv(sxlr, xssrb);
  res = Count.accMul(res, 100);
  return Number.isInteger(res) ? res : getRound(res, 6);
};

// 成本及费用合计 = 成本合计+保费
Vue.prototype.$cbfyhj = (cbhj, bf) => {
  let res = Count.accAdd(cbhj, bf);
  return Number.isInteger(res) ? res : getRound(res, 6);
};

// 含税月息利率=不含税月息利率*（1+增值税率）；  add,Sub,Mul,div
Vue.prototype.$hsYX = (bhsyx, lv) => {
  let tol1 = Count.accAdd(1, Count.accDiv(lv, 100));
  let res = Count.accMul(bhsyx, tol1);
  return Number.isInteger(res) ? res : getRound(res, 8);
};

// 不含税月息利率=含税月息利率/（1+增值税率）；  add,Sub,Mul,div
Vue.prototype.$bhsYX = (hsyx, lv) => {
  let tol1 = Count.accAdd(1, Count.accDiv(lv, 100));
  let res = Count.accDiv(hsyx, tol1);
  return Number.isInteger(res) ? res : getRound(res, 8);
};

// 含税逾期利率=不含税逾期利率*（1+增值税率）；
Vue.prototype.$hsYQ = (bhsyq, lv) => {
  let tol1 = Count.accAdd(1, Count.accDiv(lv, 100));
  let res = Count.accMul(bhsyq, tol1);
  return Number.isInteger(res) ? res : getRound(res, 8);
};

// 不含税逾期利率=含税逾期利率/（1+增值税率）；
Vue.prototype.$bhsYQ = (hsyq, lv) => {
  let tol1 = Count.accAdd(1, Count.accDiv(lv, 100));
  let res = Count.accDiv(hsyq, tol1);
  return Number.isInteger(res) ? res : getRound(res, 8);
};

// 含税代理费率=不含税代理费率*（1+增值税率）；
Vue.prototype.$hsDL = (bhsDL, lv) => {
  let tol1 = Count.accAdd(1, Count.accDiv(lv, 100));
  let res = Count.accMul(bhsDL, tol1);
  return Number.isInteger(res) ? res : getRound(res, 8);
};

// 不含税代理费率=含税代理费率/（1+增值税率）；
Vue.prototype.$bhsDL = (hsDL, lv) => {
  let tol1 = Count.accAdd(1, Count.accDiv(lv, 100));
  let res = Count.accDiv(hsDL, tol1);
  return Number.isInteger(res) ? res : getRound(res, 8);
};

// 1.	物料本币金额计算逻辑：
// 本币含税单价、业务币不含税单价、本币含税金额、业务币不含税金额、本币增值税额税之前的逻辑关系
// 业务币不含税单价=业务币含税单价÷（1+增值税率）
// 业务币含税单价*数量=业务币含税金额
// 业务币不含税金额=业务币含税金额÷（1+增值税率）
// 本币增值税额=业务币含税金额-业务币不含税金额
// 业务币不含税金额=含税总价-税额   等等
//...
//计算 //type===>{add,Sub,Mul,div },otherValue 为1 则各种税率需要加1
//resutNumType  //
Vue.prototype.$calculationFun = (num1, num2, type, otherValue) => {
  let result = 0;
  if (otherValue == 1) {
    num2 = Count.accAdd(1, num2); //有些计算需要税率加1
  }
  switch (type) {
    case "add": //加
      result = Count.accAdd(num1, num2);
      break;
    case "sub": //减
      result = Count.accSub(num1, num2);
      break;
    case "mul": //乘
      result = Count.accMul(num1, num2);
      break;
    case "div": //除
      result = Count.accDiv(num1, num2);
      break;
  }
  if (Number.isInteger(result)) {
    return result;
  } else {
    return result.toFixed(4);
  }
};
//计算金额，总金额汇总
Vue.prototype.$calculationAmount = (num1, num2, type) => {
  let result = 0;
  switch (type) {
    case "add": //加
      result = Count.accAdd(num1, num2);
      break;
    case "sub": //减
      result = Count.accSub(num1, num2);
      break;
    case "mul": //乘
      result = Count.accMul(num1, num2);
      break;
    case "div": //除
      result = Count.accDiv(num1, num2);
      break;
  }
  return Number.isInteger(result) ? result : getRound(result, 2);
  // if (Number.isInteger(result)) {
  //   return result;
  // } else {
  //   return result.toFixed(2);
  // }
};
//费用预提  无税金额=业务币费用金额-税额
Vue.prototype.$fyytjs = (fyj, se) => {
  let res = Count.accSub(fyj, se);
  return Number.isInteger(res) ? res : res.toFixed(2);
};
// 费用预提 无税金额 = 含税金额 ÷（1+税率)
Vue.prototype.$noOrginAmt = (orginAmt, taxRate) => {
  let sl = Count.accDiv(taxRate, 100);
  let tol1 = Count.accAdd(1, sl);
  let res = Count.accDiv(orginAmt, tol1);
  return Number.isInteger(res) ? res : res.toFixed(2);
};
//计算税额  业务币费用金额/(1+税率)* 税率 Tax amount
Vue.prototype.$calculationTaxAmount = (num1, num2) => {
  //num1==业务币费用金额，num2==税率
  let result = Count.accMul(Count.accDiv(num1, Count.accAdd(1, num2)), num2);
  if (Number.isInteger(result)) {
    return result;
  } else {
    return result.toFixed(2);
  }
};

//错误框提示
Vue.prototype.$openError = function(text) {
  this.$message({
    showClose: true,
    message: text,
    type: "error",
    center: true
  });
};
//警告框提示
Vue.prototype.$openWarning = function(text) {
  this.$message({
    showClose: true,
    message: text,
    type: "warning",
    center: true
  });
};
//成功框提示
Vue.prototype.$openSuccess = function(text) {
  this.$message({
    showClose: true,
    message: text,
    type: "success",
    center: true
  });
};
//合同对比页面中计算不含税金额，含税-税额
//n保留几位小数
Vue.prototype.$hthsje = (hsje, se, n) => {
  let res = Count.accSub(hsje, se);
  return Number.isInteger(res) ? res : getRound(res, n);
};

//验证表格必填项
/**
 * param 验证对象{key:labelName}
 * array tableArray []
 */
Vue.prototype.$validateArray = function(array, param) {
  let flag = true;
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    let keyArray = Object.keys(param);
    for (let j = 0; j < keyArray.length; j++) {
      let key = keyArray[j];
      const element = item[key];
      if (element != undefined && element != null && element !== "") {
      } else {
        this.$message({
          message: `${param[key]}不能为空`,
          type: "error"
        });
        flag = false;
        return flag;
      }
    }
  }
  return true;
};
/**
 * param 验证对象{key:labelName}
 * Object JSON
 */
Vue.prototype.$validateObj = function(object, param) {
  let flag = true;
  for (const key in param) {
    if (param.hasOwnProperty(key)) {
      const element = object[key];
      if (element != undefined && element != null && element !== "") {
      } else {
        this.$message({
          message: `${param[key]}不能为空`,
          type: "error"
        });
        flag = false;
        break;
      }
    }
  }
  return flag;
};
/**
 * param 验证对象{key:labelName}
 * Object JSON
 */
Vue.prototype.$validatePrice = function(object, param) {
  let flag = true;
  for (const key in param) {
    if (param.hasOwnProperty(key)) {
      const element = object[key];
      if (element > 0) {
      } else {
        this.$message({
          message: `${param[key]}必须大于0`,
          type: "error"
        });
        flag = false;
        break;
      }
    }
  }
  return flag;
};
//验证表格必填项
/**
 * param 验证对象{key:labelName}
 * array tableArray []
 */
Vue.prototype.$validateArrayPrice = function(array, param) {
  let flag = true;
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    let keyArray = Object.keys(param);
    for (let j = 0; j < keyArray.length; j++) {
      let key = keyArray[j];
      const element = item[key];
      if (element > 0) {
      } else {
        this.$message({
          message: `${param[key]}必须大于0`,
          type: "error"
        });
        flag = false;
        return flag;
      }
    }
  }
  return true;
};
//验证单据+款项内容 唯一性
/**
 * key:单据key
 * array tableArray []
 */
Vue.prototype.$validateArrayCashContent = function(array, key) {
  let flag = true;
  let documentNoArray = array.map(item => item[key]);
  let documentNoArrayFiltter = Array.from(new Set(documentNoArray)); //去重后单据数组
  let RowArray = [];
  for (let i = 0; i < documentNoArrayFiltter.length; i++) {
    let templateArray = [];
    for (let j = 0; j < array.length; j++) {
      let item = array[j];
      let documentNo = documentNoArrayFiltter[i];
      const element = item[key];
      if (documentNo === element) {
        templateArray.push(item);
      }
    }
    RowArray[i] = templateArray;
  }
  for (let i = 0; i < RowArray.length; i++) {
    let arr = RowArray[i].map(it => it.moneyContent);
    if (new Set(arr).size !== arr.length) {
      this.$message({
        message: `单据${documentNoArrayFiltter[i]}存在相同的款项`,
        type: "error"
      });
      flag = false;
      break;
    } else {
      continue;
    }
  }
  return flag;
};

//存查询条件
Vue.prototype.$setQueryData = (that, value) => {
  const routeName = that.$route.name;
  let searchData = sessionStorage.getItem("searchData");
  if (searchData) {
    searchData = JSON.parse(searchData);
    searchData[routeName] = value;
  } else {
    searchData = {};
    searchData[routeName] = value;
  }
  sessionStorage.setItem("searchData", JSON.stringify(searchData));
};
//取查询条件
Vue.prototype.$getQueryData = that => {
  const routeName = that.$route.name;
  let searchData = sessionStorage.getItem("searchData");
  if (searchData) {
    searchData = JSON.parse(searchData);
    let queryData = searchData[routeName];
    if (queryData) {
      for (const key in queryData) {
        if (queryData.hasOwnProperty(key)) {
          that[key] = queryData[key];
        }
      }
      return queryData;
    }
  }
  return {};
};
//查询显示的搜索条件数量
Vue.prototype.$checkedNum = list => {
  let num = 0;
  list.forEach(item => {
    if (item.checked) {
      num++;
    }
  });
  return num;
};
