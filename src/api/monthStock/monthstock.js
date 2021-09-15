import { service, serviceJson } from "../../axios/index";
let report = window.ROOT_PATH.suffix5;
//分合同库存报表 列表
export const getMonthstock = data => {
    return serviceJson({
      url: report + "/inventoryMon/listV2.do",
      method: "post",
      data
    });
  };
  //月结库存明细表导出
  
  export const exportOdInventoryMonList = data => {
    return serviceJson({
      url: report + "inventoryMon/exportOdInventoryMonListV2.do",
      method: "post",
      responseType: 'arraybuffer',
      data
    });
  };