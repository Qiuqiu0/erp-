const importFilter = {
  install(Vue) {
    //失效状态过滤器
    Vue.filter("status", function (value) {
      return value == 1 ? "生效" : value == 0 ? "失效" : "";
    });

    //时间过滤器
    Vue.filter("time", function (value) {
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
        return Y + M + D + " " + h + m + s;
      }
    });
    //日期过滤器
    Vue.filter("time2Date", function (value) {
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
        return Y + M + D;
      }
    });
    //key 值绑定
    Vue.filter("row2key", function (value,id,props) {
     return value.one?value.one+props:value[id]+props
    });
    Vue.filter("$moneyFormat", function (cellValue) {
      if (!cellValue) {
        return '';
      }
      cellValue = parseFloat(cellValue).toFixed(2);
      return String(cellValue)
          .replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
            return $1 + ",";
          })
          .replace(/\.$/, "");
    });

  }
}
export default importFilter;
