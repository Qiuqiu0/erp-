<template>
  <div class="warehouseInOutReport content-div">
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="getData" icon="el-icon-search">查询</el-button>
      <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
    </div>
    <head-search @getSearchs="getSearchs" ref="headSearch" class="auto-sibling"></head-search>
     <div class="button-div auto-sibling">
        <el-button @click="download()" v-if="$actionFlag(`F001`)" icon="el-icon-download">导出</el-button>
    </div>
    <!-- 表格 -->
    <div class="button-div auto-sibling"></div>
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

        <el-table-column prop="moveType" width="120" show-overflow-tooltip label="业务类型">
          <template slot-scope="scope">
            <span>{{ warehouseTypeObj[scope.row.moveType]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="companyName" width="170" show-overflow-tooltip label="公司"></el-table-column>
        <el-table-column prop="orgName" width="170" show-overflow-tooltip label="部门"></el-table-column>
        <el-table-column prop="goodsCode" width="120" show-overflow-tooltip label="物料编号"></el-table-column>
        <el-table-column prop="goodsName" width="120" show-overflow-tooltip label="物料名称"></el-table-column>
        <el-table-column prop="orderDate" width="100" show-overflow-tooltip label="出入库日期">
          <template slot-scope="scope">
            <span>{{ scope.row.orderDate | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="direction" show-overflow-tooltip label="库存方向"></el-table-column>
        <el-table-column prop="warehouseName" show-overflow-tooltip label="仓库"></el-table-column>
        <el-table-column prop="orderNo" width="150" show-overflow-tooltip label="出入库单号"></el-table-column>
        <el-table-column prop="supplierName" show-overflow-tooltip label="供应商"></el-table-column>
        <el-table-column prop="custName" show-overflow-tooltip label="客户"></el-table-column>
        <el-table-column prop="inQty" width="150" show-overflow-tooltip label="入库数量">
          <template slot-scope="scope">
            <div class="content_right">
                  <span>{{$numberToFixed(scope.row.inQty, 3)}}</span>
            </div>
              </template>
        </el-table-column>
         <el-table-column prop="inQtySec" width="150" show-overflow-tooltip label="入库第二数量">
           <template slot-scope="scope">
             <div class="content_right">
                  <span>{{$numberToFixed(scope.row.inQtySec, 3)}}</span>
             </div>
              </template>
         </el-table-column>
        <el-table-column prop="outQty" width="150" show-overflow-tooltip label="出库数量">
          <template slot-scope="scope">
            <div class="content_right">
                  <span>{{$numberToFixed(scope.row.outQty, 3)}}</span>
            </div>
              </template>
        </el-table-column>
         <el-table-column prop="outQtySec" width="150" show-overflow-tooltip label="出库第二数量">
           <template slot-scope="scope">
             <div class="content_right">
                  <span>{{$numberToFixed(scope.row.outQtySec, 3)}}</span>
             </div>
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
  getWarehouseInOutReport,
  getWarehouseInOutReportTotal,
  exportBusinessInventoryList
} from "@/api/reportQuery/report";
import { warehouseTypeObj } from "../../dictionary";
import {Loading } from "element-ui";
export default {
  name: "warehouseInOutReport",
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
      warehouseTypeObj,
      tableData: [],
      searchOptions: {}
    };
  },
  methods: {
    getData() {
     // console.log("dddd")
      this.$refs.headSearch.postData();
      this.getTotal();
      this.queryData();
    },
    clearNone() {
      this.$refs.headSearch.clearNone();
    },
    getSearchs(e) {
      this.searchOptions = e;
      // this.getTotal();
      // this.queryData();
    },
    queryData() {
      let params = {
        pageNum: this.page.pageNum,
        rows: this.page.pageSize,
        ...this.searchOptions
      };
      this.loading = true;
      getWarehouseInOutReport(this.$queryFilter(params)).then(res => {
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
      getWarehouseInOutReportTotal(this.$queryFilter(params)).then(res => {
        if (res.code === "success") {
          this.total = res.data;
          this.loading = false;
        }
      });
    },
     download(){
       this.$refs.headSearch.postData();
       let data = {
          ...this.searchOptions
      };
          //使用Element loading-start 方法
      var loading2 = Loading.service({
        lock: true,
        text: "加载中...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      exportBusinessInventoryList(this.$queryFilter(data)).then(res=>{
        if(res.code=="fail"){
          this.$openWarning(res.message);
        }else{
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename ="出入库明细报表.xls";
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
        if (["inQty","outQty","inQtySec","outQtySec"].findIndex(it => it == key) !== -1) {
          sums[index] = this.total[key]?this.$sumTolFormat(this.total[key]):'';
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
.warehouseInOutReport {
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
