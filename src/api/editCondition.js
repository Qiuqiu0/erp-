import { service, serviceJson } from "../axios/index";
let suffix = window.ROOT_PATH.suffix1;

//当前页面条件筛选列表
export const getFilterList = data => {
    const moduleCode = sessionStorage.getItem("moduleCode")
    return serviceJson({
        url: suffix + `/business/lists/${moduleCode}`,
        method: "get",
        data
    });
};

export const setFilterList = data => {
    const moduleCode = sessionStorage.getItem("moduleCode");
    return serviceJson({
        url: suffix + `/business/lists`,
        method: "post",
        data:{...data,moduleCode}
    });
};
