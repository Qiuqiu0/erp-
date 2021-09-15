<template>
  <div id="materialProperties" class="content-div">
    <div class="button-div auto-sibling">
      <el-button class="query-button" icon="el-icon-search" @click="initData">查询</el-button>
      <el-button @click="resetData()" icon="el-icon-refresh">重置</el-button>
    </div>
    <div class="input-div auto-sibling">
      <div>
        <el-col :span="6" class="el-col" style="margin-left:2%;">
          <label style="width:34%">物料属性名称</label>
          <el-input
            v-model="propertiesName"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="6" class="el-col" style="margin-left:10%;">
         <label style="width:34%">物料属性状态</label>
         <el-select v-model="isInactive" @change="handleChangeStatus" placeholder="请选择" >
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
    </div>
    <!-- 表格 -->
    <!--按钮样式-->
    <div class="button-div auto-sibling">
      <el-button @click="addProperties(1)" v-if="$actionFlag(`F001`)" icon="el-icon-folder-add">创建</el-button>
      <el-button @click="addProperties(2)"  v-if="$actionFlag(`F002`)" icon="el-icon-edit">修改</el-button>
      <el-button @click="addProperties(3)"  v-if="$actionFlag(`F003`)" icon="el-icon-data-line">查看</el-button>
      <el-button @click="setData(2)"  v-if="$actionFlag(`F004`)" icon="el-icon-delete">删除</el-button>
      <el-button @click="setData(0)"  v-if="$actionFlag(`F005`)" icon="el-icon-unlock">启用</el-button>
      <el-button @click="setData(1)"  v-if="$actionFlag(`F006`)" icon="el-icon-lock">禁用</el-button>
    </div>
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
        class="el-table"
        v-loading="loading"
      >
        <el-table-column
          type="selection"
          width="45"
          align="center"
        ></el-table-column>

        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="specificationName" label="物料属性名称" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="description" label="物料属性说明" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="物料属性状态">
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
  name: "MaterialProperties",
  data() {
    return {
      stateList: [
        { value: 0, label: "启用" },
        { value: 1, label: "禁用" }
      ], //状态列表
      propertiesName: "", //属性名称，
       isInactive:'', //状态
      pageSize: 100,
      total: 0,
      pageNum: 1,
      selectioned: null, //表格选中项
      index: "", //选中的index
      tableData: [], //列表
      loading: false,
      show: true
    };
  },
  created() {
        //取查询条件
    this.$getQueryData(this);
    this.initData();
  },
  methods: {
     rowClick(row){
        this.$refs.table.toggleRowSelection(row);
    },
    //表格选择
    handleChange(e) {
      this.selectioned=e;
    },
    handleChangeStatus(value){
      this.isInactive=value;
    },
    inputShow() {
      this.show=this.$showOne(this.show);
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
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.initData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.initData();
    },

    //初始化列表
    initData() {
      this.loading = true;
      if (this.propertiesName) {
        var specificationName = this.propertiesName;
      }
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        specificationName: specificationName,
        isInactive: this.isInactive
      };
        //存查询条件
      let params=data;
      params.propertiesName=this.propertiesName;
      this.$setQueryData(this,params);
      api.querySpecificationInfoList(data).then(res => {
          if (res.code == "success") {
            this.loading = false;
            this.tableData = res.data;
            this.total = res.total;
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
    addProperties(type) {
      //type 1创建 2修改 //3查看
      if (type == 2 || type == 3) {
        if (this.selectioned.length==0) {
          // 判断selection是否有值存在
          this.$message({
            duration: 1000,
            showClose: true,
            message: "未选择数据",
            type: "warning"
          });
          return;
        }else if(this.selectioned.length>1){
          this.$openWarning("不能批量操作");
           return;
        }

        localStorage.setItem("specificationId", this.selectioned[0].specificationId);
      } else {
        localStorage.removeItem("specificationId"); //移除所有的缓存数据
      }
      this.$router.push({
        //核心语句
        path: "/index/productData/MaterialPropertiesAdd", //跳转的路径
        query: { type: type }
      });
    },

    setData(type) {
      // 2删除 0启用 1禁用
      if (this.selectioned.length==0) {
        // 判断selection是否有值存在
        this.$openWarning("未选择数据");
        return;
      }
      let url = "";
      let tips = "";
      if (type == 2) {
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
          //删除
          url = api.cancelSpecificationInfo;
          tips = "删除";
      } else if (type == 1) {
          url = api.stopSpecificationInfo;
          tips = "禁用";
      } else {
          url = api.enableSpecificationInfo;
          tips = "启用";
      }
      let data = {
        gdSpecificationInfoForms:this.selectioned
      };
      this.$confirm("是否确定" + tips + "?", tips + "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          url(data).then(res => {
              if (res.code == "success") {
                this.$openSuccess(res.message);
                this.initData();
              } else {
                this.$openWarning(res.message);
              }
            })
            .catch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //双击到查看页面去
    dbClick(row) {
      localStorage.setItem("specificationId",row.specificationId);
      this.$router.push({
        //核心语句
        path: "/index/productData/MaterialPropertiesAdd", //跳转的路径
        query: { type: 3 }
      });
    },
    //重置
    resetData() {
      this.isInactive = "";
      this.propertiesName = "";
    }
  }
};
</script>
<style lang="scss" scoped>

.input-div .el-col {
  text-align: center;
}
#materialProperties .el-dialog__header .el-dialog__title {
  font-size: 15px !important;
}
.input-div .el-col .el-inputs, .input-div .el-col .el-date-editor, .input-div .el-col .el-select{
  width: 66% !important;
}

</style>
