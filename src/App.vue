<template>
  <div id="app">
    <router-view v-wechat-title='$route.meta.title' v-if="isRouterAlive"/>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息   将字符串转成对象或是数组
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里 将对象数组转成字符串
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  methods: {
    ...mapMutations(["setRoute"]),
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  },
  watch: {
    $route(to, from) {
      if (from.name) {
        this.setRoute(to);
      }
    }
  }
};
</script>

<style lang="scss">
@import "./assets/css/reset.css";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
}
#app {
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  min-width: 1100px;
}
.el-scrollbar .el-select-dropdown__list .el-select-dropdown__item {
  font-size: 12px;
  height: 30px;
  line-height: 30px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
@font-face {
  font-family: "iconfont"; /* project id 1312715 */
  src: url("//at.alicdn.com/t/font_1312715_8bdc9if95qi.eot");
  src: url("//at.alicdn.com/t/font_1312715_8bdc9if95qi.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1312715_8bdc9if95qi.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1312715_8bdc9if95qi.woff") format("woff"),
    url("//at.alicdn.com/t/font_1312715_8bdc9if95qi.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1312715_8bdc9if95qi.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

#app .input-div .el-col {
  .inputRed {
    .el-input__inner {
      border: 2px solid;
      border-color: #ee2e37a8 !important;
    }
  }
}
#app .index .inputRed .el-input--small .el-input__inner {
  border: 2px solid;
  border-color: #ee2e37a8 !important;
}
#app .index .index-div3 .el-col .inputRed .el-input__inner,#app .index .input-div2 .el-col .inputRed .el-input__inner, #app .index .index-div3 .input-div .el-col .inputRed .el-input__inner {
  border: 2px solid;
  border-color: #ee2e37a8 !important;
}
#app .index .index-div3 .el-col .inputRed .el-range-input, #app .index .index-div3 .input-div .el-col .inputRed .el-range-input {
  border: 2px solid;
  border-color: #ee2e37a8 !important;
}

.editArrow:hover{
  transform: scale(1.2) ;
}
.index .index-div3 .el-col .el-select .is-disabled .el-input__inner {
  background-color: #f9f6f6 !important;
}
.index .index-div3 .el-col  .is-disabled .el-input__inner {
  background-color: #f9f6f6 !important;
}
// #app .el-tabs__content {
//   max-height: 580px;
//   // overflow: scroll;
// }
// #app .content-div2 {
//   max-height: 580px;
//   // overflow: scroll;
// }
</style>
