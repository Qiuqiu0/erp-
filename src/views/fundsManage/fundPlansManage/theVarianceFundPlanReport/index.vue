<template>
  <div class="theVarianceFundPlanReport">
    <div class="button-div auto-sibling">
      <el-button class="query-button" icon="el-icon-search" @click="getData">查询</el-button>
      <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
    </div>
    <head-search @getSearchs="getSearchs" ref="headSearch" class="auto-sibling"></head-search>
    <!-- 操作台 -->
    <div class="button-div auto-sibling">
      <el-button class="query-button" icon="el-icon-download" @click="exportExcel">导出</el-button>
    </div>
    <!-- 表格 -->
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        height="calc(100% - 35px)"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleChange"
        @row-click="selectedRow"
        class="el-table"
        v-loading="loading"
      >
        <el-table-column>
          <el-table-column type="index" width="50" show-overflow-tooltip label="序号"></el-table-column>
          <el-table-column prop="companyName" width="170" show-overflow-tooltip label="公司名称"></el-table-column>
          <el-table-column prop="orgName" width="170" show-overflow-tooltip label="部门名称"></el-table-column>
          <el-table-column prop="accountYear" width="100" show-overflow-tooltip label="周数"></el-table-column>
          <el-table-column prop="dateScope" width="190" show-overflow-tooltip label="日期范围"></el-table-column>
          <el-table-column prop="payCurrencyName" width="100" show-overflow-tooltip label="币别"></el-table-column>
          <el-table-column
            prop="interactiveCompanyName"
            width="100"
            show-overflow-tooltip
            label="往来单位"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="计划付款">
          <el-table-column prop="paymentCash" width="100" show-overflow-tooltip label="现款付款">
            <template slot-scope="scope">
              <div class="content_right">
                {{$moneyFormat({},{},scope.row.paymentCash)}}</div>
              </template>
          </el-table-column>
          <el-table-column prop="paymentBank" width="100" show-overflow-tooltip label="银行承兑汇票">
            <template slot-scope="scope">
              <div class="content_right">
                {{$moneyFormat({},{},scope.row.paymentBank)}}</div>
              </template>
          </el-table-column>
          <el-table-column prop="paymentBusiness" width="100" show-overflow-tooltip label="商业承兑汇票">
            <template slot-scope="scope">
              <div class="content_right">
                {{$moneyFormat({},{},scope.row.paymentBusiness)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="paymentInlandCredit"
            width="100"
            show-overflow-tooltip
            label="国内信用证"
          >
              <template slot-scope="scope">
                <div class="content_right">
                {{$moneyFormat({},{},scope.row.paymentInlandCredit)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="paymentInternationalCredit"
            width="100"
            show-overflow-tooltip
            label="国际信用证（即期证交单）"
          >
              <template slot-scope="scope">
                <div class="content_right">
                {{$moneyFormat({},{},scope.row.paymentInternationalCredit)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="paymentInternationalCreditForward"
            width="100"
            show-overflow-tooltip
            label="国际信用证（远期证交单承兑）"
          >
              <template slot-scope="scope">
                <div class="content_right">
                {{$moneyFormat({},{},scope.row.paymentInternationalCreditForward)}}</div>
              </template>
          </el-table-column>
          <el-table-column prop="paymentOther" width="100" show-overflow-tooltip label="其他">
            <template slot-scope="scope">
              <div class="content_right">
                {{$moneyFormat({},{},scope.row.paymentOther)}}</div>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="实际付款">
          <el-table-column prop="paymentCashR" width="100" show-overflow-tooltip label="现款收款">
            <template slot-scope="scope">
              <div class="content_right">
                {{$moneyFormat({},{},scope.row.paymentCashR)}}</div>
              </template>
          </el-table-column>
          <el-table-column prop="paymentBankR" width="100" show-overflow-tooltip label="银行承兑汇票">
            <template slot-scope="scope">
              <div class="content_right">
                {{$moneyFormat({},{},scope.row.paymentBankR)}}</div>
              </template></el-table-column>
          <el-table-column prop="paymentBusinessR" width="100" show-overflow-tooltip label="商业承兑汇票">
            <template slot-scope="scope">
              <div class="content_right">
                {{$moneyFormat({},{},scope.row.paymentBusinessR)}}</div>
              </template></el-table-column>
          <el-table-column
            prop="paymentInlandCreditR"
            width="100"
            show-overflow-tooltip
            label="国内信用证"
          >
              <template slot-scope="scope">
                <div class="content_right">
                  {{$moneyFormat({},{},scope.row.paymentInlandCreditR)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="paymentInternationalCreditR"
            width="100"
            show-overflow-tooltip
            label="国际信用证（即期证交单）"
          >
              <template slot-scope="scope">
                <div class="content_right">
                {{$moneyFormat({},{},scope.row.paymentInternationalCreditR)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="paymentInternationalCreditForwardR"
            width="100"
            show-overflow-tooltip
            label="国际信用证（远期证交单承兑）"
          >
              <template slot-scope="scope">
                <div class="content_right">
                {{$moneyFormat({},{},scope.row.paymentInternationalCreditForwardR)}}</div>
              </template>
          </el-table-column>
          <el-table-column prop="paymentOtherR" width="100" show-overflow-tooltip label="其他">
              <template slot-scope="scope">
                <div class="content_right">
                {{$moneyFormat({},{},scope.row.paymentOtherR)}}</div>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="付款差异">
          <el-table-column prop="paymentCashD" width="100" show-overflow-tooltip label="现款收款"><template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.paymentCashD)}}</div>
              </template></el-table-column>
          <el-table-column prop="paymentBankD" width="100" show-overflow-tooltip label="银行承兑汇票"><template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.paymentBankD)}}</div>
              </template></el-table-column>
          <el-table-column prop="paymentBusinessD" width="100" show-overflow-tooltip label="商业承兑汇票"><template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.paymentBusinessD)}}</div>
              </template></el-table-column>
          <el-table-column
            prop="paymentInlandCreditD"
            width="100"
            show-overflow-tooltip
            label="国内信用证"
          ><template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.paymentInlandCreditD)}}</div>
              </template></el-table-column>
          <el-table-column
            prop="paymentInternationalCreditD"
            width="100"
            show-overflow-tooltip
            label="国际信用证（即期证交单）"
          ><template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.paymentInternationalCreditD)}}</div>
              </template></el-table-column>
          <el-table-column
            prop="paymentInternationalCreditForwardD"
            width="100"
            show-overflow-tooltip
            label="国际信用证（远期证交单承兑）"
          ><template slot-scope="scope">
               <div class="content_right"> {{$moneyFormat({},{},scope.row.paymentInternationalCreditForwardD)}}</div>
              </template></el-table-column>
          <el-table-column prop="paymentOtherD" width="100" show-overflow-tooltip label="其他">
            <template slot-scope="scope">
               <div class="content_right"> {{$moneyFormat({},{},scope.row.paymentOtherD)}}</div>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="计划收款">
          <el-table-column prop="collectionCash" width="100" show-overflow-tooltip label="现款收款"><template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionCash)}}</div>
              </template></el-table-column>
          <el-table-column prop="collectionBank" width="100" show-overflow-tooltip label="银行承兑汇票">
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionBank)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="collectionBusiness"
            width="100"
            show-overflow-tooltip
            label="商业承兑汇票"
          >
              <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionBusiness)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="collectionInlandCredit"
            width="100"
            show-overflow-tooltip
            label="国内信用证"
          >
              <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionInlandCredit)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="collectionInternationalCredit"
            width="100"
            show-overflow-tooltip
            label="国际信用证（即期证交单）"
          >
              <template slot-scope="scope">
               <div class="content_right"> {{$moneyFormat({},{},scope.row.collectionInternationalCredit)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="collectionInternationalCreditForward"
            width="100"
            show-overflow-tooltip
            label="国际信用证（远期证交单承兑）"
          >
              <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionInternationalCreditForward)}}</div>
              </template>
          </el-table-column>
          <el-table-column prop="collectionOther" width="100" show-overflow-tooltip label="其他收款">
            <template slot-scope="scope">
               <div class="content_right"> {{$moneyFormat({},{},scope.row.collectionOther)}}</div>
              </template>
            </el-table-column>
        </el-table-column>
        <el-table-column label="实际收款">
          <el-table-column prop="collectionCashR" width="100" show-overflow-tooltip label="现款收款">
            <template slot-scope="scope">
               <div class="content_right"> {{$moneyFormat({},{},scope.row.collectionCashR)}}</div>
              </template>
          </el-table-column>
          <el-table-column prop="collectionBankR" width="100" show-overflow-tooltip label="银行承兑汇票">
            <template slot-scope="scope">
               <div class="content_right"> {{$moneyFormat({},{},scope.row.collectionBankR)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="collectionBusinessR"
            width="100"
            show-overflow-tooltip
            label="商业承兑汇票"
          >
              <template slot-scope="scope">
               <div class="content_right"> {{$moneyFormat({},{},scope.row.collectionBusinessR)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="collectionInlandCreditR"
            width="100"
            show-overflow-tooltip
            label="国内信用证"
          >
              <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionInlandCreditR)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="collectionInternationalCreditR"
            width="100"
            show-overflow-tooltip
            label="国际信用证（即期证交单）"
          >
          <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionInternationalCreditR)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="collectionInternationalCreditForwardR"
            width="100"
            show-overflow-tooltip
            label="国际信用证（远期证交单承兑）"
          >
          <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionInternationalCreditForwardR)}}</div>
              </template>
          </el-table-column>
          <el-table-column prop="collectionOtherR" width="100" show-overflow-tooltip label="其他收款">
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionOtherR)}}</div>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="收款差异">
          <el-table-column prop="collectionCashD" width="100" show-overflow-tooltip label="现款收款">
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionCashD)}}</div>
              </template>
            </el-table-column>
          <el-table-column prop="collectionBankD" width="100" show-overflow-tooltip label="银行承兑汇票">
              <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionBankD)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="collectionBusinessD"
            width="100"
            show-overflow-tooltip
            label="商业承兑汇票"
          >
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionBusinessD)}}</div>
              </template>
        </el-table-column>
          <el-table-column
            prop="collectionInlandCreditD"
            width="100"
            show-overflow-tooltip
            label="国内信用证"
          >
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionInlandCreditD)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="collectionInternationalCreditD"
            width="100"
            show-overflow-tooltip
            label="国际信用证（即期证交单）"
          >
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionInternationalCreditD)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="collectionInternationalCreditForwardD"
            width="100"
            show-overflow-tooltip
            label="国际信用证（远期证交单承兑）"
          >
              <template slot-scope="scope">
               <div class="content_right"> {{$moneyFormat({},{},scope.row.collectionInternationalCreditForwardD)}}</div>
              </template>
          </el-table-column>
          <el-table-column prop="collectionOtherD" width="100" show-overflow-tooltip label="其他收款">
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionOtherD)}}</div>
           </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[100, 200, 300,500]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getTheVarianceFundPlanReport,
  exportTheVarianceFundPlanReport
} from "@/api/fundPlansManage/theVarianceFundPlanReport";
import { planTypeObj, planStatusObj } from "../../dictionary";
import headSearch from "./headSearch";
import { selectedRow } from "@/mixins/selectedRow.js";
export default {
  name: "theVarianceFundPlanReport",
  mixins: [selectedRow],
  components: {
    headSearch
  },
  data() {
    return {
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      page: {
        pageSize: 100,
        pageNum: 1,
        total: 0
      },
      selectioned: "", //选中
      selectionedArray: [],
      checkShow: false,
      loading: false,
      tableData: [],
      searchOptions: {},
      planTypeObj,
      planStatusObj,
      checkDetail: {
        status: 0,
        approvalOpinion: ""
      }
    };
  },
  methods: {
     selectedRow(row){
       this.$refs.multipleTable.toggleRowSelection(row);
    },
    getData() {
      this.$refs.headSearch.postData();
    },
    clearNone() {
      this.$refs.headSearch.clearNone();
    },
    getSearchs(e) {
      this.searchOptions = e;
      this.queryData();
    },
    queryData() {
      let params = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        ...this.searchOptions
      };
      this.loading = true;
      getTheVarianceFundPlanReport(this.$queryFilter(params)).then(res => {
        if (res.code === "success") {
          // this.total = res.data.pop();
          this.tableData = res.data;
          this.page.total = res.total;
          this.loading = false;
        }
      });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.queryData();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.queryData();
    },
    handleChange(e) {
      this.selectionedArray = e;
    },
    exportExcel() {
      if (this.tableData.length === 0) {
        this.$message({
          message: "报表数据为空,不允许导出",
          type: "error"
        });
        return;
      }
      let params = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        ...this.searchOptions
      };
      this.loading = true;
      exportTheVarianceFundPlanReport(this.$queryFilter(params)).then(res => {
        if (res.status === 200) {
          var filename = decodeURI(
            res.headers["content-disposition"].match(/(filename=(.*))/)[2]
          );
          var blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
          let objectUrl = URL.createObjectURL(blob);
          let link = document.createElement("a");
          link.href = objectUrl;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(link.href);
          this.loading = false;
        }
      });
    }
    // getSummaries(param) {
    //   const { columns, data } = param;
    //   const sums = [];
    //   columns.forEach((column, index) => {
    //     if (index === 0) {
    //       sums[index] = "总计";
    //       return;
    //     }
    //     let key = column.property;
    //     if (
    //       [
    //         "collectionCash", //收款计划-现款收款
    //         "collectionBank", //收款计划-银行承兑汇票
    //         "collectionBusiness", //收款计划-商业承兑汇票
    //         "collectionInlandCredit", //收款计划-国内信用证
    //         "collectionInternationalCredit", //收款计划-国际信用证（即期证交单）
    //         "collectionInternationalCreditForward", //收款计划-国际信用证（远期证交单承兑）
    //         "collectionOther", //收款计划-其他收款
    //         "collectionSum", //收款计划-付款合计（不含商票）
    //         "paymentCash", //付款计划-现款付款
    //         "paymentBank", //收款计划-银行承兑汇票
    //         "paymentBusiness", //付款计划-商业承兑汇票
    //         "paymentInlandCredit", //付款计划-国内信用证
    //         "paymentInternationalCredit", //付款计划-国际信用证（即期证交单）
    //         "paymentInternationalCreditForward", //付款计划-国际信用证（远期证交单承兑）
    //         "paymentOther", //付 款计划-其他收款
    //         "paymentSum", //付款计划-付款合计（不含商票）
    //         "amtDifference" //收付计划差异（不含商票）
    //       ].findIndex(it => it == key) !== -1
    //     ) {
    //       sums[index] = this.total[key];
    //     } else {
    //       sums[index] = "";
    //     }
    //   });
    //   this.$nextTick(() => {
    //     this.$refs.multipleTable.doLayout();
    //   });
    //   return sums;
    // }
  },
  mounted() {
    // this.queryData();
  },
  activated() {
    // this.queryData();
  }
};
</script>
<style lang="scss" >
.theVarianceFundPlanReport {
  .input-div .el-col .el-input__icon {
    line-height: 20px;
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
    .el-input-date {
      width: 77%;
      border-color: #97999e !important;
    }
  }
}
</style>
