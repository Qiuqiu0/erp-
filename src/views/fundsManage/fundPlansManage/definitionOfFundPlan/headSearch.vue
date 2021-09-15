<template>
  <div class="index-div3 input-div" id="input-div">
    <!-- <p class="hide-input" v-if="show" @click="inputShow()">
      更多条件
      <i class="el-icon-caret-bottom"></i>
    </p>
    <p class="hide-input" v-else @click="inputShow()">
      收起
      <i class="el-icon-caret-top"></i>
    </p>-->
    <div class="search-div">
      <planType-select :labelName="'计划周期'" :planType.sync="planType"></planType-select>
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
      <el-col class="el-col el-col-btn"></el-col>
    </div>
  </div>
</template>
<script>
import planTypeSelect from "@/views/fundsManage/conponents/planTypeSelect";
import accountMonthSelect from "@/views/fundsManage/conponents/accountMonthSelect";
import accountWeekSelect from "@/views/fundsManage/conponents/accountWeekSelect";
export default {
  name: "headSearch",
  components: {
    planTypeSelect,
    accountMonthSelect,
    accountWeekSelect
  },
  data() {
    return {
      planType: [], //计划周期
      accountYear: "",
      accountMonth: [],
      accountWeek: [],
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true
    };
  },
  methods: {
    inputShow() {
      this.show = this.$showOne(this.show);
      this.$parent.$forceUpdate();
    },
    clearNone() {
      this.planType = [];
      this.accountYear = "";
      this.accountMonth = [];
      this.accountWeek = [];
    },
    postData() {
      let params = {
        planTypeList: this.planType,
        accountYear: this.accountYear,
        accountMonthList: this.accountMonth,
        accountWeekList: this.accountWeek
      };
      this.$emit("getSearchs", params);
    }
  },
  mounted() {}
};
</script>
