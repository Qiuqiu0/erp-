<template>
  <div id="projectMaintenance" class="content-div2">
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="initData()" icon="el-icon-search">查询</el-button>
      <el-button @click="resetData()"  icon="el-icon-refresh">重置</el-button>
    </div>
    <div class="index-div3 auto-sibling">
        <!-- <p class="hide-input" v-if="show" @click="inputShow()">更多条件 <i class="el-icon-caret-bottom"></i></p>
        <p class="hide-input" v-else @click="inputShow()">收起<i class="el-icon-caret-top"></i></p> -->
      <div class="search-div">
        <el-col :span="5" class="el-col-5">
          <label>项目代码</label>
          <el-input
            size="small"
            v-model="projectCode"
            class="el-input"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col-5">
          <label>项目名称</label>
          <el-input
            size="small"
            v-model="projectName"
            class="el-input"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col-5">
          <label>项目类型</label>
          <el-select
            size="small"
            v-model="projectType"
            class="el-select"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="(item, index) in projectTypeList"
              :key="index"
              :label="item.dict_value"
              :value="item.dict_code"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col-5">
          <label>公司</label>
           <el-input v-model="company.companyName" class="el-inputs" size="small" placeholder="请选择" disabled></el-input>
          <span class='comicon' @click="componyTip"><i class="el-icon-search" ></i></span>
        </el-col>
        <!-- <el-col :span="5" class="el-col-5">
          <label>客户</label>
          <el-input  class="el-inputs" v-model="customerName.customerName" size="small" placeholder="请选择" disabled></el-input>
          <span class='comicon' @click="customerTips"><i class="el-icon-search" ></i></span>
        </el-col> -->
      </div>
    </div>
    <!-- 表格 -->
    <!--按钮样式-->
    <div class="button-div auto-sibling">
      <el-button @click="editProject(1)" v-if="$actionFlag(`F001`)" icon="el-icon-folder-add">创建</el-button>
      <el-button @click="editProject(2)" v-if="$actionFlag(`F002`)" icon="el-icon-edit">修改</el-button>
      <el-button @click="deleteProject()" v-if="$actionFlag(`F003`)" icon="el-icon-delete">删除</el-button>
      <el-button @click="updateSatus(0)" v-if="$actionFlag(`F004`)" icon="el-icon-unlock">启用</el-button>
      <el-button @click="updateSatus(1)" v-if="$actionFlag(`F005`)" icon="el-icon-lock">禁用</el-button>
      <el-button @click="editProject(3)" v-if="$actionFlag(`F006`)" icon="el-icon-data-line">查看</el-button>
    </div>
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        ref="multipleTable"
        :data="tableData"
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
        <el-table-column show-overflow-tooltip prop="projectCode" label="项目编号"> </el-table-column>
        <el-table-column show-overflow-tooltip prop="projectName" label="项目名称"> </el-table-column>
        <el-table-column show-overflow-tooltip prop="projectExplain" label="项目说明">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="typeName" label="项目类型"> </el-table-column>
        <el-table-column label="项目状态">
          <template slot-scope="scope">
            <span v-if="scope.row.isInactive == 0">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="companyName" label="公司"> </el-table-column>
        <!-- <el-table-column show-overflow-tooltip prop="customerName" label="客户"> </el-table-column> -->
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
    <!-- 选择公司弹窗 -->
    <compony-select v-if="componyShow" :tipShow='componyShow' @tipsCancle="tipsCancle" @tipsSure="tipsSure">
    </compony-select>
    <!--选择销售客户 -->
    <customer-select v-if="customerShow" :tipShow='customerShow'  @customerCancle="customerCancle" @customerSure="customerSure">
    </customer-select>
  </div>
