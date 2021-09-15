<template>
  <el-container class="index">
    <el-container class="content">
    <div class="aside-div" :style="asideDiv">
      <p class="hide-aside" @click="showMenu()">
        <i class="el-icon-d-arrow-right hide-p"></i>
      </p>
      <el-aside style="width:180px;height:100%"  :style="navColor" v-show="isShow">
          <div class="logo">
            <img src="./imgs/logo.png" alt="">
          </div>
          <!--导航-->
          <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              :style="navColor"
              active-background-color="#4159A8"
            >
            <el-menu-item  index="/index/home/systemIndex" @click="goTo('/index/home/systemIndex')">
              <i class="el-icon-menu"></i>
              <span slot="title">系统</span>
              </el-menu-item>

              <el-submenu index="/index/exchangeRate/exchange">
                <template slot="title">
                  <span>公共数据</span>
                </template>
                <el-menu-item index="/index/exchangeRate/exchange" @click="goTo('/index/exchangeRate/exchange')">汇率管理</el-menu-item>
                <el-menu-item index="/index/bankData/index" @click="goTo('/index/bankData/index')">银行主数据</el-menu-item>
                <el-menu-item index="/index/currencyData/index" @click="goTo('/index/currencyData/index')">货币主数据</el-menu-item>
              </el-submenu>

             <el-submenu index="/index/productData/MaterialProperties" @click="goTo('/productData')">
                <span slot="title">产品数据</span>
                <el-menu-item index="/index/productData/MaterialProperties"  @click="goTo('/index/productData/MaterialProperties')">物料属性</el-menu-item> 
                <el-menu-item index="/index/productData/MaterialClassification"  @click="goTo('/index/productData/MaterialClassification')">物料大类</el-menu-item>
                <el-menu-item index="/index/productData/MaterialPropertiesList"  @click="goTo('/index/productData/MaterialPropertiesList')">物料属性组</el-menu-item> 
                <el-menu-item index="/index/productData/MaterialFiles" @click="goTo('/index/productData/MaterialFiles')">物料档案</el-menu-item>
                 
              </el-submenu>
							<el-submenu index="/index/basicData/customer">
								<template slot="title">
									<span>基础数据</span>
								</template>
								<el-menu-item index="/index/basicData/customer" @click="goTo('/index/basicData/customer')">客户管理</el-menu-item>
								<el-menu-item index="/index/basicData/supplier" @click="goTo('/index/basicData/supplier')">供应商管理</el-menu-item>
                <el-menu-item index="/index/warehouseData/index" @click="goTo('/index/warehouseData/index')">仓库管理</el-menu-item>
                <el-menu-item index="/index/company/companyMan" @click="goTo('/index/company/companyMan')">公司管理</el-menu-item>
                <el-menu-item index="/index/comDepartment/comDepartment" @click="goTo('/index/comDepartment/comDepartment')">部门管理</el-menu-item>
                <el-menu-item index="/index/staffData/index" @click="goTo('/index/staffData/index')">员工管理</el-menu-item>
                <el-menu-item index="/index/portData/index" @click="goTo('/index/portData/index')">港口管理</el-menu-item>
                <el-menu-item index="/index/basicData/projectMaintenance" @click="goTo('/index/basicData/projectMaintenance')">项目维护</el-menu-item>
							</el-submenu>

              <el-submenu index="/index/contractMange/bilateral/bilateralContracts">
                <template slot="title">
                  <span>合同协议</span>
                </template>
                <el-menu-item index="/index/contractMange/bilateral/bilateralContracts" @click="goTo('/index/contractMange/bilateral/bilateralContracts')">双边合同</el-menu-item>
                <el-menu-item index="/index/contractMange/domestic/domesticcontract" @click="goTo('/index/contractMange/domestic/domesticcontract')">内贸销售合同</el-menu-item>
                <el-menu-item index="/index/currencyData/index" @click="goTo('/index/currencyData/index')">出口销售合同</el-menu-item>
                <el-menu-item index="/index/currencyData/index" @click="goTo('/index/currencyData/index')">框架协议</el-menu-item>
                <el-menu-item index="/index/currencyData/index" @click="goTo('/index/currencyData/index')">内贸采购合同</el-menu-item>
                <el-menu-item index="/index/currencyData/index" @click="goTo('/index/currencyData/index')">进口采购合同</el-menu-item>
              </el-submenu>

            </el-menu>
        </el-aside>
       </div>
      <el-main>
      <!--user-->
        <div class="header-div">
          <p class="header-title">
            <i class="el-icon-tickets"></i><span>概览</span>
          </p>
          <ul class="header-right">
            <li>
              <el-dropdown @command="handleCommand" v-model="themecolor">
                <span class="el-dropdown-link" style="font-size:13px;color:#31478F">
                  主题<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a25fbc">
                    <span class="el-icon-success" style="color:#a25fbc;margin-right:5px"></span>紫色
                  </el-dropdown-item>
                  <el-dropdown-item command="31478F">
                    <span class="el-icon-success" style="color:#31478F;margin-right:5px"></span>蓝色
                  </el-dropdown-item>

                  
                  <el-dropdown-item command="1b1e24">
                    <span class="el-icon-success" style="color:#1b1e24;margin-right:5px"></span>黑色
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span style="margin-left:19px">|</span>
            </li>
            <li>
              <el-badge :value="1" class="item">
                 <span>
                  <i class="el-icon-message"></i>&nbsp;
                  消息
                </span>
              </el-badge>
               
                <span style="margin-left:19px">|</span>
            </li>
            <li>
              <span>
                <i class="iconfont">&#xe640;</i>&nbsp;
                用户名 {{userName}}
              </span>
              <span style="margin-left:19px">|</span>
            </li> 
            <li>
              <span @click="logout">
                <i class="iconfont">&#xe600;</i>&nbsp;
                退出
              </span>      
            </li>      
          </ul> 
      </div>
       <!--内容-->
       <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { toggleClass } from "./util/index.js";
