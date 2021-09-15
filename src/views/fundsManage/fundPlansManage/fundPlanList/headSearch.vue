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
        :departmentList="departmentList"
      ></department-select>
      <el-col :span="5" class="el-col" style="height:24px;"></el-col>
      <el-col :span="5" class="el-col">
        <label>会计年度</label>
        <el-date-picker
          v-model="accountYear"
          class="el-inputs"
          value-format="yyyy"
          format="yyyy"
          align="right"
          size="small"
          type="year"
          placeholder="选择年"
        ></el-date-picker>
      </el-col>
      <accountMonth-select :isFilter="true" :accountMonth.sync="accountMonth"></accountMonth-select>
      <accountWeek-select :isFilter="true" :accountWeek.sync="accountWeek"></accountWeek-select>
      <!-- 状态 -->
      <planStatus-select :planStatus.sync="planStatus"></planStatus-select>
      <el-col :span="5" class="el-col">
        <label>资金计划编号</label>
        <el-input v-model="planCode" class="el-inputs" placeholder="请输入" size="small"></el-input>
      </el-col>
      <planType-select :labelName="'计划周期'" :planType.sync="planCirclePeriod"></planType-select>
      <el-col :span="5" class="el-col">
        <label>明细计划日期</label>
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
import accountMonthSelect from "@/views/fundsManage/conponents/accountMonthSelect";
import accountWeekSelect from "@/views/fundsManage/conponents/accountWeekSelect";
export default {
  name: "headSearch",
  components: {
    componySelect,
    departmentSelect,
    planStatusSelect,
    accountMonthSelect,
    accountWeekSelect,
    planTypeSelect
  },
  data() {
    return {
      departmentList:[],
      companyName: {}, //公司
      branchName: [], //部门
      planCirclePeriod: "", // int(11) default null comment '计划周期',
      planCode: "", // varchar(32) default null comment '资金计划编号',
      planStatus: [], // int(11) default null comment '状态',
      accountYear: "", // int(11) not null default '0' comment '会计年度',
      accountMonth: [], // int(11) not null default '0' comment '月份',
      accountWeek: [], // int(11) not null default '0' comment '周数',
      planDate: [],
      // planBegintime: "", // datetime default null comment '计划期间开始时间',
      // planEndtimie: "", // datetime default null comment '计划期间结束时间',
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      } // 日期设置对象
    };
  },
  created() {
    let data = this.$getQueryData(this);
    this.departmentList = data.branchName;
    this.accountMonth= data.accountMonthList; //月份
    this.accountWeek= data.accountWeekList; //周数
    this.planStatus= data.planStatusList; //状态
    this.planCirclePeriod= data.bbCirclePeriodList; //计划周期
if (data.planBegintime) {
      this.planDate[0] = data.planBegintime ? data.planBegintime : "";
      this.planDate[1] = data.planEndtime ? data.planEndtime : "";
    }
    this.postData();
  },
  methods: {
    inputShow() {
      this.show = this.$showOne(this.show);
      this.$parent.$forceUpdate();
    },
    clearNone() {
      this.companyName = {}; //公司
      this.branchName = []; //部门
      this.planDate = [];
      this.planCode = "";
      this.planStatus = []; // int(11) default null comment '状态',
      this.accountYear = ""; // int(11) not null default '0' comment '会计年度',
      this.accountMonth = []; // int(11) not null default '0' comment '月份',
      this.accountWeek = [];
      this.planCirclePeriod = "";
    },
    postData() {
      let params = {
        companyCode: this.companyName.companyCode, //公司
        bbBranchBaseList: this.branchName, //部门
        accountYear: this.accountYear, //会计年度
        accountMonthList: this.accountMonth, //月份
        accountWeekList: this.accountWeek, //周数
        planStatusList: this.planStatus, //状态
        planCode: this.planCode, //资金计划编号
        bbCirclePeriodList: this.planCirclePeriod //计划周期
      };
      if (this.planDate && this.planDate.length) {
        params.planBegintime = this.planDate[0];
        params.planEndtime = this.planDate[1];
      } else {
        params.planBegintime = "";
        params.planEndtime = "";
      }
      let data = params;
      data.companyName = this.companyName; //公司
      data.branchName = this.branchName; //部门
      this.$setQueryData(this, data);
      this.$emit("getSearchs", params);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>


</style>
