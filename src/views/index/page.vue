<template>
  <el-container class="index">
    <el-container class="content">
    <div class="aside-div" :style="asideDiv">
      <!-- <p class="hide-aside" @click="showMenu()">
        <i class="el-icon-d-arrow-right hide-p"></i>
      </p> -->
      <el-aside style="width:220px;height:100%;background-color:#424141"  v-show="isShow">
          <el-scrollbar style="height: 100%">
            <div class="logo" style="background-color:#5c9eff">
              <img style="padding-right:35px" src="./imgs/erp_logo.png" alt="">
            </div>
            <my-left :navColor="navColor" @userNameInit="userNameInit"></my-left>
          </el-scrollbar>
        </el-aside>
       </div>
      <el-main>
      <!--user-->
        <div class="header-div" style="width:100%">
          <p v-if="isShow" class="header-title" @click="showMenu()">
            <img style="margin-right:5px;height:30px;" src="./imgs/to_left.png" /><span>概况</span>
          </p>
          <p v-else class="header-title" @click="showMenu()">
            <img style="margin-right:5px;height:30px;" src="./imgs/to_right.png" /><span>概况</span>
          </p>
          <!--内容-->
          <my-tabs></my-tabs>
          <ul class="header-right">
            <li>
              <span>
                <img src="./imgs/user_header.png" style="height:30px;"/>
                {{userName}}
              </span>
            </li>
            <li>
              <span @click="logout" style="cursor:pointer">
               <img src="./imgs/log_out.png"  style="height:30px;"/>
                登出
              </span>
            </li>
          </ul>
      </div>
        <div class="content-view" v-if="contShow">
          <keep-alive :include="keepAlivePages">
            <router-view/>
          </keep-alive>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Left from "./left";
import Tabs from "./tabs";
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
        width: "220px"
      },
      colorflid: {
        button: {
          backgroundColor: ""
        }
      },
      navColor: {
        backgroundColor: ""
      },
      contShow:false,
    };
  },
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
    if(sessionStorage.getItem("showType")){
       this.contShow=true;
    }
  },
  methods: {
    userNameInit(userName) {
      this.userName = userName;
      this.contShow=true;
    },
    logout() {
      this.$confirm("请确认是否退出当前用户?", "退出提示", {
        confirmButtonText: "确认退出",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        sessionStorage.clear();
        this.$router.push("/login"); //退出到登录页面
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
         this.asideDiv.width="0px";
       }else{

         this.isShow=true;
         this.asideDiv.width="220px";
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
    },
    keepAlivePages() {
      return this.$store.state.tabs.keepAlivePages;
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
  },
  components: {
    "my-tabs": Tabs,
    "my-left": Left,
  }
};
</script>
<style lang="scss" scoped>
.content-view{
  padding:0 10px;
}
.el-icon-d-arrow-left:before,.el-icon-d-arrow-right:before{
  font-size: 16px;
}
// .index .logo img {
//   width: 75%;
//   margin: 10px;
// }


</style>
