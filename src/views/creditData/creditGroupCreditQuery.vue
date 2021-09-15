<template>
  <div id="creditGroupCreditQuery">
    <!--操作按钮-->
    <div class="button-div">
      <el-button icon="el-icon-search" class="query-button" @click="queryData">查询</el-button>
      <el-button icon="el-icon-refresh" @click="resetData">重置</el-button>
    </div>
    <!--查询条件-->
    <div class="input-div">
      <el-row>
        <el-col :span="5" class="el-col">
          <label>公司</label>
          <el-input v-model="companyInfo.companyName" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span class="moreIcon" @click="companyPopup"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>部门</label>
          <el-input v-model="branchInfo.branchName" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span class="moreIcon" @click="branchPopup"><i class="el-icon-search"></i></span>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>信用账户组</label>
          <el-input v-model="creditGroupInfo.creditGroupName" class="el-inputs" placeholder="请选择" disabled></el-input>
          <span class="moreIcon" @click="creditGroupPopup"><i class="el-icon-search"></i></span>
        </el-col>
      </el-row>
    </div>
    <el-tabs class="el-tabs" type="card" v-model="currTab">
      <!--基本信息-->
      <el-tab-pane label="基本信息" name="basic">
        <el-table
          class="el-table basic-info"
          border
          center
          :show-header=false
          :row-class-name="setMainTitle"
          :span-method="mergeMainTitle"
          :data="basicData"
          v-loading="loading">
          <el-table-column prop="leftTitle" width="25%"></el-table-column>
          <el-table-column prop="leftValue" width="25%"></el-table-column>
          <el-table-column prop="rightTitle" width="25%"></el-table-column>
          <el-table-column prop="rightValue" width="25%"></el-table-column>
        </el-table>
      </el-tab-pane>
      <!--历史信用额度-->
      <el-tab-pane label="历史信用额度" name="history">
        <el-table
          class="el-table"
          border
          center
          :data="historyData"
          v-loading="loadingHistory">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column label="开始时间" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.grantBegintime | time2Date}}</span>
            </template>
          </el-table-column>
          <el-table-column label="截止时间" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.grantEndtime | time2Date}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="grantAmt" label="审批信用额度" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="申请日期" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.applyDate | time2Date}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createdName" label="创建人" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column label="创建时间" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.createdTime | time}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!--公司弹窗-->
    <company-select v-if="companyShow" :tipShow="companyShow" @tipsCancle="companyCancel" @tipsSure="companySure"></company-select>
    <!--部门弹窗-->
    <branch-select v-if="branchShow" :tipShow="branchShow" :data="companyInfo" @departmentCancle="branchCancel" @departmentSure="branchSure"></branch-select>
    <!--信用账户组弹窗-->
    <creditGroup-select :isShow="creditGroupShow" @callback="creditGroupSelectData"></creditGroup-select>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CreditApi from "@/api/creditData/creditGroup";
