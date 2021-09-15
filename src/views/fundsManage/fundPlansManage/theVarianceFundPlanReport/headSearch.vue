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
      <compony-select :labelName="'公司名称'" :companyName.sync="companyName" class="el-col el-col-5"></compony-select>
      <el-col :span="5" class="el-col" style="height:24px;"></el-col>
      <!--部门选择-->
      <department-select
        class="el-col el-col-5"
        :labelName="'部门名称'"
        :branchName.sync="branchName"
        :companyName="companyName"
      ></department-select>
      <el-col :span="5" class="el-col" style="height:24px;"></el-col>
      <incomeType-select :incomeType.sync="incomeType"></incomeType-select>
      <!-- 状态 -->
      <planStatus-select :planStatus.sync="planStatus"></planStatus-select>
      <!--往来单位选择-->
      <interactiveCompany-select
        :interactiveCompany.sync="interactiveCompany"
        class="el-col el-col-5"
        :isSupplier="incomeType===11560010"
      ></interactiveCompany-select>
      <el-col :span="5" class="el-col">
        <label>报表维度</label>
        <el-select v-model="reportDimensionality" placeholder="请选择" class="el-inputs" size="small">
          <el-option
            v-for="item in options"
            :key="item.dict_key"
            :label="item.dict_value"
            :value="item.dict_key"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-col>
      <planType-select :labelName="'计划周期'" :planType.sync="planCirclePeriod"></planType-select>
      <el-col :span="5" class="el-col">
        <label>计划日期</label>
        <el-date-picker
          style="width:70%"
          class="el-input-date"
          size="mini"
          v-model="planDate"
          format="yyyy-MM-dd"
    
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col class="el-col el-col-btn"></el-col>
    </div>
  </div>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect";
import interactiveCompanySelect from "@/views/fundsManage/conponents/interactiveCompanySelect";
import incomeTypeSelect from "@/views/fundsManage/conponents/incomeTypeSelect";
import planTypeSelect from "@/views/fundsManage/conponents/planTypeSelect";
import planStatusSelect from "@/views/fundsManage/conponents/planStatusSelect";
export default {
  name: "headSearch",
  components: {
    componySelect,
    departmentSelect,
    interactiveCompanySelect,
    planTypeSelect,
    planStatusSelect,
    incomeTypeSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: [], //部门
      interactiveCompany: {}, // 往来单位
      incomeType: "", //收入类型
      planStatus: [], // int(11) default null comment '状态',
      reportDimensionality: 1, // int(11) default null comment '报表维度',
      planCirclePeriod: [], //计划周期
      planDate: [], // 计划日期
      // planBegintime: "", // datetime default null comment '计划期间开始时间',
      // planEndtimie: "", // datetime default null comment '计划期间结束时间',
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      options: [
        { dict_key: 1, dict_value: "部门维度" },
        { dict_key: 2, dict_value: "往来单位维度" }
      ],
      show: true
    };
  },
  methods: {
    inputShow() {
      this.show = this.$showOne(this.show);
      this.$parent.$forceUpdate();
    },
    clearNone() {
      this.companyName = {}; //公司
      this.branchName = []; //部门
      this.interactiveCompany = {}; //往来单位
      this.incomeType = ""; //收入类型
      this.planStatus = []; //状态
      this.reportDimensionality = 1; //报表维度
      this.planCirclePeriod = []; //计划周期
      this.planDate = [];
    },
    postData() {
      let params = {
        companyCode: this.companyName.companyCode, //公司
        bbBranchBaseList: this.branchName, //部门
        interactiveCompanyCode: this.interactiveCompany.interactiveCompanyCode, // 往来单位
        incomeType: this.incomeType, //收入类型
        planStatusList: this.planStatus, //状态
        reportDimensionality: this.reportDimensionality, //报表维度
        planCirclePeriodList: this.planCirclePeriod //计划周期
      };
      if (this.planDate&&this.planDate.length) {
        params.planBegintime = this.planDate[0];
        params.planEndtime = this.planDate[1];
      } else {
        params.planBegintime = "";
        params.planEndtime = "";
      }
      this.$emit("getSearchs", params);
    }
  },
  mounted() {}
};
</script>
