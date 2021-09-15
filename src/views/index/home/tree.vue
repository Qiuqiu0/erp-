<!--
 * @Author: your name
 * @Date: 2021-02-22 15:28:08
 * @LastEditTime: 2021-04-29 09:51:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \zl-admin\src\views\tree\index.vue
-->
<template>
  <div id="tree-model">
  <div class="button">
    <el-button icon="el-icon-back" @click="back" size="small">返回</el-button>
  </div>
  <div v-for="(item, index) in treeList" :key="index">
    <tree v-if="treeList.length > 0" :bizCode="$route.query.bizCode" :treeList="item" :treeFirst="true"/>
  </div>
  </div>
</template>

<script>
import tree from "@/components/tree";
import { getTree } from "@/api/tree.js";
export default {
  name: "treeModel",
  data() {
    return {
      treeList: [],
      loading: false,
      bizCode:"" //监听路由参数
    };
  },
  components: {
    tree,
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
   getTree() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    getTree({
        bizCode: sessionStorage.getItem("bizCode"),
        bizType: sessionStorage.getItem("bizType"),
      })
        .then((res) => {
          if (res.code == "success") {
            this.treeList = res.data;
            loading.close();
          }
        })
        .catch((e) => {
          if (e) {
            console.log(e);
            loading.close();
          }
        });
    },
  },
  watch:{
    '$route'(){
      this.bizCode = this.$route.query.bizCode
    },
    bizCode(){
      this.treeList = [];
      this.getTree();
    }
  },
  created() {
  },
  mounted() {
    this.getTree();
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  #tree-model {
    height: 100%;
    width: auto;
    overflow-x: auto;
    .button {
      width: 100%;
      height: 25px;
      background: #d9e8fd;
      border: 1px solid #d2dae6;
      overflow: hidden;
      .el-button {
        width: auto;
        height: 24px;
        font-size: 12px;
        font-weight: 400;
        text-align: center;
        background: rgba(234, 236, 242, 0);
        border: none;
        color: #3e3f42;
        padding: 0 6px 0 5px;
        line-height: 25px;
        margin-left: 10px;
      }
      .el-button:hover {
        color: #3e3f42;
        border: none;
        background: rgba(234, 236, 242, 0);
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
      }
    }
  }
  #tree-model::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px #4159a8;
    background-color: rgba(65, 89, 168, 0.1);
  }
  #tree-model::-webkit-scrollbar {
    width: 0px;
    height: 12px;
    background-color: #f5f5f5;
  }
}
</style>
