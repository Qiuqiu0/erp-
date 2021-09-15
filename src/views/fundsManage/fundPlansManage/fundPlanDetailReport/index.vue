<template>
  <div class="fundPlanDetailReport">
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
         :cell-class-name="cell"
      >
        <el-table-column type="index" width="50" show-overflow-tooltip label="序号"></el-table-column>
        <el-table-column prop="companyName" width="170" show-overflow-tooltip label="公司名称"></el-table-column>
        <el-table-column prop="orgName" width="170" show-overflow-tooltip label="部门名称"></el-table-column>
        <el-table-column prop="weekNum" width="100" show-overflow-tooltip label="周数"></el-table-column>
        <el-table-column prop="planBegintime" width="190" show-overflow-tooltip label="日期范围">
          <template slot-scope="scope">
            <span>{{ scope.row.planBegintime | time2Date }}</span>--
            <span>{{ scope.row.planEndtime | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="incomeType" width="100" show-overflow-tooltip label="收付类型"></el-table-column>
        <el-table-column prop="fundType" width="100" show-overflow-tooltip label="资金类型"></el-table-column>
        <el-table-column prop="projectType" width="100" show-overflow-tooltip label="项目类型"></el-table-column>
        <el-table-column prop="planTime" width="140" show-overflow-tooltip label="计划日期">
          <template slot-scope="scope">
            <span>{{ scope.row.planTime | time2Date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="interactiveCompanyName"
          width="150"
          show-overflow-tooltip
          label="往来单位名称"
        ></el-table-column>
        <el-table-column prop="payCurrencyAmt" :formatter="$moneyFormat" width="150" show-overflow-tooltip label="计划金额"></el-table-column>
        <el-table-column prop="payCurrencyName" width="150" show-overflow-tooltip label="币别"></el-table-column>
        <el-table-column prop="exchangeCurrencyName" width="150" show-overflow-tooltip label="购汇币别"></el-table-column>
        <el-table-column prop="exchangeAmt" :formatter="$moneyFormat" width="150" show-overflow-tooltip label="购汇金额"></el-table-column>
        <el-table-column prop="tradeQty" width="110" show-overflow-tooltip label="购销数量">
           <template slot-scope="scope">
              <span>{{$numberToFixed(scope.row.tradeQty, 3)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="quantityUnitName" width="140" show-overflow-tooltip label="数量单位"></el-table-column>
        <el-table-column prop="remark" width="170" show-overflow-tooltip label="备注"></el-table-column>
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
  getFundPlanDetailReport,
  exportFundPlanDetailReport
} from "@/api/fundPlansManage/fundPlanDetailReport";
import {
  planTypeObj,
  planStatusObj,
  bizTypeObj,
  incomeTypeObj,
  projectTypeObj,
  fundTypeObj
} from "../../dictionary";
import headSearch from "./headSearch";
import { selectedRow } from "@/mixins/selectedRow.js";
export default {
  name: "fundPlanDetailReport",
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
      bizTypeObj,
      incomeTypeObj,
      projectTypeObj,
      fundTypeObj,
      checkDetail: {
        status: 0,
        approvalOpinion: ""
      }
    };
  },
  methods: {
        cell({row, column, rowIndex, columnIndex}) {
        //第八列添加 red 类
            if( column.property=="payCurrencyAmt"|| column.property=="exchangeAmt"  
            || column.property=="tradeQty"){
            return 'rightTd'
            }else{
            return "";
            }
        },
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
      getFundPlanDetailReport(this.$queryFilter(params)).then(res => {
        if (res.code === "success") {
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
      exportFundPlanDetailReport(this.$queryFilter(params)).then(res => {
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
  mounted() {
    this.queryData();
  },
  activated() {
    this.queryData();
  }
};
</script>
<style lang="scss" >
.fundPlanDetailReport {
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
