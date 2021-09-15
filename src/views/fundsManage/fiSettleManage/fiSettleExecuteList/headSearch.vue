<template>
  <div class="index-div3 input-div" id="input-div">
    <p class="hide-input" v-if="show" @click="inputShow()">
      更多条件
      <i class="el-icon-caret-bottom"></i>
    </p>
    <p class="hide-input" v-else @click="inputShow()">
      收起
      <i class="el-icon-caret-top"></i>
    </p>
    <div class="search-div">
      <!--公司选择-->
      <compony-select class="el-col el-col-5" :companyName.sync="company" :labelName="'公司'"></compony-select>
      <!--部门选择-->
      <department-select
        class="el-col el-col-5"
        :branchName.sync="branch"
        :companyName="company"
        :labelName="'部门'"
        :departmentList="departmentList"
      ></department-select>
      <!-- 类型 -->
      <salesType-select :salesType.sync="salesType"></salesType-select>
      <executeType-select :executeType.sync="executeType"></executeType-select>
      <!-- 状态 -->
      <salesStatus-select :salesStatus.sync="execStatus" :filterStatus="1"></salesStatus-select>
      <el-col :span="5" class="el-col">
        <label>创建人</label>
        <el-input
          v-input-filter
          v-model="createdName"
          class="el-inputs"
          size="small"
          placeholder="请输入"
        ></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>创建日期</label>
        <el-date-picker
          style="width:70%"
          class="el-input-date"
          size="mini"
          v-model="createDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>申请单据编号</label>
        <el-input v-model="settleApplyCode" class="el-inputs" size="small" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="5" class="el-col">
        <label>执行编号</label>
        <el-input v-model="execNo" class="el-inputs" size="small" placeholder="请输入"></el-input>
      </el-col>
      <el-col class="el-col el-col-btn"></el-col>
    </div>
  </div>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect";
import staffSelect from "@/views/fundsManage/conponents/staffSelect";
import salesStatusSelect from "@/views/fundsManage/conponents/salesStatusSelect";
import salesTypeSelect from "@/views/fundsManage/conponents/salesTypeSelect";
import executeTypeSelect from "@/views/fundsManage/conponents/executeTypeSelect";
export default {
  name: "headSearch",
  components: {
    componySelect,
    departmentSelect,
    staffSelect,
    salesStatusSelect,
    salesTypeSelect,
    executeTypeSelect
  },
  data() {
    return {
      departmentList:[],
      company: {}, //公司
      branch: [], //部门
      createdName: "", //创建人
      settleApplyCode: "", //	申请单据编号
      salesType: "", //类型	int [e字典Int8]			y		类型
      executeType: [], //执行类型
      execStatus: [], //状态	int [e字典Int8]			y		状态
      execNo: "", //执行编号	varchar(32) [e描述_32]			y		执行编号
      createDate: [], //创建日期
      show: true
    };
  },
  created() {
    let data = this.$getQueryData(this);
    this.departmentList = data.branch;
    this.executeType=data.executeTypeList;
    this.execStatus=data.execStatusList;
    if (data.startCreatedTime) {
      this.createDate[0] = data.startCreatedTime ? data.startCreatedTime : "";
      this.createDate[1] = data.endCreatedTime ? data.endCreatedTime : "";
    }
    this.postData();
  },
  methods: {
    inputShow() {
      this.show = this.$showOne(this.show);
      this.$parent.$forceUpdate();
    },
    clearNone() {
      this.company = {}; //公司
      this.branch = []; //部门
      this.createdName = ""; //创建人
      this.settleApplyCode = ""; //	申请单据编号
      this.salesType = ""; //类型	int [e字典Int8]			y		类型
      this.executeType = []; //执行类型
      this.execStatus = []; //状态	int [e字典Int8]			y		状态
      this.execNo = ""; //执行编号	varchar(32) [e描述_32]			y		执行编号
      this.createDate = []; //创建日期
    },
    postData() {
      if (this.createDate && this.createDate.length) {
        if (this.createDate[0] && this.createDate[1]) {
          var startCreatedTime = this.createDate[0] + "T00:00:00.000Z";
          var endCreatedTime = this.createDate[1] + "T23:59:59.000Z";
        }
      }
      let params = {
        companyCode: this.company.companyCode, //公司
        bbBranchBaseList: this.branch, //部门
        settleApplyCode: this.settleApplyCode, //申请单据编号
        salesType: this.salesType, //类型	int [e字典Int8]			y		类型
        executeTypeList: this.executeType, //执行类型	int [e字典Int8]			y		执行类型
        execStatusList: this.execStatus, //状态	int [e字典Int8]			y		状态
        execNo: this.execNo, //执行编号	varchar(32) [e描述_32]			y		执行编号
        createdName: this.createdName, //创建人
        startCreatedTime: startCreatedTime ? startCreatedTime : "",
        endCreatedTime: endCreatedTime ? endCreatedTime : ""
      };
      // if (this.createDate.length) {
      //   params.startCreatedTime = this.createDate[0];
      //   params.endCreatedTime = this.createDate[1];
      // } else {
      //   params.startCreatedTime = "";
      //   params.endCreatedTime = "";
      // }
      let data = params;
      data.company = this.company; //公司
      data.branch = this.branch; //部门
      this.$setQueryData(this, data);
      this.$emit("getSearchs", params);
    }
  },
  mounted() {}
};
</script>
