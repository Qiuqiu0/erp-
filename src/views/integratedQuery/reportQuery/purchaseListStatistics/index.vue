<template>
  <div class="odSoContractReport content-div">
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="getData" icon="el-icon-search">查询</el-button>
      <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
    </div>
    <head-search @getSearchs="getSearchs" ref="headSearch" class="auto-sibling"></head-search>
    <!-- 表格 -->
    <div class="button-div auto-sibling">
      <el-button class="query-button" v-if="$actionFlag(`F001`)"  icon="el-icon-download" @click="exportExcel">导出</el-button>

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
        :cell-class-name="cell"
      >
        <el-table-column prop="orgName" width="170" show-overflow-tooltip label="部门"></el-table-column>
        <el-table-column prop="bizPersonName" width="100" show-overflow-tooltip label="业务员"></el-table-column>
        <el-table-column prop="batchCode" width="120" show-overflow-tooltip label="批次号"></el-table-column>
        <el-table-column prop="wvNo" width="120" show-overflow-tooltip label="入库单号"></el-table-column>
        <el-table-column prop="goodsCategoryName" width="100" show-overflow-tooltip label="物料大类"></el-table-column>
        <el-table-column prop="goodsName" width="120" show-overflow-tooltip label="物料名称"></el-table-column>
        <el-table-column prop="goodsSpec" width="140" show-overflow-tooltip label="物料规格"></el-table-column>
        <el-table-column prop="isSupplierRelated" width="120" show-overflow-tooltip label="是否关联方"></el-table-column>
        <el-table-column prop="supplierName" width="170" show-overflow-tooltip label="供应商"></el-table-column>
        <el-table-column prop="actReveive" width="100" show-overflow-tooltip label="收货数量"></el-table-column>
        <el-table-column prop="currencyCodeOrigin" show-overflow-tooltip label="业务币种"></el-table-column>
        <el-table-column prop="receivePriceOrigin" width="170" show-overflow-tooltip label="收货单价-业务币"></el-table-column>
        <el-table-column prop="receiveAmtOrigin" width="170" show-overflow-tooltip label="收货金额-业务币"></el-table-column>
        <el-table-column prop="rmbCurrencyRate" width="100" show-overflow-tooltip label="收货汇率"></el-table-column>
        <el-table-column prop="receivePriceRmb" width="140"  show-overflow-tooltip label="收货单价-人民币"></el-table-column>
        <el-table-column prop="receiveAmtRmb" width="140"  show-overflow-tooltip label="收货金额-人民币"></el-table-column>
        <el-table-column prop="receiveAmtNoTaxRmb" width="160"  show-overflow-tooltip label="收货不含税金额-人民币"></el-table-column>
        <el-table-column prop="receiveAccMon" width="140" show-overflow-tooltip label="收货财务账期"></el-table-column>
        <el-table-column prop="receiveWarrntCode" width="140" show-overflow-tooltip label="收货财务凭证号"></el-table-column>
        <el-table-column prop="estQty" width="140" show-overflow-tooltip label="暂估数量"></el-table-column>
        <el-table-column prop="estPriceOrigin" width="140" show-overflow-tooltip label="暂估单价-业务币"></el-table-column>
        <el-table-column prop="estAmtOrigin" width="140" show-overflow-tooltip label="暂估金额-业务币"></el-table-column>
        <el-table-column prop="estPriceRmb" width="140" show-overflow-tooltip label="暂估单价-人民币"></el-table-column>
        <el-table-column prop="estAmtRmb" width="140" show-overflow-tooltip label="暂估金额-人民币"></el-table-column>
        <el-table-column prop="invoiceQty" width="140" show-overflow-tooltip label="到票数量"></el-table-column>
        <el-table-column prop="invoicePriceOrigin" width="140" show-overflow-tooltip label="不含税单价-业务币"></el-table-column>
        <el-table-column prop="invoiceAmtOrigin" width="180" show-overflow-tooltip label="到票不含税金额-业务币"></el-table-column>
        <el-table-column prop="invoicePriceRmb" width="160" show-overflow-tooltip label="不含税单价-人民币"></el-table-column>
        <el-table-column prop="invoiceAmtRmb" width="180" show-overflow-tooltip label="到票不含税金额-人民币"></el-table-column>
        <el-table-column prop="mainRmb" width="150" show-overflow-tooltip label="进主营业务成本金额"></el-table-column>
        <el-table-column prop="unPostinvoiceQty" width="150" show-overflow-tooltip label="跨期到票数量"></el-table-column>
        <el-table-column prop="unPostInvoicePriceOrigin" width="180" show-overflow-tooltip label="跨期到票不含税单价-业务币"></el-table-column>
        <el-table-column prop="unPostInvoiceAmtOrigin" width="180" show-overflow-tooltip label="跨期到票不含税金额-业务币"></el-table-column>
        <el-table-column prop="unPostInvoicePriceRmb" width="180" show-overflow-tooltip label="跨期到票不含税单价-人民币"></el-table-column>
        <el-table-column prop="unPostInvoiceAmtRmb" width="180" show-overflow-tooltip label="跨期到票不含税金额-人民币"></el-table-column>
        <el-table-column prop="tax" width="100" show-overflow-tooltip label="税率"></el-table-column>
        <el-table-column prop="inputTax" width="100" show-overflow-tooltip label="进项税"></el-table-column>
        <el-table-column prop="invoiceAmtVatRmb" width="150" show-overflow-tooltip label="到票含税金额-人民币"></el-table-column>
        <el-table-column prop="invoiceAccMon" width="100" show-overflow-tooltip label="到票财务账期"></el-table-column>
        <el-table-column prop="invoiceWarrntCode" width="120" show-overflow-tooltip label="到票凭证号"></el-table-column>
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
  getpurchaseListStatistics,
  getpurchaseListReportTotal,
  exportpurchaseListStatistics
} from "@/api/reportQuery/report";
import {Loading } from "element-ui";
export default {
  name: "purchaseListStatistics",
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
      total: {}, //统计
      selectioned: "", //选中
      selectionedArray: [],
      loading: false,
      tableData: [],
      searchOptions: {}
    };
  },
  methods: {
     cell({row, column, rowIndex, columnIndex}) {
        if(column.property!="orgName" && column.property!="bizPersonName" &&
        column.property!="batchCode" && column.property!="wvNo"
        && column.property!="goodsCategoryName" && column.property!="goodsName"
        && column.property!="goodsSpec" && column.property!="isSupplierRelated"
        && column.property!="supplierName" && column.property!="isSupplierRelated"
        && column.property!="currencyCodeOrigin"
        && column.property!="receiveAccMon" && column.property!="receiveWarrntCode"
        && column.property!="invoiceAccMon"
        && column.property!="invoiceWarrntCode"){
          return 'rightTd'
        }else{
          return "";
        }
    },
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
      getpurchaseListStatistics(this.$queryFilter(params)).then(res => {
        if (res.code === "success") {
          this.tableData = res.data;
          this.page.total = res.total;
          this.loading = false;
        }
      });
    },
    getTotal() {
      let params = {
        ...this.searchOptions
      };
      this.loading = true;
      getpurchaseListReportTotal(this.$queryFilter(params)).then(res => {
        if (res.code === "success") {
          this.total = res.data;
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
            "actReveive",
            "receivePriceOrigin",
            "receiveAmtOrigin",
            "receiveAmtRmb",
            "estQty",
            "estAmtOrigin",
            "estAmtRmb",
            "invoiceQty",
            "invoiceAmtOrigin",
            "invoiceAmtRmb",
            "inputTax",
            "invoiceAmtVatRmb",
            "mainRmb",
            "unPostinvoiceQty",
            "unPostInvoiceAmtOrigin",
            "unPostInvoiceAmtRmb",
            "receiveAmtNoTaxRmb"
          ].findIndex(it => it == key) !== -1
        ) {
          sums[index] =  this.sumTol?this.$sumTolFormat(this.sumTol[key]):"" ;
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
      //  if (this.tableData.length === 0) {
      //   this.$message({
      //     message: "报表数据为空,不允许导出",
      //     type: "error"
      //   });
      //   return;
      // }
      this.$refs.headSearch.postData();
      let params = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        ...this.searchOptions
      };
      if(params.hasOwnProperty("companyCode")){
        //使用Element loading-start 方法
        var loading2 = Loading.service({
          lock: true,
          text: "加载中...",
          background: "rgba(0, 0, 0, 0.7)"
        });
        exportpurchaseListStatistics(this.$queryFilter(params)).then(res => {
          if (res.status === 200) {
            if(res.code=="fail"){
              this.$openWarning(res.message);
            }else{
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
            }
          }
          loading2.close();
        }).catch(e=>{
          loading2.close();
        });
      }
    }
  }
};
</script>
<style lang="scss" >
.purchaseListStatistics {
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
