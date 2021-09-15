<template>
<el-menu
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    text-color="#cccccc"
    :unique-opened="true">
   <el-submenu index="1" key="1" style="paddingTop:10px;">
          <template slot="title"><i style="margin-right: 20px;margin-bottom: 3px;font-size: 20px;" class="el-icon-star-on"></i>收藏夹</template>
          <el-menu-item :index="item.fileUrl" :key="item.moduleId+''+index" v-for="(item,index) in collectionMenuList" >
            <span slot="title" style="display: inline-block;width:100%;" @click="goPage(item)" >{{item.moduleLabel}}</span>
            <i style="margin-right:15px;color: yellow;" class="el-icon-star-on" @click="delRouter(item)"></i>
          </el-menu-item>
    </el-submenu>
   <!-- <template>
        <Menu :collectionMenuList="collectionMenuList"></Menu>
    </template> -->
    <template v-for="firstM in menuList">
      <template v-if="firstM.childAuthModuleList&&firstM.childAuthModuleList.length>0">
        <el-submenu  :index="firstM.moduleId" :key="firstM.moduleId">
          <template slot="title" style="height:45px">
            <i :class="firstM.iconUrl?firstM.iconUrl:''"></i>
            <span >{{firstM.moduleLabel}}</span>
          </template>
          <template v-for="secondM in firstM.childAuthModuleList">
            <template v-if="secondM.childAuthModuleList&&secondM.childAuthModuleList.length>0">
              <el-submenu :key="secondM.moduleId" :index="secondM.moduleId">
                <template slot="title"><span >{{secondM.moduleLabel}}</span></template>
                <el-menu-item :index="thirdM.fileUrl" :key="thirdM.moduleId" v-for="thirdM in secondM.childAuthModuleList">
                  <i :class="thirdM.iconUrl?thirdM.iconUrl:''"></i>
                  <span slot="title" style="display: inline-block;width:100%;" @click="goPage(thirdM)">{{thirdM.moduleLabel}}</span>
                  <i style="margin-right:15px" :class="thirdM.starFlag?'el-icon-star-on':'el-icon-star-off'" @click="addRouter(thirdM)"></i>
                </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="secondM.fileUrl" :key="secondM.moduleId"  @click="goPage(secondM)">
                <i class="el-icon-folder"></i>
                <span slot="title">{{secondM.moduleLabel}}</span>
              </el-menu-item >
            </template>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item  :index="firstM.fileUrl" :key="firstM.moduleId"  @click="goPage(firstM)">
          <!-- <i class="el-icon-folder"></i> -->
          <span slot="title" style="margin-left:20px">{{firstM.moduleLabel}}</span>
          <img style="float: right;margin-top:8px" src="./imgs/index_page.png"/>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
