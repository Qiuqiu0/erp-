import { service } from "../axios/index";

export const ApiLogin = data => {
  return service({
    url: "/login/login.do",
    method: "post",
    data
  });
};