import companySelect from "@/components/componySelect";
import branchSelect from "@/components/departmentSelect";
import creditGroupSelect from "@/components/creditGroupSelect";
export default {
  name: "creditGroupCreditQuery",
  data() {
    return {
      currTab: "basic", //标签页
      //查询条件
      companyInfo: "",
      companyShow: false, //是否显示公司弹窗
      branchInfo: "",
      branchShow: false, //是否显示部门弹窗
      creditGroupInfo: "",
      creditGroupShow: false, //是否显示信用账户组弹窗
      //基本信息
      basicData: [
        {leftTitle: "基本信息"},
        {leftTitle: "客户", leftValue: "-"},
        {leftTitle: "公司", leftValue: "-", rightTitle: "部门", rightValue: "-"},
        {leftTitle: "信用额度信息"},
        {leftTitle: "客户信用额度总额", leftValue: "-"},
        {leftTitle: "剩余可用信用额度", leftValue: "-", rightTitle: "客户月初余额", rightValue: "-"},
        {leftTitle: "当前已占用信用额度", leftValue: "-", rightTitle: "客户当前余额", rightValue: "-"},
        {leftTitle: "其中增加占用", rightTitle: "减少余额"},
        {leftTitle: "出库单已创建未过账", leftValue: "-", rightTitle: "销售发票（蓝字）本月过账", rightValue: "-"},
        {leftTitle: "出库单已过账未开票", leftValue: "-", rightTitle: "收款单本月冲销", rightValue: "-"},
        {leftTitle: "销售发票已创建未过账", leftValue: "-", rightTitle: "退款单本月过账", rightValue: "-"},
        {leftTitle: "退款单未过账", leftValue: "-", rightTitle: "销售发票(退货）本月冲销", rightValue: "-"},
        {leftTitle: "其中冲减占用", rightTitle: "增加余额"},
        {leftTitle: "退货单已创建未过账", leftValue: "-", rightTitle: "销售发票（退货）本月过账", rightValue: "-"},
        {leftTitle: "退货单已过账未开票", leftValue: "-", rightTitle: "收款单本月过账", rightValue: "-"},
        {leftTitle: "销售发票（退货）未过账", leftValue: "-", rightTitle: "保证金转货款", rightValue: "-"},
        {leftTitle: "收款单未过账", leftValue: "-", rightTitle: "销售发票（蓝字）本月冲销", rightValue: "-"}
      ],
      loading: false,
      getNum: 0,
      creditTotal: "", //信用额度总额
      monthBalance: "", //月初余额
      leftTotal: "", //占用累积
      rightTotal: "", //余额累积
      //历史信用额度
      historyData: [],
      loadingHistory: false,
      navColor: {
        button: {
          backgroundColor: ""
        }
      }
    };
  },
  created() {},
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor = "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    //查询
    queryData() {
      if (this.companyInfo == "" || this.branchInfo == "") {
        this.$openWarning("请选择公司和部门");
        return false;
      }
      if (this.creditGroupInfo == "") {
        this.$openWarning("请选择信用账户组");
        return false;
      }
      let params = {
        companyCode: this.companyInfo.companyCode,
        orgCode: this.branchInfo.branchCode,
        groupCode: this.creditGroupInfo.creditGroupCode
      };
      this.loading = true;
      //信用额度总额
      CreditApi.creditGroupCreditQueryTotal(params).then(res => {
        if (res.code == "success") {
          this.creditTotal = res.data;
          this.basicData[4].leftValue = this.$toFixed(this.creditTotal, 2);
          this.getNum++;
          if (this.getNum == 4) {
            this.basicAndCalculate();
            this.loading = false;
            this.getNum = 0;
          }
        } else {
          this.$openWarning(res.message);
          this.getNum = 0;
        }
      }).catch(() => {
        this.getNum = 0;
      });
      //月初余额
      CreditApi.creditGroupCreditQueryBalance(params).then(res => {
        if (res.code == "success") {
          this.monthBalance = res.data;
          this.basicData[5].rightValue = this.$toFixed(this.monthBalance, 2);
          this.getNum++;
          if (this.getNum == 4) {
            this.basicAndCalculate();
            this.loading = false;
            this.getNum = 0;
          }
        } else {
          this.$openWarning(res.message);
          this.getNum = 0;
        }
      }).catch(() => {
        this.getNum = 0;
      });
      //增加占用和冲减占用
      CreditApi.creditGroupCreditQueryLeftPart(params).then(res => {
        if (res.code == "success") {
          let leftPart = res.data;
          this.leftTotal = leftPart.diffPm;
          this.basicData[6].leftValue = this.$toFixed(leftPart.diffPm, 2); //当前已占用信用额度
          this.basicData[8].leftValue = this.$toFixed(leftPart.plusOdDoAmt, 2);
          this.basicData[9].leftValue = this.$toFixed(leftPart.plusOdDoAmt1, 2);
          this.basicData[10].leftValue = this.$toFixed(leftPart.plusOdSoInvoiceAmt, 2);
          this.basicData[11].leftValue = this.$toFixed(leftPart.plusFiPaymentAmt, 2);
          this.basicData[13].leftValue = this.$toFixed(leftPart.minusOdUndoAmt1, 2);
          this.basicData[14].leftValue = this.$toFixed(leftPart.minusOdSoInvoiceAmt, 2);
          this.basicData[15].leftValue = this.$toFixed(leftPart.minusFiGatheringAmt, 2);
          this.basicData[16].leftValue = this.$toFixed(leftPart.minusOdUndoAmt, 2);
          this.getNum++;
          if (this.getNum == 4) {
            this.basicAndCalculate();
            this.loading = false;
            this.getNum = 0;
          }
        } else {
          this.$openWarning(res.message);
          this.getNum = 0;
        }
      }).catch(() => {
        this.getNum = 0;
      });
      //减少余额和增加余额
      CreditApi.creditGroupCreditQueryRightPart(params).then(res => {
        if (res.code == "success") {
          let rightPart = res.data;
          this.rightTotal = rightPart.diffIr;
          this.basicData[8].rightValue = this.$toFixed(rightPart.reductOdSoInvoiceBlueAmt, 2);
          this.basicData[9].rightValue = this.$toFixed(rightPart.reductFiGatheringAmt, 2);
          this.basicData[10].rightValue = this.$toFixed(rightPart.reductFiGatheringAmt1, 2);
          this.basicData[11].rightValue = this.$toFixed(rightPart.reductOdSoInvoiceRedAmt, 2);
          this.basicData[13].rightValue = this.$toFixed(rightPart.increOdSoInvoiceRedAmt, 2);
          this.basicData[14].rightValue = this.$toFixed(rightPart.increFiGatheringAmt, 2);
          this.basicData[15].rightValue = this.$toFixed(rightPart.increFiGatheringAmt1, 2);
          this.basicData[16].rightValue = this.$toFixed(rightPart.increOdSoInvoiceBlueAmt, 2);
          this.getNum++;
          if (this.getNum == 4) {
            this.basicAndCalculate();
            this.loading = false;
            this.getNum = 0;
          }
        } else {
          this.$openWarning(res.message);
          this.getNum = 0;
        }
      }).catch(() => {
        this.getNum = 0;
      });
      this.loadingHistory = true;
      //历史信用额度
      CreditApi.creditGroupCreditQueryHistory(params).then(res => {
        this.loadingHistory = false;
        if (res.code == "success") {
          this.historyData = res.data;
        } else {
          this.$openWarning(res.message);
        }
      }).catch(() => {
        this.loadingHistory = false;
      });
    },
    //查询结束后计算并添加剩余的值
    basicAndCalculate() {
      this.basicData[1].leftValue = this.creditGroupInfo.creditGroupName;
      this.basicData[2].leftValue = this.companyInfo.companyName;
      this.basicData[2].rightValue = this.branchInfo.branchName;
      //客户当前余额 = 月初余额 + 余额累积
      this.basicData[6].rightValue = this.$toFixed(this.monthBalance + this.rightTotal, 2);
      //剩余可用信用额度 = 信用额度总额 - 占用累积 + 客户当前余额（月初余额 + 余额累积）
      this.basicData[5].leftValue = this.$toFixed(this.creditTotal - this.leftTotal + (this.monthBalance + this.rightTotal), 2);
    },
    //重置
    resetData() {
      this.companyInfo = "";
      this.branchInfo = "";
      this.creditGroupInfo = "";
    },
    //公司弹窗
    companyPopup() {
      this.companyShow = true;
    },
    //公司弹窗关闭
    companyCancel() {
      this.companyShow = false;
    },
    //公司弹窗确定并传值
    companySure(e) {
      this.companyShow = false;
      this.companyInfo = e;
      this.branchInfo = "";
    },
    //部门弹窗
    branchPopup() {
      // if (this.companyInfo == "") {
      //   this.$openWarning("请先选择公司");
      //   return false;
      // }
      this.branchShow = true;
    },
    //部门弹窗关闭
    branchCancel() {
      this.branchShow = false;
    },
    //部门弹窗确定并传值
    branchSure(e) {
      this.branchShow = false;
      this.branchInfo = e;
    },
    //信用账户组弹窗
    creditGroupPopup() {
      this.creditGroupShow = true;
    },
    //信用账户组弹窗回调
    creditGroupSelectData(res) {
      if (res) {
        this.creditGroupInfo = res;
      }
      this.creditGroupShow = false;
    },
    //设置表格单行样式
    setMainTitle({row, rowIndex}) {
      if (rowIndex == 0 || rowIndex == 3 || rowIndex == 7 || rowIndex == 12) {
        return "main-title-row";
      }
      return "";
    },
    //合并单元格
    mergeMainTitle({row, column, rowIndex, columnIndex}) {
      if (rowIndex == 0 || rowIndex == 3) {
        if (columnIndex === 0) {
          return [1, 4];
        } else {
          return [0, 0];
        }
      }
      if (rowIndex == 7 || rowIndex == 12) {
        if (columnIndex === 0 || columnIndex === 2) {
          return [1, 2];
        } else {
          return [0, 0];
        }
      }
    }
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    }
  },
  components: {
    companySelect,
    branchSelect,
    creditGroupSelect
  }
};
</script>
<style lang="scss">
#creditGroupCreditQuery {
  .el-row {
    margin-left: 10px;
  }
  .el-col {
    position: relative;
    margin: 0;
    padding: 8px 0 10px 10px;
    .moreIcon {
      width: 70%;
      height: 24px;
      position: absolute;
      top: 10px;
      right: 0;
      padding: 4px 5px;
      cursor: pointer;
    }
  }
  .is-disabled {
    .el-input__inner {
      color: #666;
      cursor: pointer;
    }
  }
  label {
    display: inline-block;
    width: 30%;
    vertical-align: middle;
  }
  .el-inputs,
  .el-selects {
    width: 70%;
    .el-input__inner {
      width: 100%;
    }
  }
  .basic-info .el-table__body {
    width: 80% !important;
    tr {
      background-color: #fff;
    }
    tr.main-title-row {
      height: 30px;
      background-color: #efefef;
      font-weight: bolder;
    }
    tr:hover>td {
      background-color: initial !important;
    }
  }
}
</style>