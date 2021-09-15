<template>
<div class="headerTabs">
  <el-tabs  v-model="tabsActive" type="card" @tab-remove="removeTab" @tab-click="changeTabs">
    <el-tab-pane
      v-for="(item) in tabsList"
      :key="item.url"
      :label="item.label"
      :name="item.url"
      :closable="item.url == 'systemIndex'?false:true"
    >
    </el-tab-pane>
  </el-tabs>
  <el-dropdown class="closeTabs" @command="closeTabs">
    <span class="el-dropdown-link">
      <i class="el-icon-setting"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="1"><i class="el-icon-right"></i>关闭右侧</el-dropdown-item>
      <el-dropdown-item command="2"><i class="el-icon-back"></i>关闭左侧</el-dropdown-item>
      <el-dropdown-item command="3"><i class="el-icon-close"></i>关闭其他</el-dropdown-item>
      <el-dropdown-item command="4"><i class="el-icon-circle-close"></i>全部关闭</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>
<script>
export default {
  name: "authTabs",
  data() {
    return {
      tabsActive: "systemIndex" //默认显示首页
    };
  },
  watch: {
    $route: "getRouterName"
  },
  computed: {
    tabsList() {
      return this.$store.state.tabs.tabsList;
    }
  },
  created() {
    this.tabsActive = this.$route.name;
  },
  mounted() {},
  methods: {
    closeTabs(type) {
      if (type == 4) {
        this.$router.push("/index/home/systemIndex");
        sessionStorage.setItem("moduleCode","T001");
      }
      this.$store.commit("tabsDelete", { url: this.tabsActive, type });
    },
    getRouterName(newVal) {
      const baseUrl = newVal.meta.parentName || newVal.name;
      const url = newVal.name;
      const obj = {
        url,
        baseUrl,
        params: this.$route.params,
        query: this.$route.query
      };
      this.$store.commit("tabsChange", obj);
      this.tabsActive = newVal.name;
    },
    removeTab(targetName) {
      let tabs = this.tabsList;
      let activeName = this.tabsActive;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.url === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.url;
              this.$router.push({
                name: activeName,
                params: nextTab.params,
                query: nextTab.query
              });
              if(activeName=="systemIndex"){
                sessionStorage.setItem("moduleCode","T001");
              }else{
                sessionStorage.setItem("moduleCode",nextTab.moduleCode);
              }
            } else {
              sessionStorage.setItem("moduleCode","T001");
              this.$router.push("/index/home/systemIndex");
            }
          }
        });
        this.$store.commit("tabsDelete", { url: this.tabsActive, type: 0 });
        this.tabsActive = activeName;
      } else {
        //不是当前页面
        this.$store.commit("tabsDelete", { url: targetName, type: 0 });
      }
    },
    changeTabs(tab) {
      let obj = this.tabsList.find(item => {
        return item.url == tab.name;
      });
      if (obj.moduleCode) {
        sessionStorage.setItem("moduleCode", obj.moduleCode);
      }else{
        sessionStorage.setItem("moduleCode","T001");
      }
      this.$router.push({
        name: tab.name,
        params: obj.params,
        query: obj.query
      });
    }
  }
};
</script>
<style lang="scss">
.headerTabs {
  position: relative;
  padding-right: 30px;
  width: 79%;
  margin: 0 auto;
  float: left;
  .closeTabs {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 30px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin-right: 0px;
    .el-dropdown-link {
      cursor: pointer;
      display: inline-block;
      width: 100%;
      height: 100%;
      line-height: 42px;
      &:hover {
        color: #409eff;
      }
      i {
        margin: 0;
        font-size: 18px;
      }
    }
  }
  .el-tabs {
    // background-color: #ebf1f6;
    .el-tabs__header {
      margin: 0;
      /* border-bottom: 1px solid #cfd7e5; */
      height: 35px;
      .el-tabs__nav {
        border: 0;
        height: auto;
        overflow: hidden;
        border-color: #cfd7e5;
      }
      .el-tabs__nav-scroll {
        border-bottom: 0;
      }
      .el-tabs__item {
        border-left: 0;
        color: #606266;
        width: auto;
        line-height: 35px;
        + .el-tabs__item {
        }
      }
      .el-tabs__new-tab {
        width: 30px;
        height: 30px;
        line-height: 34px;
        margin: 0px;
        outline: none;
        border-bottom: 0;
        border-right: 0;
        i {
          font-size: 20px;
          color: #888888;
          &:hover {
            color: #409eff;
          }
        }
        .el-icon-plus:before {
          content: "" !important;
        }
      }
      .el-tabs__item.is-active.is-closable {
        border-bottom: 4px solid #29d3ed;
        background-color: #fdf7f7;
        color: #a1a2a2;
        //color: #666;
      }
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 35px;
      font-size: 16px;
    }
  }
}
.headerTabs .el-tabs .el-tabs__nav .is-active {
  border-bottom: 4px solid #29d3ed !important;
  background-color: #fdf7f7;
  color: #a1a2a2;
  height: 35px;
}
</style>
