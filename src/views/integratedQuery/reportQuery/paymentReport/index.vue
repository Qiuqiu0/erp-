<template>
  <div class="odSoContractReport">
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="getData" icon="el-icon-search">查询</el-button>
      <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
    </div>
    <head-search @getSearchs="getSearchs" ref="headSearch" class="auto-sibling"></head-search>
    <!-- 表格 -->
    <div class="button-div auto-sibling">
        <el-button @click="download()"  v-if="$actionFlag(`F001`)" icon="el-icon-download">导出</el-button>
    </div>
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
        <el-table-column type="index" width="50" show-overflow-tooltip label="序号"></el-table-column>
        <el-table-column prop="invoiceCode" width="120" show-overflow-tooltip label="采购发票单据号"></el-table-column>
        <el-table-column prop="extInvoiceCode" width="140" show-overflow-tooltip label="发票外部编号"></el-table-column>
        <el-table-column prop="companyName" width="170" show-overflow-tooltip label="公司"></el-table-column>
        <el-table-column prop="orgName" width="170" show-overflow-tooltip label="部门"></el-table-column>
        <el-table-column prop="supplierName" width="180"  show-overflow-tooltip label="供应商"></el-table-column>
        <el-table-column prop="invoiceDate" width="100" show-overflow-tooltip label="开票日期">
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceDate | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="accountDay" width="100" show-overflow-tooltip label="记账日期">
          <template slot-scope="scope">
            <span>{{ scope.row.accountDay | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="currencyCode" show-overflow-tooltip label="业务币种"></el-table-column>
        <el-table-column prop="baseCurrencyRate" width="90" show-overflow-tooltip label="本位币汇率">
          <template slot-scope="scope">
                <span>{{$numberToFixed(scope.row.baseCurrencyRate, 4)}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="invoiceType" show-overflow-tooltip label="发票类型">
          <template slot-scope="scope">
            <span>{{ invoiceTypeObj[scope.row.invoiceType]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="invoiceStatus" show-overflow-tooltip label="发票状态">
          <template slot-scope="scope">
            <span>{{ poInvoiceStatusObj[scope.row.invoiceStatus]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="invoiceQty" width="120" show-overflow-tooltip label="开票数量">
          <template slot-scope="scope">
            <div class="content_right">
                <span>{{$numberToFixed(scope.row.invoiceQty, 3)}}</span>
            </div>
            </template>
        </el-table-column>
        <el-table-column prop="invoiceAmt" width="120" :formatter="$moneyFormat" show-overflow-tooltip label="开票金额"></el-table-column>
        <el-table-column prop="createdTime" width="140" show-overflow-tooltip label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | time }}</span>
          </template>
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
import headSearch from "./headSearch";
import { selectedRow } from "@/mixins/selectedRow.js";
import {
  getPaymentReportList,
  getPaymentReportTotal,
  exportPayReport
} from "@/api/reportQuery/report";
import { invoiceTypeObj, poInvoiceStatusObj } from "../../dictionary";
import {Loading } from "element-ui";
export default {
  name: "odPoForeignContractReport",
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
        pageSize:100,
        pageNum: 1,
        total: 0
      },
      total: {}, //统计
      selectioned: "", //选中
      selectionedArray: [],
      loading: false,
      invoiceTypeObj,
      poInvoiceStatusObj,
      tableData: [],
      searchOptions: {}
    };
  },
  methods: {
    getData() {
      this.$refs.headSearch.postData();
      this.getTotal();
      this.queryData();
    },
    clearNone() {
      this.$refs.headSearch.clearNone();
    },
    getSearchs(e) {
      this.searchOptions = e;
      
    },
    queryData() {
      let params = {
        pageNum: this.page.pageNum,
        rows: this.page.pageSize,
        ...this.searchOptions
      };
      this.loading = true;
      getPaymentReportList(this.$queryFilter(params)).then(res => {
        if (res.code === "success") {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
          this.loading = false;
        }
      });
    },
    getTotal() {
      let params = {
        ...this.searchOptions
      };
      this.loading = true;
      getPaymentReportTotal(this.$queryFilter(params)).then(res => {
        if (res.code === "success") {
          this.total = res.data;
          this.loading = false;
        }
      });
    },
     //导出
    download(){
      this.$refs.headSearch.postData();;
       let data = {
        pageNum: this.page.pageNum,
        rows: this.page.pageSize,
        ...this.searchOptions
      };
      //使用Element loading-start 方法
      var loading2 = Loading.service({
        lock: true,
        text: "加载中...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      exportPayReport(this.$queryFilter(data)).then(res=>{
        if(res.code=="fail"){
          this.$openWarning(res.message);
        }else{
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename ="应付报表.xls";
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
        }
          loading2.close();
      }).catch(e=>{
        loading2.close();
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
        if (["invoiceQty"].findIndex(it => it == key) !== -1) {
          sums[index] = this.total?this.$sumTolFormat(this.total[key]):"" ;
        }else if(["invoiceAmt"].findIndex(it => it == key) !== -1){
          let res=parseFloat(this.total[key]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
          sums[index] =this.$sumTolFormat(res);
        } else {
          sums[index] = "";
        }
      });
      this.$nextTick(() => {
        this.$refs.multipleTable.doLayout();
      });
      return sums;
    }
  }
};
</script>
<style lang="scss" >
.odSoContractReport {
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
  }
}
</style>
