import { service, upload, serviceJson } from "@/axios/index";
const contract = window.ROOT_PATH.suffix2;

//框架合同
const getOdContractChangeLog = data => {
  return serviceJson({
    url: contract + "/callBack/contract/getOdContractChangeLog",
    method: "post",
    params:data
  });
};
export default {
    getOdContractChangeLog,

}