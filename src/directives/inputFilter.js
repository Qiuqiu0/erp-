/**
 *  实现功能
 *  1、默认情况下只禁止空格输入
 *  2、限制只能输入整数
 *  3、限制只能输入整数和小数（价格类）
 *  4、限制只能输入手机号
 *  5、限制最大值和最小值(抛出错误给回调函数)
 */
const addListener = function (el, type, fn) {
  el.addEventListener(type, fn, false);
};
const spaceFilter = function (el) {
  addListener(el, "input", () => {
    el.value = el.value.replace(/\s+/, "");
  });
};
const intFilter = function (el,vnode) {
  addListener(el, "input", () => {
    el.value = el.value.replace(/\D/g, "");
    vnode.data.model.callback(el.value);
  });
};
const priceFilter = function (el, vnode) {
  addListener(el, "input", () => {
    el.value = el.value.replace(/[^\d.]*/g, "");
    if (isNaN(el.value)) {
      vnode.data.model.callback("");
    } else {
      el.value = el.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      vnode.data.model.callback(el.value);
    }
  });
};
const specialFilter = function (el,vnode) {
  addListener(el, "input", () => {
    el.value = el.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, "");
    vnode.data.model.callback(el.value);
  });
};
const phoneFilter = function (el) {
  addListener(el, "blur", () => {
    if (!el.value) {
      return;
    }
    const phoneReg = new RegExp("^(13|14|15|16|17|18|19)[0-9]{9}$");
    if (!phoneReg.test(el.value)) {
      alert("手机号输入错误");
      el.value = "";
    }
  });
};
const urlFilter = function (el) {
  addListener(el, "blur", () => {
    if (!el.value) {
      return;
    }
    const urlReg = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/;
    if (!urlReg.test(el.value)) {
      alert("url输入错误");
      el.value = "";
    }
  });
};
//小数保留位数 2 4 6 8
/*
金额 2
数量 4
单价 6
汇率 8
*/
function numVal(value, n) {
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
}
const code = function (el) {
  addListener(el, "input", () => {
    el.value = el.value.replace(/[\u4e00-\u9fa5]/gi, "");
  });
};
const num0 = function (el, vnode) {
  addListener(el, "input", () => {
    el.value = el.value.replace(/[^0-9]/g, "");
    el.value = el.value = numVal(el.value, 0);
    // vnode.data.model.callback(el.value);
  });
};
const num2 = function (el, vnode) {
  addListener(el, "keypress", () => {
    // el.value = el.value.replace(/[^\d.]*/g, "");
    el.value = el.value.replace(/^[0-9]+\.[0-9]{2}$/, "$1$2.$3");
    // el.value = numVal(el.value, 1);
    // vnode.data.model.callback(el.value);
  });
};
const num4 = function (el, vnode) {
  addListener(el, "keypress", () => {
    el.value = el.value.replace(/[^\d.]*/g, "");
    // el.value = el.value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, "$1$2.$3");
    el.value = el.value = numVal(el.value, 3);
    // vnode.data.model.callback(el.value);
  });
};
const num6 = function (el, vnode) {
  addListener(el, "keypress", () => {
    el.value = el.value.replace(/[^\d.]*/g, "");
    if (isNaN(el.value)) {
      el.value = "";
    } else {
      // el.value = el.value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, "$1$2.$3");
    }
    el.value = numVal(el.value, 5);
    // vnode.data.model.callback(el.value);
  });
};
const num8 = function (el, vnode) {
  addListener(el, "keypress", () => {
    el.value = el.value.replace(/[^\d.]*/g, "");
    el.value = el.value.replace(
      /^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/,
      "$1$2.$3"
    );
    el.value = numVal(el.value, 7);
    // vnode.data.model.callback(el.value);
  });
};
//
const BankNum = function (el, vnode) {
  addListener(el, "change", () => {
    var pattern = /^([1-9]{1})(\d{14}|\d{18})$/;
    if (pattern.test(el.value)) {
      vnode.data.model.callback(el.value);
    } else {
      vnode.data.model.callback('');
    }
  });
}
export default {
  bind(el, binding, vnode) {
    if (el.tagName.toLowerCase() !== "input") {
      el = el.getElementsByTagName("input")[0];
    }
    spaceFilter(el);
    switch (binding.arg) {
      case "int":
        intFilter(el,vnode);
        break;
      case "price":
        priceFilter(el, vnode);
        break;
      case "special":
        specialFilter(el, vnode);
        break;
      case "phone":
        phoneFilter(el);
        break;
      case "url":
        urlFilter(el);
        break;
      case "num0":
        num0(el, vnode);
        break;
      case "num2":
        num2(el, vnode);
        break;
      case "num4":
        num4(el, vnode);
        break;
      case "num6":
        num6(el, vnode);
        break;
      case "num8":
        num8(el, vnode);
        break;
      case "code":
        code(el, vnode);
        break;
      case "BankNum":
          code(el, vnode);
          break;
      default:
        break;
    }
  }
};
