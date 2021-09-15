<template>
  <div class="index-div3 input-div" id="input-div">
    <!-- <p class="hide-input" v-if="show" @click="inputShow()">
      更多条件
      <i class="el-icon-caret-bottom"></i>
    </p>
    <p class="hide-input" v-else @click="inputShow()">
      收起
      <i class="el-icon-caret-top"></i>
    </p> -->
    <div class="search-div">
      <!--公司选择-->
      <compony-select :labelName="'公司名称'" :companyName.sync="companyName" class="el-col el-col-5"></compony-select>
      <!--部门选择-->
      <department-select
        class="el-col el-col-5"
        :labelName="'部门名称'"
        :branchName.sync="branchName"
        :companyName="companyName"
      ></department-select>
      <!-- 状态 -->
      <planStatus-select :planStatus.sync="planStatus"></planStatus-select>
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
import planStatusSelect from "@/views/fundsManage/conponents/planStatusSelect";
import planTypeSelect from "@/views/fundsManage/conponents/planTypeSelect";
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
      planStatus: [], // int(11) default null comment '状态',
      planCirclePeriod: [], //计划周期
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
  methods: {
    inputShow() {
      this.show = this.$showOne(this.show);
      this.$parent.$forceUpdate();
    },
    clearNone() {
      this.companyName = {}; //公司
      this.branchName = []; //部门
      this.planStatus = []; //状态
      this.planCirclePeriod = []; //计划周期
      this.planDate = [];
    },
    postData() {
      let params = {
        companyCode: this.companyName.companyCode, //公司
        bbBranchBaseList: this.branchName, //部门
        planStatusList: this.planStatus, //状态
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
