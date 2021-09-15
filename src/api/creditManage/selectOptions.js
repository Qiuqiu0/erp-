import { service, serviceJson } from "../../axios/index";
let suffix = window.ROOT_PATH.suffix1;
let suffix3 = window.ROOT_PATH.suffix3;
//收款类别
export const payeeCategoryOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1032 }
  });
};
//收款单状态
export const payeeStatusOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1033 }
  });
};
//收款方式
export const payeeTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1031 }
  });
};
//款项内容
export const crashContentOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1036 }
  });
};
//辅助核算分类
export const zzexpectOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1035 }
  });
};
//收款标志
export const payeeLabelOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1034 }
  });
};
//单据类型
export const docTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1053 }
  });
};
//付款类型
export const paymentTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1050 }
  });
};
//付款方式
export const payTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1021 }
  });
};
//付款申请单状态
export const applyStatusOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1046 }
  });
};
//付款单申请单据类型
export const applyInvoiceTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1054 }
  });
};
//付款单申请手续承担方
export const feeChargeByOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1063 }
  });
};
//付款单 付款状态 付款/过账/冲销
export const payStatusOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1049 }
  });
};
//冲销原因
export const writeOffReasonOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1078 }
  });
};
// 票据类型
export const invoiceTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1087 }
  })
}
//应付票据 票据性质	
export const invoicePropertiesOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1083 }
  })
}
//应付票据 票据状态
export const billStatusOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1082 }
  })
}
//应收票据 票据状态
export const instrumentStatusOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1027 }
  })
}
//结售汇  状态
export const salesStatusOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1073 }
  })
}
//结售汇  类型
export const salesTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1072 }
  })
}
//结收汇申请 业务类型
export const businessTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1074 }
  })
}
//结收汇执行 执行类型
export const executeTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1075  }
  })
}
//结收汇执行 执行类型
export const executeDocTypeOptions = data => {
  return service({
    url: suffix + "/base/sys/dic/select.do",
    method: "post",
    data: { dictNo: 1076  }
  })
}
//过账 冲销 时间段获取
export const getCompanyAccountingDate = params => {
  return service({
    url: suffix3 + "/capital/monthbanlance/getAccountPeriodByCompany.do",
    method: "post",
    params
  })
}