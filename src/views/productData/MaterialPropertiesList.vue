<template>
  <div id="MaterialPropertiesList" class="content-div">
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="initList()" icon="el-icon-search">查询</el-button>
      <el-button @click="resetData()" icon="el-icon-refresh">重置</el-button>
    </div>
    <div class="input-div auto-sibling">
        <el-col :span="6" class="el-col">
          <label style="width:35%">物料属性组名称</label
          ><el-input
            v-model="specificationGroupName"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="6" class="el-col" style="margin-left:10%;">
         <label style="width:35%">物料属性状态</label>
         <el-select v-model="isInactive" @change=" handleChangeStatus" placeholder="请选择" >
            <el-option
                  v-for="item in stateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
            </el-select>
        </el-col>
    </div>
    <!--按钮样式-->
    <div class="button-div auto-sibling">
      <el-button @click="addPropertiesList(1)" v-if="$actionFlag(`F001`)" icon="el-icon-folder-add">新增</el-button>
      <el-button @click="addPropertiesList(2)" v-if="$actionFlag(`F002`)" icon="el-icon-edit">修改</el-button>
      <el-button @click="addPropertiesList(3)" v-if="$actionFlag(`F003`)" icon="el-icon-data-line">查看</el-button>
      <el-button @click="setData()" v-if="$actionFlag(`F004`)" icon="el-icon-delete">删除</el-button>
      <el-button @click="enableOrProhibit(0)" v-if="$actionFlag(`F005`)" icon="el-icon-unlock">启用</el-button>
      <el-button @click="enableOrProhibit(1)" v-if="$actionFlag(`F006`)" icon="el-icon-lock">禁用</el-button>
    </div>
    <!-- 表格 -->
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        :data="tableData"
        ref="table"
        height="calc(100% - 35px)"
        tooltip-effect="dark"
        @select-all="dialogCheck"
        @selection-change="handleChange"
         @row-dblclick="dbClick"
         @row-click="rowClick"
        v-loading="loading"
        class="el-table"
      >
        <el-table-column
          type="selection"
          width="45"
          align="center"
        ></el-table-column>
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <!-- <el-table-column prop="specificationGroupCode" label="物料属性组代码">
        </el-table-column> -->
        <el-table-column prop="specificationGroupName" label="物料属性组名称" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="description" label="物料属性组说明" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.isInactive == 0">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[100, 200, 300,500]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import api from "@/api/productData/productData";

export default {
  name: "MaterialPropertiesList",
  data() {
    return {
       stateList: [
        { value: 0, label: "启用" },
        { value: 1, label: "禁用" }
      ], //状态列表
      isInactive:'',
      specificationGroupName: "", //属性名称，
      pageSize: 100,
      pageNum: 1,
      total: 0,
      tableData: [], //列表
      loading: false,
      selectioned:[], //表格选中项
      show: true
    };
  },
  created() {
         //取查询条件
    this.$getQueryData(this);
    this.initList();
  },
  methods: {
    rowClick(row){
        this.$refs.table.toggleRowSelection(row);
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.initList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.initList();
    },
     handleChangeStatus(value){
      this.isInactive=value;
    },
    initList() {
      this.loading = true;
      if (this.specificationGroupName) {
        var specificationGroupName = this.specificationGroupName;
      }
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        specificationGroupName: specificationGroupName,
        isInactive: this.isInactive
      };
        //存查询条件
      this.$setQueryData(this,params);
      api
        .selectList(params)
        .then(res => {
          if (res.code == "success") {
            this.loading = false;
            this.tableData = res.data.list;
            this.total = res.data.total;
          } else {
            this.$message({
              duration: 1000,
              showClose: true,
              message: res.message,
              type: "error"
            });
          }
        })
        .catch();
    },

    //创建
    addPropertiesList(type) {
      //1新增  2修改 3//查看
      if (type == 2 || type == 3) {
        if (this.selectioned.length==0) {
          // 判断selection是否有值存在
          this.$openWarning("请选择要操作的数据");
          return;
        }else if(this.selectioned.length>1){
          this.$openWarning("不能批量操作");
           return;
        }

        localStorage.setItem("specificationGroupId", this.selectioned[0].specificationGroupId);
      } else {
        localStorage.removeItem("specificationGroupId"); //移除所有的缓存数据
      }
      this.$router.push({
        //核心语句
        path: "/index/productData/MaterialPropertiesListAdd", //跳转的路径
        query: { type: type }
      });
    },
    //重置
    resetData() {
      this.isInactive = "";
      this.specificationGroupName = "";
    },
    //删除
    setData() {
      if (this.selectioned.length==0) {
          // 判断selection是否有值存在
          this.$openWarning("请选择要操作的数据");
          return;
      }
      var flag=false;
      this.selectioned.forEach(ele=>{
        if(ele.isInactive==0){
          flag=true;
        }
      })
      if(flag){
         this.$openWarning("只能删除禁用状态的数据");
         return;
      }
      this.$confirm("是否确定删除?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          api.deleteGroup(this.selectioned).then(res => {
              if (res.code == "success") {
               this.$openSuccess(res.message);
                this.initList();
              } else {
                this.$openWarning(res.message);
              }
            }).catch();
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //启用或者禁用
    enableOrProhibit(type){
       if (this.selectioned.length==0) {
          // 判断selection是否有值存在
          this.$openWarning("请选择要操作的数据");
          return;
      }
      let title = type == 0 ? "是否确定启用？" : "是否确定禁用？";
      this.$confirm(title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          let url="";
          if(type==0){
            url=api.activeSpecificationGroup;
          }else{
            url=api.unactiveSpecificationGroup;
          }
         url(this.selectioned).then(res => {
              if (res.code == "success") {
               this.$openSuccess(res.message);
                this.initList();
              } else {
                this.$openWarning(res.message);
              }
            }).catch();
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    inputShow() {
      this.show=this.$showOne(this.show);
    },
    //表格选择
    handleChange(e) {
     this.selectioned =e;
    },
    //表格单选
    dialogCheck(selection, row) {
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned.push(row);
        this.index = this.tableData.indexOf(row);
        this.$refs.table.toggleRowSelection(row, true);
      }
    },
    //双击到查看页面去
    dbClick(row) {
      localStorage.setItem("specificationGroupId",row.specificationGroupId);
      this.$router.push({
        //核心语句
        path: "/index/productData/MaterialPropertiesListAdd", //跳转的路径
        query: { type: 3 }
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.index{
  .el-inputs,.el-date-editor,.el-select{
    width:64% !important;;
  }
}
.input-div .el-col {
  width: 26%;
  text-align: center;
}
.input-div .el-col .el-inputs, .input-div .el-col .el-date-editor, .input-div .el-col .el-select{
  width: 64% !important;
}

</style>
