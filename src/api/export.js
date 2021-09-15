import { service, serviceJson } from "../axios/index";
import {queryFilter} from "@/assets/js/commonAction";
//导出表格
export const dataExport =( {data,url}) => {
    return serviceJson({
        url,
        responseType: 'blob',
        method: "post",
        data:queryFilter(data)
    });
};