<script>
import {
  GetUserSystems,
  getUserAuth,
  addCollections,
  getCollections,
  deletCollections,
  commonList,
} from "../../api/index.home";
import { Message, Loading } from "element-ui";
import {getUrl} from "@/assets/js/commonAction";
export default {
  inject: ["reload"],
  name: "authMenu",
  props: {
    navColor: Object,
  },
  data() {
    return {
      collectionMenuList: [], //收藏夹
      menuList: [], //菜单
      defaultActive: "home",
      reloadFlag: true,
    };
  },
  watch: {
    $route: "getRouterName",
  },
  created  () {
    this.getRouterName();
    if (!sessionStorage.getItem("menuList")) {
      sessionStorage.setItem("token", this.$getUrl("auth_token"));
      sessionStorage.setItem("systemId", this.$getUrl("auth_systemId"));
      this.getMenu();
    } else {
      this.menuList = JSON.parse(sessionStorage.getItem("menuList"));
      this.getCollections();

    }
    // let a = JSON.parse(sessionStorage.getItem("menuList"));
    // this.run(a);
  },
  mounted() {},
  methods: {
    // run(list) {
    //   list.forEach((item) => {
    //     if (item.childAuthModuleList) {
    //       this.run(item.childAuthModuleList);
    //     } else {
    //       console.log(item.moduleLabel + ":" + item.fileUrl);
    //     }
    //   });
    // },
    delRouter(val) {
      this.$confirm("确认移除收藏？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = val.moduleCode;
          deletCollections(data).then((res) => {
            if (res.code == "success") {
              this.$message({
                type: "success",
                message: "移除成功!",
              });
              this.$nextTick(()=>{
                this.collectionMenuList.splice(
                    this.collectionMenuList.indexOf(val),
                    1
                );
                this.getCollections()
              })
            }
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消操作",
          // });
        });
    },
    renderMenuList(){
      if(this.menuList.length>0){
        let list = JSON.parse(JSON.stringify(this.menuList));
        list.forEach((one)=>{
          if(one.childAuthModuleList.length>0){
            one.childAuthModuleList.forEach((two)=>{
              if(two.childAuthModuleList.length>0){
                two.childAuthModuleList.forEach((three)=>{
                  for(let i=0;i<this.collectionMenuList.length;i++){
                    const collection = this.collectionMenuList[i];
                    three.starFlag = false;
                    if(three.moduleCode === collection.moduleCode){
                      three.starFlag = true;
                        break
                    }
                  }
                })
              }
            })
          }
        });
        this.menuList = list
      }
    },
    //获取收藏菜单
    getCollections() {
      getCollections()
        .then((res) => {
          if (res.code == "success") {
            res.data.map((item) => {
              if (
                this.collectionMenuList.findIndex(
                  (v) => v.fileUrl == JSON.parse(item.json).fileUrl
                ) == -1
              ) {
                this.collectionMenuList.push(JSON.parse(item.json));

              }
            });
            sessionStorage.setItem("showType",1);
            this.renderMenuList()
          }
        })
        .catch((e) => {
          if (e) {
            console.log("获取数据失败");
          }
        });
    },
    //收藏
    addRouter(val) {
      val.starFlag = true;
      let data = {
        moduleCode: val.moduleCode,
        moduleLabel: val.moduleLabel,
        url: val.fileUrl,
        json: JSON.stringify(val),
      };
      addCollections(data)
        .then((res) => {
          if (res.code == "success") {
            this.$message({
              showClose: true,
              message: "添加成功",
              type: "success",
            });
            this.getCollections();
          }
        })
        .catch((e) => {
          if (e) {
            console.log(e.message);
          }
        });
    },
    //获取菜单数据
    getMenu() {
      //使用Element loading-start 方法
      var loading = Loading.service({
        lock: true,
        text: "加载中...",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let data = {
        token:getUrl("ddToken") || sessionStorage.getItem("token") ,
        systemId: sessionStorage.getItem("systemId"),
      };
      getUserAuth(data)
        .then((res) => {
          if (res.code == "success") {
            this.menuList = res.data.userAuthDataList;
            loading.close();
            sessionStorage.setItem("menuList", JSON.stringify(this.menuList));
            sessionStorage.setItem("userName", res.data.userInfo.userName);
            this.$emit("userNameInit", res.data.userInfo.userName);
            let actionMap = {};
            this.treeEach(this.menuList, actionMap);
            sessionStorage.setItem("actionMap", JSON.stringify(actionMap));
              //进入首页获取预警信息权限
            sessionStorage.setItem("moduleCode",this.menuList[0].moduleCode);
            this.getCollections();
          }
        })
        .catch((e) => {
          if (e) {
            sessionStorage.clear();
            setTimeout(()=>{
              this.$router.replace({
                  path: "/login",
              })
            },3000);
          }
        });
    },
    treeEach(list, obj) {
      if (list) {
        //判断list是否为null
        list.forEach((item) => {
          let newList = [];
          if (item.authActionList) {
            item.authActionList.forEach((val) => {
              newList.push(val.actionCode);
            });
            obj[item.moduleCode] = newList;
          }
          if (JSON.stringify(item.childAuthModuleList) != "[]") {
            this.treeEach(item.childAuthModuleList, obj);
          }
        });
      }
    },
    getRouterName() {
      this.defaultActive = this.$route.meta.parentName || this.$route.name;
    },
    //tabs关联与路由跳转
    goPage(item) {
      sessionStorage.setItem("moduleCode", item.moduleCode);
      sessionStorage.setItem("mapAuthSql", item.mapAuthSql.mysql);
      let obj = {
        url: item.fileUrl,
        baseUrl: item.fileUrl,
        label: item.moduleLabel,
        moduleCode: item.moduleCode,
        params: {},
        query: {},
      };
      this.$store.commit("tabsListAdd", obj);
      this.$router.push({ name: item.fileUrl });
      let params = {
        url: item.fileUrl,
        moduleCode: item.moduleCode,
        moduleLabel: item.moduleLabel,
        json: JSON.stringify(item),
      };
      //记录用户点击菜单次数
      commonList(params)
        .then((res) => {
          if (res.code == "success") {
            console.log("记录中");
          }
        })
        .catch((e) => {
          if (e) {
            console.log(e.message);
          }
        });
    },
  },

};
</script>
<style lang="scss">
.el-icon-star-on{
  color: yellow !important;
}
.el-submenu {
  text-align: left;
}
.el-menu {
  border: 0;
}
.index .el-menu-item.is-active{
background-color: #626161;
}
</style>
