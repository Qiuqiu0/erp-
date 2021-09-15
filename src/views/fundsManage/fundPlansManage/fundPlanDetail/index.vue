<template>
  <div class="fundPlanDetail">
    <el-divider></el-divider>
    <div class="button-div auto-sibling">
      <el-button
        v-show="flag "
        class="query-button"
        icon="el-icon-suitcase"
        @click="saveDetail"
      >保存</el-button>
      <el-button @click="goBack" :icon="flag?'el-icon-close':'el-icon-back'">
        {{
        flag ? "取消" : "返回"
        }}
      </el-button>
    </div>
    <el-divider></el-divider>
    <!-- tab标签 -->
    <el-tabs class="el-tabs auto-sibling" v-model="activeName" type="card">
      <el-tab-pane label="基本信息" name="first" :style="navColor"></el-tab-pane>
      <el-tab-pane label="统计信息" name="third"></el-tab-pane>
    </el-tabs>
    <!-- tab内容 -->
    <div class="auto-sibling">
      <tab-con-first v-show="activeName == 'first'" @getData="getTopTabFirstData" ref="topTabFirst"></tab-con-first>
      <div v-show="activeName == 'third'" class="input-div" style="height:194px;">
        <el-col :span="5" class="el-col">
          <label>创建人</label>
          <el-input
            v-model="fiFinancialPlan.createdName"
            disabled
            class="el-inputs"
            size="small"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>创建日期</label>
          <el-date-picker
            class="el-inputs"
            size="mini"
            disabled
            v-model="fiFinancialPlan.createdTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>修改人</label>
          <el-input
            v-model="fiFinancialPlan.updatedName"
            disabled
            class="el-inputs"
            size="small"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>修改日期</label>
          <el-date-picker
            class="el-inputs"
            disabled
            size="mini"
            v-model="fiFinancialPlan.updatedTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>审批人</label>
          <el-input
            class="el-inputs"
            disabled
            size="mini"
            v-model="fiFinancialPlan.auditBy"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>审批日期</label>
          <el-date-picker
            class="el-inputs"
            disabled
            size="mini"
            v-model="fiFinancialPlan.auditTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col"></el-col>
        <el-col :span="5" class="el-col"></el-col>
        <el-col :span="5" class="el-col">
          <label>计划收款总额(本位币)</label>
          <el-input
            v-model="fiFinancialPlan.planReceiveAmtBase"
            disabled
            class="el-inputs"
            size="small"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>计划付款款总额(本位币)</label>
          <el-input
            v-model="fiFinancialPlan.planPaymentAmtBase"
            disabled
            class="el-inputs"
            size="small"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>计划差额总额(本位币)</label>
          <el-input
            v-model="fiFinancialPlan.planDifferenceAmtBase"
            disabled
            class="el-inputs"
            size="small"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col
          :span="20"
          class="el-col"
          style="text-align:left;padding-left:10px;padding-top:5px;padding-bottom:20px;height:64px;"
        >
          <label style="width: 12.8%;text-align:right;">审批意见</label>
          <el-input
            disabled
            style="width:45.4%!important;"
            v-model="fiFinancialPlan.approvalOpinion"
            class="el-inputs"
            size="small"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
          ></el-input>
        </el-col>
      </div>
    </div>
    <!-- 下部tab内容 -->
    <el-tabs class="el-tabs auto-sibling" v-model="handerOn" type="card">
      <el-tab-pane label="收付款明细" name="credit" :style="navColor" class="table-div"></el-tab-pane>
    </el-tabs>
    <bottom-table-first
      v-show="handerOn=='credit'"
      v-auto
      :fiFinancialPlan.sync="fiFinancialPlan"
      :fiFinancialPlanDetailList.sync="fiFinancialPlan.fiFinancialPlanDetailList"
      ref="tableDetail"
      @reload="reload"
      @getData="getTableDetailData"
    ></bottom-table-first>
  </div>
</template>
<script>
import tabConFirst from "./tabConFirst";
import bottomTableFirst from "./bottomTableFirst";
import { saveFundPlanDetail } from "@/api/fundPlansManage/fundPlanDetail";
export default {
  name: "fundPlanDetail",
  components: { tabConFirst, bottomTableFirst },
  data() {
    return {
      companyName: "",
      branchName: "",
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      activeName: "first",
      handerOn: "credit",
      loading: false,
      fiFinancialPlan: {}
    };
  },
  computed: {
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    id() {
      return this.$store.state.route.params.id;
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: "fundPlanList" });
    },
    getTopTabFirstData(data) {
      this.fiFinancialPlan = data;
      this.postData = JSON.parse(JSON.stringify(data));
    },
    //获取明细table
    getTableDetailData(data) {
      if (data.length > 0) {
        let postData = JSON.parse(JSON.stringify(data));
        postData.map((item, index) => {
          delete item["edit"];
          delete item["one"];
          item.rowno = (index + 1) * 10;
        });
        this.postData.fiFinancialPlanDetailList = postData;
      }
    },
    saveDetail() {
      if (!this.$refs.topTabFirst.postData()) return;
      if (!this.$refs.tableDetail.postData()) return;
      let params = { ...this.postData };
      saveFundPlanDetail(params).then(res => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({ name: "fundPlanList" });
        }
      });
    },
    reload(){
      this.$refs.topTabFirst.getDetail()
    }
  }
};
</script>
<style lang="scss" >
.fundPlanDetail {
  .input-div .el-col {
    margin: 8px 0 0 10px;
    height: 26px;
  }
  .input-div .el-col .el-input__icon {
    line-height: 25px;
  }
  .input-div label {
    width: 30%;
    vertical-align: middle;
  }
  .input-div .el-textarea__inner {
    border-color: #97999e !important;
  }
  .el-col {
    position: relative;
    .comicon {
      width: 170px;
      height: 20px;
      position: absolute;
      right: 6px;
      top: 7px;
      cursor: pointer;
    }
  }
  .table-div {
    width: 100%;
    overflow: hidden;
    background: #ffffff;
    text-align: left;
  }
  .input-div{
    .el-inputs,
    .el-select, 
    .el-date-editor{
      width: 52% ;
    }
    label{
      width:48%;
    }
  }
}
</style>
