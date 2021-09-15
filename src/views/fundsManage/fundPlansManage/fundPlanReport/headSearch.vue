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
      <!-- 状态 -->
      <planStatus-select :planStatus.sync="planStatus"></planStatus-select>
      <el-col :span="5" class="el-col">
        <label>汇总方式</label>
        <el-select v-model="sumType" placeholder="请选择" class="el-inputs" size="small">
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
import planTypeSelect from "@/views/fundsManage/conponents/planTypeSelect";
import planStatusSelect from "@/views/fundsManage/conponents/planStatusSelect";
export default {
  name: "headSearch",
  components: {
    componySelect,
    departmentSelect,
    planStatusSelect,
    planTypeSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: [], //部门
      sumType: 1, // int(11) default null comment '汇总方式 ',
      planStatus: [], // int(11) default null comment '状态',
      planCirclePeriod: [], //计划周期
      planDate: [], // 计划日期
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      options: [
        { dict_key: 1, dict_value: "公司+支付货币金额" },
        { dict_key: 2, dict_value: "部门+支付货币金额" },
        { dict_key: 3, dict_value: "公司+购汇货币金额" },
        { dict_key: 4, dict_value: "部门+购汇货币金额" }
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
      this.planStatus = []; //状态
      this.sumType = 1; //汇总方式
      this.planCirclePeriod = []; //计划周期
      this.planDate = [];
    },
    postData() {
      let params = {
        companyCode: this.companyName.companyCode, //公司
        bbBranchBaseList: this.branchName, //部门
        planStatusList: this.planStatus, //状态
        sumType: this.sumType, //汇总方式
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
