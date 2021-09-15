<template>
  <div class="saleBillStatistics">
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
        :cell-class-name="cell"
        v-loading="loading"
        
      >
        <el-table-column prop="orgName" width="170" show-overflow-tooltip label="部门"></el-table-column>
        <el-table-column prop="bizPersonName" width="100" show-overflow-tooltip label="业务员"></el-table-column>
        <el-table-column prop="goodsCat" width="100" show-overflow-tooltip label="物料大类"></el-table-column>
        <el-table-column prop="goodsName" width="120" show-overflow-tooltip label="物料名称"></el-table-column>
        <el-table-column prop="goodsSpec" width="140" show-overflow-tooltip label="物料规格"></el-table-column>
        <el-table-column prop="custName" width="180" show-overflow-tooltip label="客户"></el-table-column>
        <el-table-column prop="supplierName" width="180" show-overflow-tooltip label="供应商"></el-table-column>
        <el-table-column prop="isABA" width="180" show-overflow-tooltip label="ABA预警"></el-table-column>
        <el-table-column prop="batchCode" width="120" show-overflow-tooltip label="批次号"></el-table-column>
        <el-table-column prop="itemQty" width="100" show-overflow-tooltip label="销售数量">
          <template slot-scope="scope">
            <span>{{$numberToFixed(scope.row.itemQty, 3)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="saleAmt" width="120" 
          :formatter="$moneyFormat" 
          show-overflow-tooltip 
          label="销售收入">
         </el-table-column>
        
        <el-table-column prop="saleCostAmtDo" 
          :formatter="$moneyFormat"  width="170" 
          show-overflow-tooltip label="销售成本">
        </el-table-column>
        <el-table-column prop="cuMainCodeAmt" width="180" :formatter="$moneyFormat"  show-overflow-tooltip label="成本调整"></el-table-column>
        <el-table-column prop="saleCostAmtSum" 
          :formatter="$moneyFormat"  width="170" 
          show-overflow-tooltip label="销售成本合计">
        </el-table-column>
        <el-table-column prop="profit" width="170" :formatter="$moneyFormat"  show-overflow-tooltip label="毛利"></el-table-column>
        <el-table-column prop="profitRate" width="100"  show-overflow-tooltip label="毛利率">
            <template slot-scope="scope">
            <span>{{scope.row.profitRate?scope.row.profitRate+"%":""}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unitProfit" width="140" :formatter="$unitProfitFormat"  show-overflow-tooltip label="单位毛利">
          <!-- <template slot-scope="scope">
            <span>{{$numberToFixed(scope.row.itemQty, 6)}}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="accoutingMonth" width="140" show-overflow-tooltip label="财务账期"></el-table-column>
        <el-table-column prop="warrantPostCode" width="140" show-overflow-tooltip label="财务凭证号"></el-table-column>
        <el-table-column prop="doNo" width="140" show-overflow-tooltip label="销售出库单"></el-table-column>
        <el-table-column prop="bizType" width="120" show-overflow-tooltip label="单据类型"></el-table-column>
        <el-table-column prop="amtOrder" width="140" show-overflow-tooltip label="影响成本单据号"></el-table-column>
        <el-table-column prop="doDate" width="100" show-overflow-tooltip label="出库日期">
          <template slot-scope="scope">
            <span>{{ scope.row.doDate | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsCode" width="120" show-overflow-tooltip label="物料编号"></el-table-column>
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
import { getSaleBillStatistics,getSaleBillReportTotal,downloadListNew } from "@/api/reportQuery/report";
import { poTypeObj, contractStatusObj, pickupTypeObj } from "../../dictionary";
import {Loading } from "element-ui";
export default {
  name: "saleBillStatistics",
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
      poTypeObj,
      contractStatusObj,
      pickupTypeObj,
      tableData: [],
      searchOptions: {}
    };
  },
  methods: {
     cell({row, column, rowIndex, columnIndex}) {
        if(column.property=="saleAmt" || column.property=="saleCostAmtDo" ||
        column.property=="saleCostAmt" || column.property=="mainCodeAmt"
        || column.property=="unMainCodeAmt" || column.property=="cuMainCodeAmt"
        || column.property=="unitProfit" || column.property=="itemQty"
        || column.property=="profit" || column.property=="profitRate"
        || column.property=="saleCostAmtSum"){
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
        pageSize: this.page.pageSize,
        ...this.searchOptions
      };
      this.loading = true;
      getSaleBillStatistics(this.$queryFilter(params)).then(res => {
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
  // this.loading = true;
      getSaleBillReportTotal(params).then(res => {
        if (res.code === "success") {
          this.total = res.data;
          //this.loading = false;
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
            "saleAmt",
            "itemQty",
            "saleCostAmt",
            "profit",
            "unitProfit",
          ].findIndex(it => it == key) !== -1
        ) {
          if(this.total[key]){
             let res=this.total? this.total[key].toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'):"";
             sums[index] = this.$sumTolFormat(res);
          }
        }else if(["profitRate"].findIndex(it => it == key) !== -1){
          sums[index] = this.total[key]+"%";
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
      // if (this.tableData.length === 0) {
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
      }
      if(params.hasOwnProperty("companyCode") && params.hasOwnProperty("accoutingMonthBeginStr")){
        //使用Element loading-start 方法
        var loading2 = Loading.service({
          lock: true,
          text: "加载中...",
          background: "rgba(0, 0, 0, 0.7)"
        });
        downloadListNew(this.$queryFilter(params)).then(res => {
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
          }else{
            this.$message({
              message:res.message,
              type: "waring"
            });
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
.saleBillStatistics {
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
