<template>
  <el-form
    :disabled="flag===0||fiFinancialPlan.fiFinancialPlanDetailList.length>0"
    class="tabConFirst"
  >
    <div class="input-div">
      <!--公司选择-->
      <compony-select
        required
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('companyName') ? 'inputRed' : ''"
        :companyName.sync="companyName"
        :ztz="0"
        name="companyId"
      ></compony-select>
      <el-col :span="5" class="el-col"></el-col>
      <!--部门选择-->
      <department-select
        class="el-col el-col-5 el-col-required"
        :class="errorKey.includes('branchName') ? 'inputRed' : ''"
        required
        :branchName.sync="branchName"
        :departztz="0"
        :companyName="companyName"
      ></department-select>
      <el-col :span="5" class="el-col"></el-col>
      <!-- 计划周期 -->
      <planType-select
      class="el-col-required"
      :class="errorKey.includes('planCirclePeriod') ? 'inputRed' : ''"
        required
        :labelName="'计划周期'"
        :planType.sync="fiFinancialPlan.planCirclePeriod"
        @change="planCirclePeriodChangeHandler"
      ></planType-select>
      <el-col :span="5" class="el-col">
        <label>计划编号</label>
        <el-input
          v-model="fiFinancialPlan.planCode"
          class="el-inputs"
          size="small"
          disabled
          placeholder="请输入"
        ></el-input>
      </el-col>
      <!-- 状态 -->
      <planStatus-select :disable="true" :planStatus.sync="fiFinancialPlan.planStatus"></planStatus-select>
      <el-col :span="5" class="el-col"></el-col>
      <el-col :span="5" class="el-col el-col-required">
        <label required>会计年度</label>
        <el-date-picker
        :class="errorKey.includes('accountYear') ? 'inputRed' : ''"
          v-model="fiFinancialPlan.accountYear"
          :disabled="fiFinancialPlan.planCirclePeriod==''"
          @change="accountYearChangeHandler"
          class="el-inputs"
          value-format="yyyy"
          format="yyyy"
          align="right"
          size="small"
          type="year"
          placeholder="选择年"
        ></el-date-picker>
      </el-col>
      <accountMonth-select
        :isFilter="true"
        :disable="fiFinancialPlan.planCirclePeriod==11510005||fiFinancialPlan.planCirclePeriod==''"
        :accountMonth.sync="fiFinancialPlan.accountMonth"
        @change="accountMonthChangeHander"
      ></accountMonth-select>
      <accountWeek-select
        :isFilter="true"
        :disable="fiFinancialPlan.planCirclePeriod!==11510015"
        @change="accountWeekChangeHandler"
        :accountWeek.sync="fiFinancialPlan.accountWeek"
      ></accountWeek-select>
      <el-col :span="10" class="el-col el-col-required" style="width:48.8%">
        <label required style="width: 15%!important;">计划区间</label>
        <el-date-picker
          class="el-inputs"
          :class="errorKey.includes('planBegintime') ? 'inputRed' : ''"
          style="width: 34%!important;"
          size="mini"
          disabled
          v-model="fiFinancialPlan.planBegintime"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
        <label style="width: 17%;">至：</label>
        <el-date-picker
          class="el-inputs"
          :class="errorKey.includes('planEndtime') ? 'inputRed' : ''"
          size="mini"
          disabled
          style="width: 34%!important;"
          v-model="fiFinancialPlan.planEndtime"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col
        :span="20"
        class="el-col"
        style="text-align:left;padding-left:10px;padding-bottom:20px;height:64px;"
      >
        <label style="width: 7.8%;text-align:right;">备注</label>
        <el-input
          style="width:50.4%!important;"
          v-model="fiFinancialPlan.remark"
          class="el-inputs"
          size="small"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
        ></el-input>
      </el-col>
      <el-col class="el-col el-col-btn"></el-col>
    </div>
  </el-form>