export default {
  name: "index",
  data() {
    return {
      userName: sessionStorage.getItem("userName") || "admin",
      names: 3,
      classH2: "custome-a25fbc",
      colorfile: "a25fbc",
      isShow: true, //导航显示,隐藏,
      asideDiv: {
        width: ""
      },
      colorflid: {
        button: {
          backgroundColor: ""
        }
      },
      navColor: {
        backgroundColor: ""
      }
    };
  },
  created() {},
  mounted() {
    toggleClass(document.body, "custom-" + this.themecolor);
    let curcolor = this.$store.state.themecolor;
    this.themecolor = this.$store.state.themecolor;
    //  themecolor有存储值执行localStorage里面的值
    if (localStorage.themecolor) {
      this.colorflid.backgroundColor = "#" + localStorage.getItem("themecolor");
      this.navColor.backgroundColor = "#" + localStorage.getItem("themecolor");
    } else {
      this.colorflid.backgroundColor = "#" + this.themecolor;
      this.navColor.backgroundColor = "#" + this.themecolor;
    }
    this.classH2 = "custome-" + curcolor;
  },
  methods: {
    logout() {
      this.$confirm("请确认是否退出当前用户?", "退出提示", {
        confirmButtonText: "确认退出",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        sessionStorage.clear();
        this.$router.push("/login");
        this.$message({
          type: "success",
          message: "退出成功!"
        });
      });
    },

    goTo(path) {
      this.$router.replace(path);
    },
    /*eslint-disable*/ 
    showMenu(){
       if(this.isShow){
         
         this.isShow=false;
         this.asideDiv.width="18px";
       }else{
         
         this.isShow=true;
         this.asideDiv.width="192px";
       }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command){
      this.themecolor=command;
    }
  /*eslint-disable*/ 
  },
  computed: {
    themecolor: {
      get() {
        return this.$store.state.themecolor;
      },
      set(val) {
        this.$store.commit("setThemeColor", val);
      }
    }
  },
  watch: {
    themecolor: {
      handler() {
        this.colorflid.backgroundColor = "#" + this.themecolor;
        this.navColor.backgroundColor = "#" + this.themecolor;
        toggleClass(document.body, "custom-" + this.themecolor);
        localStorage.setItem("themecolor", this.themecolor);
      }
    }
  }
};
</script>
<style lang="scss">
</style>
