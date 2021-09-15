<template>
  <div id="supplierCreditQuery">
    <!--操作按钮-->
    <div class="button-div">
      <el-button icon="el-icon-back" @click="goBack">返回</el-button>
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
              <span>{{scope.row.creditBegintime | time2Date}}</span>
            </template>
          </el-table-column>
          <el-table-column label="截止时间" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.creditEndtime | time2Date}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="creditAmt" label="审批信用额度" min-width="120" show-overflow-tooltip></el-table-column>
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
  </div>
</template>
<script>
import { mapState } from "vuex";
import CreditApi from "@/api/creditData/credit";
export default {
  name: "supplierCreditQueryButton",
  data() {
    return {
      currTab: "basic", //标签页
      //查询条件
      companyInfo: "",
      branchInfo: "",
      supplierInfo: "",
      //基本信息
      basicData: [
        {leftTitle: "基本信息"},
        {leftTitle: "供应商", leftValue: "-"},
        {leftTitle: "公司", leftValue: "-", rightTitle: "部门", rightValue: "-"},
        {leftTitle: "信用额度信息"},
        {leftTitle: "供应商信用额度总额", leftValue: "-"},
        {leftTitle: "剩余可用信用额度", leftValue: "-", rightTitle: "供应商月初余额", rightValue: "-"},
        {leftTitle: "当前已占用信用额度", leftValue: "-", rightTitle: "供应商当前余额", rightValue: "-"},
        {leftTitle: "其中增加占用", rightTitle: "减少余额"},
        {leftTitle: "付款单未过账", leftValue: "-", rightTitle: "付款单本月过账", rightValue: "-"},
        {leftTitle: "付款申请单已创建未付款", leftValue: "-", rightTitle: "采购发票（红字，负向调差）本月过账", rightValue: "-"},
        {leftTitle: "采购退货单已创建未开票", leftValue: "-", rightTitle: "采购发票（发票，正向调差）本月冲销", rightValue: "-"},
        {leftTitle: "采购发票（红字，负向调差）已创建未过账", leftValue: "-", rightTitle: "收款单本月冲销", rightValue: "-"},
        {leftTitle: "其中冲减占用", rightTitle: "增加余额"},
        {leftTitle: "提单已审核未入库", leftValue: "-", rightTitle: "采购发票（发票，正向调差）本月过账", rightValue: "-"},
        {leftTitle: "入库单已创建未开票", leftValue: "-", rightTitle: "采购发票（红字，负向调差）本月冲销", rightValue: "-"},
        {leftTitle: "采购发票（发票，正向调差）未过账", leftValue: "-", rightTitle: "付款单本月冲销", rightValue: "-"},
        {leftTitle: "收款单未过账", leftValue: "-", rightTitle: "收款单本月过账", rightValue: "-"}
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
  created() {
    let baseInfo = JSON.parse(sessionStorage.getItem("supplierCredit"));
    this.companyInfo = {
      companyCode: baseInfo.companyCode,
      companyName: baseInfo.companyName
    };
    this.branchInfo = {
      branchCode: baseInfo.branchCode,
      branchName: baseInfo.branchName
    };
    this.supplierInfo = {
      supplierCode: baseInfo.supplierCode,
      supplierName: baseInfo.supplierName
    };
    this.queryData();
  },
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
      let params = {
        companyCode: this.companyInfo.companyCode,
        orgCode: this.branchInfo.branchCode,
        supplierCode: this.supplierInfo.supplierCode
      };
      this.loading = true;
      //信用额度总额
      CreditApi.supplierCreditQueryTotal(params).then(res => {
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
      CreditApi.supplierCreditQueryBalance(params).then(res => {
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
      CreditApi.supplierCreditQueryLeftPart(params).then(res => {
        if (res.code == "success") {
          let leftPart = res.data;
          this.leftTotal = leftPart.diffPm;
          this.basicData[6].leftValue = this.$toFixed(leftPart.diffPm, 2); //当前已占用信用额度
          this.basicData[8].leftValue = this.$toFixed(leftPart.plusPaymentAmt, 2);
          this.basicData[9].leftValue = this.$toFixed(leftPart.plusPayApplyAmt, 2);
          this.basicData[10].leftValue = this.$toFixed(leftPart.plusOdUnwvAmt, 2);
          this.basicData[11].leftValue = this.$toFixed(leftPart.plusOdPoInvoiceAmt, 2);
          this.basicData[13].leftValue = this.$toFixed(leftPart.minusOdBlAmt, 2);
          this.basicData[14].leftValue = this.$toFixed(leftPart.minusOdWvAmt, 2);
          this.basicData[15].leftValue = this.$toFixed(leftPart.minusOdPoInvoiceAmt, 2);
          this.basicData[16].leftValue = this.$toFixed(leftPart.minusFiGatheringAmt, 2);
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
      CreditApi.supplierCreditQueryRightPart(params).then(res => {
        if (res.code == "success") {
          let rightPart = res.data;
          this.rightTotal = rightPart.diffIr;
          this.basicData[8].rightValue = this.$toFixed(rightPart.reductPaymentAmt, 2);
          this.basicData[9].rightValue = this.$toFixed(rightPart.reductOdPoInvoiceBuleAmt, 2);
          this.basicData[10].rightValue = this.$toFixed(rightPart.reductOdPoInvoiceRedAmt, 2);
          this.basicData[11].rightValue = this.$toFixed(rightPart.reductFiGatheringAmt, 2);
          this.basicData[13].rightValue = this.$toFixed(rightPart.increOdPoInvoiceBuleAmt, 2);
          this.basicData[14].rightValue = this.$toFixed(rightPart.increOdPoInvoiceRedAmt, 2);
          this.basicData[15].rightValue = this.$toFixed(rightPart.increPaymentAmt, 2);
          this.basicData[16].rightValue = this.$toFixed(rightPart.increFiGatheringAmt, 2);
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
      CreditApi.supplierCreditQueryHistory(params).then(res => {
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
      this.basicData[1].leftValue = this.supplierInfo.supplierName;
      this.basicData[2].leftValue = this.companyInfo.companyName;
      this.basicData[2].rightValue = this.branchInfo.branchName;
      //供应商当前余额 = 月初余额 + 余额累积
      this.basicData[6].rightValue = this.$toFixed(this.monthBalance + this.rightTotal, 2);
      //剩余可用信用额度 = 信用额度总额 - 占用累积 + 供应商当前余额（月初余额 + 余额累积）
      this.basicData[5].leftValue = this.$toFixed(this.creditTotal - this.leftTotal + (this.monthBalance + this.rightTotal), 2);
    },
    //返回
    goBack() {
      this.$router.push({name: "supplierCredit"});
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
  }
};
</script>
<style lang="scss">
#supplierCreditQuery {
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