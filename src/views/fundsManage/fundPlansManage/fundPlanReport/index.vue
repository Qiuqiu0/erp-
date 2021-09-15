<template>
  <div class="fundPlanReport">
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
        show-summary
        :summary-method="getSummaries"
        class="el-table"
        v-loading="loading"
      >
        <el-table-column>
          <el-table-column type="index" width="50" show-overflow-tooltip label="序号"></el-table-column>
          <el-table-column prop="companyName" width="170" show-overflow-tooltip label="公司名称"></el-table-column>
          <el-table-column prop="orgName" width="170" show-overflow-tooltip label="部门名称"></el-table-column>
          <el-table-column prop="planCirclePeriod" width="100" show-overflow-tooltip label="计划周期"></el-table-column>
          <el-table-column prop="payCurrencyName" width="100" show-overflow-tooltip label="币别"></el-table-column>
        </el-table-column>
        <el-table-column label="收款计划（万元）">
          <el-table-column   prop="collectionCash"  width="100" show-overflow-tooltip label="现款收款">
              <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionCash)}}</div>
              </template>
          </el-table-column>
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
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionInternationalCredit)}}</div>
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
          <el-table-column prop="collectionOther"   width="100" show-overflow-tooltip label="其他收款">
              <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat({},{},scope.row.collectionOther)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="collectionSum"
            width="100"
            show-overflow-tooltip
            label="收款合计（不含商票）"
          >
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat(scope.row,scope.column,scope.row.collectionSum)}}</div>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="付款计划（万元）">
          <el-table-column  prop="paymentCash"  width="100" show-overflow-tooltip label="现款付款">
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat(scope.row,scope.column,scope.row.paymentCash)}}</div>
              </template>
          </el-table-column>
          <el-table-column prop="paymentBank" width="100" show-overflow-tooltip label="银行承兑汇票">
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat(scope.row,scope.column,scope.row.paymentBank)}}</div>
              </template>
          </el-table-column>
          <el-table-column prop="paymentBusiness" width="100" show-overflow-tooltip label="商业承兑汇票">
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat(scope.row,scope.column,scope.row.paymentBusiness)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="paymentInlandCredit"
            width="100"
            show-overflow-tooltip
            label="国内信用证"
          >
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat(scope.row,scope.column,scope.row.paymentInlandCredit)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="paymentInternationalCredit"
            width="100"
            show-overflow-tooltip
            label="国际信用证（即期证交单）"
          >
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat(scope.row,scope.column,scope.row.paymentInternationalCredit)}}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="paymentInternationalCreditForward"
            width="100"
            show-overflow-tooltip
            label="国际信用证（远期证交单承兑）"
          >
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat(scope.row,scope.column,scope.row.paymentInternationalCreditForward)}}</div>
              </template>
          </el-table-column>
          <el-table-column prop="paymentOther"   width="100" show-overflow-tooltip label="其他付款">
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat(scope.row,scope.column,scope.row.paymentOther)}}</div>
              </template>
          </el-table-column>
          <el-table-column prop="paymentSum"   width="100" show-overflow-tooltip label="付款合计(不含商票）">
            <template slot-scope="scope">
                <div class="content_right">{{$moneyFormat(scope.row,scope.column,scope.row.paymentSum)}}</div>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column
            prop="amtDifference"
            width="150"
            show-overflow-tooltip
            label="收付计划差异（不含商票）"
          >
            <template slot-scope="scope">
                <div class="content_right">
                  {{$moneyFormat(scope.row,scope.column,scope.row.amtDifference)}}
                </div>
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
  getFundPlanReport,
  exportFundPlanReport
} from "@/api/fundPlansManage/fundPlanReport";
import { planTypeObj, planStatusObj } from "../../dictionary";
import headSearch from "./headSearch";
import { selectedRow } from "@/mixins/selectedRow.js";
export default {
  name: "fundPlanReport",
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
      getFundPlanReport(this.$queryFilter(params)).then(res => {
        if (res.code === "success") {
          this.total = res.data.pop();
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
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        let key = column.property;
        if (
          [
            "collectionCash", //收款计划-现款收款
            "collectionBank", //收款计划-银行承兑汇票
            "collectionBusiness", //收款计划-商业承兑汇票
            "collectionInlandCredit", //收款计划-国内信用证
            "collectionInternationalCredit", //收款计划-国际信用证（即期证交单）
            "collectionInternationalCreditForward", //收款计划-国际信用证（远期证交单承兑）
            "collectionOther", //收款计划-其他收款
            "collectionSum", //收款计划-付款合计（不含商票）
            "paymentCash", //付款计划-现款付款
            "paymentBank", //收款计划-银行承兑汇票
            "paymentBusiness", //付款计划-商业承兑汇票
            "paymentInlandCredit", //付款计划-国内信用证
            "paymentInternationalCredit", //付款计划-国际信用证（即期证交单）
            "paymentInternationalCreditForward", //付款计划-国际信用证（远期证交单承兑）
            "paymentOther", //付 款计划-其他收款
            "paymentSum", //付款计划-付款合计（不含商票）
            "amtDifference" //收付计划差异（不含商票）
          ].findIndex(it => it == key) !== -1
        ) {
          if(this.total[key]){
            let res=parseFloat(this.total[key]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            sums[index]=this.$sumTolFormat(res);
          }
          
        } else {
          sums[index] = "";
        }
      });
      this.$nextTick(() => {
        this.$refs.multipleTable.doLayout();
      });
      return sums;
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
      exportFundPlanReport(this.$queryFilter(params)).then(res => {
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
  },
  created(){
    // this.queryData();
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
.fundPlanReport {
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