</template>
<script>
import componySelect from "@/views/fundsManage/conponents/componySelect";
import departmentSelect from "@/views/fundsManage/conponents/departmentSelect2";
import planTypeSelect from "@/views/fundsManage/conponents/planTypeSelect2";
import planStatusSelect from "@/views/fundsManage/conponents/planStatusSelect2";
import accountMonthSelect from "@/views/fundsManage/conponents/accountMonthSelect2";
import accountWeekSelect from "@/views/fundsManage/conponents/accountWeekSelect2";
import {
  getFundPlanDetail,
  getdefinePlan
} from "@/api/fundPlansManage/fundPlanDetail";
export default {
  name: "tabConFirst",
  components: {
    componySelect,
    departmentSelect,
    planTypeSelect,
    planStatusSelect,
    accountMonthSelect,
    accountWeekSelect
  },
  data() {
    return {
      companyName: {}, //公司
      branchName: {}, //部门
      fiFinancialPlan: {
        planId: "", // varchar(32) not null comment 'id',
        companyId: "", // varchar(32) default null comment '公司id',
        companyCode: "", // varchar(64) default null comment '公司编码',
        companyName: "", // varchar(128) default null comment '公司名称',
        orgId: "", // varchar(32) default null comment '组织id',
        orgCode: "", // varchar(64) default null comment '组织编码',
        orgName: "", // varchar(128) default null comment '组织名称',
        planCirclePeriod: "", // int(11) default null comment '计划周期',
        planCode: "", // varchar(32) default null comment '资金计划编号',
        planStatus: "", // int(11) default null comment '状态',
        accountYear: "", // int(11) not null default '0' comment '会计年度',
        accountMonth: "", // int(11) not null default '0' comment '月份',
        accountWeek: "", // int(11) not null default '0' comment '周数',
        planBegintime: "", // datetime default null comment '计划期间开始时间',
        planEndtime: "", // datetime default null comment '计划期间结束时间',
        remark: "", // varchar(512) default null comment '备注',
        isInactive: "", // int(11) default '0' comment '是否停用，0表示激活状态，1表示停用，2表示作废',
        createdBy: "", // varchar(32) default null comment '创建者',
        createdName: "", // varchar(64) default null comment '创建者名称',
        createdTime: "", // datetime default null comment '创建时间',
        updatedBy: "", // varchar(32) default null comment '更新者',
        updatedName: "", // varchar(64) default null comment '更新者名称',
        updatedTime: "", // datetime default null comment '更新时间',
        version: "", // int(11) not null default '0' comment '数据版本',
        auditTime: "", // datetime DEFAULT NULL COMMENT '审批时间',
        approvalOpinion: "", // varchar(512) default null comment '审批意见',
        planReceiveAmtBase: "", // decimal(20,6) default null comment '计划收款总额(本位币)',
        planPaymentAmtBase: "", // decimal(20,6) default null comment '计划付款款总额(本位币)',
        planDifferenceAmtBase: "", // decimal(20,6) default null comment '计划差额总额(本位币)',
        fiFinancialPlanDetailList: [] //明细
      },
      errorKey:[]
    };
  },
  methods: {
    //获取结售汇申请抬头
    getDetail() {
      let self = this;
      if (self.id == 0) {
        return;
      }
      getFundPlanDetail({ planId: this.id }).then(res => {
        if (res.code === "success") {
          self.companyName = {
            companyId: res.data.companyId,
            companyCode: res.data.companyCode,
            companyName: res.data.companyName
          };
          self.branchName = {
            orgId: res.data.orgId,
            orgCode: res.data.orgCode,
            orgName: res.data.orgName
          };
          self.fiFinancialPlan = res.data;
          self.fiFinancialPlan.accountYear =
            "" + self.fiFinancialPlan.accountYear;
          self.$emit("getData", this.fiFinancialPlan);
        }
      });
    },
    postData() {
      const { ...Obj } = {
        ...this.companyName,
        ...this.branchName
      };
      [
        "companyId",
        "companyCode",
        "companyName",
        "orgId",
        "orgName",
        "orgCode"
      ].forEach(ele => {
        this.fiFinancialPlan[ele] = Obj[ele]
          ? Obj[ele]
          : this.fiFinancialPlan[ele];
      });
      // let eleNameObj = {
      //   companyId: "公司",
      //   orgId: "部门",
      //   planCirclePeriod: "计划周期",
      //   accountYear: "会计年度",
      //   planBegintime: "计划区间开始",
      //   planEndtime: "计划区间结束"
      // };
      // if (this.$validateObj(this.fiFinancialPlan, eleNameObj)) {
      //   this.$emit("getData", this.fiFinancialPlan);
      //   return true;
      // } else {
      //   return false;
      // }
       this.errorKey = [];
      if (!Object.keys(this.companyName).length) {
        this.errorKey.push('companyName');
      }
      if (!Object.keys(this.branchName).length) {
        this.errorKey.push('branchName');
      }
      if (this.fiFinancialPlan.planCirclePeriod=='') {
        this.errorKey.push('planCirclePeriod');
      }
      if(this.fiFinancialPlan.accountYear==''){
        this.errorKey.push('accountYear');
      }
      if(this.fiFinancialPlan.planBegintime==''){
        this.errorKey.push('planBegintime');
      }
      if(this.fiFinancialPlan.planEndtime=='' ){
        this.errorKey.push('planEndtime');
      }
      if(this.errorKey.length > 0) {
        this.$openWarning(`必填信息请填完整`);
        return false
      }else{
        this.$emit("getData", this.fiFinancialPlan);
        return true;
      }

    },
    getData() {
      const { ...Obj } = {
        ...this.companyName,
        ...this.branchName
      };
      [
        "companyId",
        "companyCode",
        "companyName",
        "orgId",
        "orgName",
        "orgCode"
      ].forEach(ele => {
        this.fiFinancialPlan[ele] = Obj[ele]
          ? Obj[ele]
          : this.fiFinancialPlan[ele];
      });
      let eleNameObj = {
        companyId: "公司",
        orgId: "部门",
        planCirclePeriod: "计划周期",
        accountYear: "会计年度",
        planBegintime: "计划区间开始",
        planEndtime: "计划区间结束"
      };
      if (this.$validateObj(this.fiFinancialPlan, eleNameObj)) {
        this.$emit("getData", this.fiFinancialPlan);
        return true;
      } else {
        return false;
      }
    },
    planCirclePeriodChangeHandler() {
      let template = this.fiFinancialPlan;
      template.accountYear = "";
      template.accountMonth = "";
      template.planBegintime = "";
      template.planEndtime = "";
    },
    accountYearChangeHandler(value) {
      if (value && this.fiFinancialPlan.planCirclePeriod === 11510005) {
        getdefinePlan({
          planType: this.fiFinancialPlan.planCirclePeriod,
          accountYear: value
        }).then(res => {
          if (res.code === "success") {
            this.fiFinancialPlan.planBegintime = res.data.beginTime;
            this.fiFinancialPlan.planEndtime = res.data.endTime;
          }
        });
      } else {
        this.fiFinancialPlan.planBegintime = "";
        this.fiFinancialPlan.planEndtime = "";
      }
    },
    accountMonthChangeHander(value) {
      let template = this.fiFinancialPlan;
      if (!template.accountYear) {
        this.$message({ message: "请选择年份先", type: "warning" });
        template.accountMonth = "";
        return;
      }
      if (value && template.planCirclePeriod === 11510010) {
        getdefinePlan({
          planType: template.planCirclePeriod,
          accountYear: template.accountYear,
          accountMonth: value
        }).then(res => {
          if (res.code === "success") {
            template.planBegintime = res.data.beginTime;
            template.planEndtime = res.data.endTime;
          }
        });
      } else {
        template.planBegintime = "";
        template.planEndtime = "";
      }
    },
    accountWeekChangeHandler(value) {
      let template = this.fiFinancialPlan;
      if (!template.accountYear) {
        this.$message({ message: "请选择年份先", type: "warning" });
        template.accountWeek = "";
        return;
      }
      if (!template.accountMonth) {
        this.$message({ message: "请选择月份先", type: "warning" });
        template.accountWeek = "";
        return;
      }
      if (value && template.planCirclePeriod === 11510015) {
        getdefinePlan({
          planType: template.planCirclePeriod,
          accountYear: template.accountYear,
          accountMonth: template.accountMonth,
          accountWeek: value
        }).then(res => {
          if (res.code === "success") {
            template.planBegintime = res.data.beginTime;
            template.planEndtime = res.data.endTime;
          }
        });
      } else {
        template.planBegintime = "";
        template.planEndtime = "";
      }
    }
  },
  computed: {
    id() {
      return this.$store.state.route.params.id;
    },
    flag() {
      return this.$store.state.route.params.editFlag;
    }
  },
  mounted() {
    this.getDetail();
  }
};
</script>
<style lang="scss">
// .index .el-col-required .el-input.is-disabled .el-input__inner{
//   background-color: #d9e8fd !important;
// }
</style>