</template>
<script>
import ExApi from "@/api/basicData/supplier";
import componySelect from "@/components/componySelect.vue";
import customerSelect from "@/components/customerSelect.vue";
export default {
  name: "projectMaintenance",
  data() {
    return {
      projectCode: "", //项目代码
      projectName: "", //项目名称
      projectTypeList: [], //项目类型
      projectType: "",
      company:``, //公司名称
      componyShow:false,
      customerShow:false,//客户弹窗
      customerName:``, //客户名称
      tableData: [], //表格数据
      pageSize: 100,
      pageNum: 1,
      total: 0,
      show: true, //查询条件显示
      selectioned: "", //选中
      loading: false
    };
  },
 created(){
   //查询条件
    this.$getQueryData(this);
    this.projectTypeData();
    this.initData();
  },
  components: {
    componySelect,
    customerSelect,
  },
  methods: {
    rowClick(row){
        this.$refs.multipleTable.toggleRowSelection(row);
    },
    //公司弹窗打开
    componyTip() {
        this.componyShow = true;
    },
    //公司弹窗关闭
    tipsCancle() {
        this.componyShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
        this.componyShow = false;
        this.company = e;
    },
    //销售客户弹窗
    customerTips(){
        this.customerShow = true;
    },
      //销售客户弹窗关闭
    customerCancle() {
        this.customerShow = false;
    },
    //销售客户弹窗确定获取数据
    customerSure(e) {
        this.customerShow = false;
        this.customerName = e;
    },
    //项目类型
    projectTypeData() {
      let data = {
        dictNo: 1005
      };
      ExApi.dicQuery(data)
        .then(res => {
          this.projectTypeList = res.data;
          this.initData();
        })
        .catch();
    },
    
    initData() {
      if (this.projectCode) {
        var projectCode = this.projectCode;
      }
      if (this.projectName) {
        var projectName = this.projectName;
      }
      if (this.projectType) {
        var projectType = this.projectType;
      }
      if (this.customerName.customerId) {
        var customerId = this.customerName.customerId;
      }
      if (this.company.companyId) {
        var companyId = this.company.companyId;
      }
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        projectCode: projectCode,
        projectName: projectName,
        companyId: companyId,
        customerId: customerId,
        projectType: projectType
      };
      //存查询条件
      let params=data;
      params.company=this.company;
      this.$setQueryData(this,params);
      this.loading = true;
      ExApi.projectList(data)
        .then(res => {
          if (res.code == "success") {
            this.tableData = res.data.list;
            this.total = res.data.total;
            let that=this;
            // this.$nextTick(() => {
              that.tableData.forEach(item => {
                //转换列表中的项目类型
                item.projectType=`${item.projectType}`;
                that.projectTypeList.map(item1 => {
                  if (item.projectType == item1.dict_code) {
                    item.typeName = item1.dict_value;
                    return item.typeName
                  }
                });
              });
              this.$forceUpdate();
            // })
            this.loading = false;
          } else {
            this.$openWarning(res.message);
          }
        })
        .catch();
    },
    //创建
    //创建
    editProject(type) {
      //type 1创建 2修改 3查看
      if (type == 2 || type == 3) {
        if (!this.selectioned.length) {
          // 判断selection是否有值存在
          this.$message({
            duration: 1000,
            showClose: true,
            message: "未选择数据",
            type: "warning"
          });
          return;
        }else if (this.selectioned.length>1){
          // 判断selection是否有值存在
          this.$openWarning("修改不能批量操作");
          return;
        }
        localStorage.setItem("projectId", this.selectioned[0].projectId);
      } else {
        localStorage.removeItem("projectId"); //移除所有的缓存数据
      }
      this.$router.push({
        //核心语句
        path: "/index/basicData/projectMaintenanceEdit", //跳转的路径
        query: { type: type }
      });
    },
    //删除
    deleteProject() {
      if (!this.selectioned.length) {
        // 判断selection是否有值存在
        this.$openWarning("请选择要操作的数据");
        return;
      }
      let  flag=false;
      this.selectioned.forEach(ele=>{
        if(ele.isInactive==0){
          flag=true;
          return;
        }
      })
      if(flag){
         this.$openWarning("只能删除禁用状态的数据");
          return;
      }
      let listParams = this.selectioned;
      this.$confirm("是否确定删除?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          ExApi.deleteProject(listParams)
            .then(res => {
              if (res.code == "success") {
                this.$openSuccess("删除成功");
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
    //启用或者禁用
    updateSatus(type) {//type 0 启用，1禁用
      if (!this.selectioned.length){
        // 判断selection是否有值存在
        this.$openWarning("请选择要操作的数据");
        return;
      }
      let title = type == 0 ? "是否确定启用？" : "是否确定禁用？";
      this.selectioned.forEach(ele=>{
        if(ele.isInactive!=type){
           ele.isInactive=type;
        }
      })
      this.$confirm(title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          ExApi.updateIsActive(this.selectioned)
            .then(res => {
              if (res.code == "success") {
                 if(type==1){
                   this.$openSuccess("禁用成功");
                 }else{
                   this.$openSuccess("启用成功");
                 }
               
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
    //重置
    resetData() {
      this.projectCode = "";
      this.projectName = "";
      this.projectType = "";
      this.company = ``;
      this.customerName =``;
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
    //表格选择
    handleChange(e) {
      this.selectioned = e;
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
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //双击到查看页面去
    dbClick(row) {
      localStorage.setItem("projectId",row.projectId);
      this.$router.push({
        //核心语句
        path: "/index/basicData/projectMaintenanceEdit", //跳转的路径
        query: { type:3}
      });
    },
  }
};
</script>

