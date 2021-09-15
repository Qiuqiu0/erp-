<template>
  <div class="odSoContractReport">
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="getData" icon="el-icon-search">查询</el-button>
      <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
    </div>
    <head-search @getSearchs="getSearchs" ref="headSearch" class="auto-sibling"></head-search>
    <div class="button-div auto-sibling">
        <el-button @click="download()" v-if="$actionFlag(`F001`)"  icon="el-icon-download">导出</el-button>
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
        <el-table-column>
          <el-table-column type="index" width="50" show-overflow-tooltip label="序号"></el-table-column>
        </el-table-column>
        <el-table-column label="采购合同">
          <el-table-column prop="poNo" width="120" show-overflow-tooltip label="采购合同号"></el-table-column>
          <el-table-column prop="extCode" width="140" show-overflow-tooltip label="外部合同号"></el-table-column>
          <el-table-column prop="projectCode" width="120" show-overflow-tooltip label="项目号"></el-table-column>
          <el-table-column prop="fwContractNo" width="120" show-overflow-tooltip label="框架协议号"></el-table-column>
          <el-table-column prop="poType" show-overflow-tooltip label="合同类型">
           <template scope="scope">
              <span v-for="(item, index) in poTypeList" :key="index">
                <span v-if="item.dict_code == scope.row.poType">{{item.dict_value}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="contractStatus" show-overflow-tooltip label="单据状态">
            <template slot-scope="scope">
              <span>{{ contractStatusObj[scope.row.contractStatus]}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="companyName" width="170" show-overflow-tooltip label="公司"></el-table-column>
          <el-table-column prop="orgName" width="170"  show-overflow-tooltip label="部门"></el-table-column>
          <el-table-column prop="bizPersonName" width="130"  show-overflow-tooltip label="业务员"></el-table-column>
          <el-table-column prop="supplierName"  width="180" show-overflow-tooltip label="供应商"></el-table-column>
          <el-table-column prop="signTime" width="100" show-overflow-tooltip label="签订日期">
            <template slot-scope="scope">
              <span>{{ scope.row.signTime | time2Date }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="deliveryCutoffDate" width="100" show-overflow-tooltip label="最迟交货日期">
            <template slot-scope="scope">
              <span>{{ scope.row.deliveryCutoffDate | time2Date }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="contractEndDate" width="100" show-overflow-tooltip label="有效截止日期">
            <template slot-scope="scope">
              <span>{{ scope.row.contractEndDate | time2Date }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="currencyCode" show-overflow-tooltip label="业务币种"></el-table-column>
          <el-table-column prop="currencyRate" show-overflow-tooltip label="汇率"></el-table-column>
          <el-table-column prop="tradeCountryName" show-overflow-tooltip label="贸易国别"></el-table-column>
          <el-table-column prop="sumQty" show-overflow-tooltip label="统计数量">
              <template slot-scope="scope">
                <div class="content_right">
                    <span>{{$numberToFixed(scope.row.sumQty, 3)}}</span>
                </div>
                </template>
          </el-table-column>
          <el-table-column prop="contractAmtVat" width="130" show-overflow-tooltip label="业务币含税金额">
             <template slot-scope="scope">
               <div class="content_right">
                {{$moneyFormat(scope.row,scope.column,scope.row.contractAmtVat)}}
               </div>
              </template>
          </el-table-column>
          <!-- <el-table-column prop="overShortageAmt" show-overflow-tooltip label="溢短金额">
             <template slot-scope="scope">
               <div class="content_right">
                {{$moneyFormat(scope.row,scope.column,scope.row.overShortageAmt)}}
               </div>
              </template>
          </el-table-column> -->
        </el-table-column>
        <el-table-column label="在途">
          <el-table-column prop="arrivedQty" show-overflow-tooltip label="提单数量">
                <template slot-scope="scope">
                  <div class="content_right">
                    <span>{{$numberToFixed(scope.row.arrivedQty, 3)}}</span>
                  </div>
                </template>
          </el-table-column>
          <el-table-column prop="portQty" show-overflow-tooltip label="到港数量">
             <template slot-scope="scope">
               <div class="content_right">
                  <span>{{$numberToFixed(scope.row.portQty, 3)}}</span>
               </div>
              </template>
          </el-table-column>
          <el-table-column prop="clearanceQty" show-overflow-tooltip label="清关数量">
            <template slot-scope="scope">
              <div class="content_right">
                  <span>{{$numberToFixed(scope.row.clearanceQty, 3)}}</span>
              </div>
              </template>
          </el-table-column>
          <el-table-column prop="clearanceSecQty" show-overflow-tooltip label="第二数量">
            <template slot-scope="scope">
              <div class="content_right">
                  <span>{{$numberToFixed(scope.row.clearanceSecQty, 3)}}</span>
              </div>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="入库">
          <el-table-column prop="warehouseQty" show-overflow-tooltip label="入库数量">
            <template slot-scope="scope">
              <div class="content_right">
                  <span>{{$numberToFixed(scope.row.warehouseQty, 3)}}</span>
              </div>
              </template>
          </el-table-column>
          <el-table-column prop="warehouseAmt" width="130" show-overflow-tooltip label="入库业务币金额">
             <template slot-scope="scope">
               <div class="content_right">
                {{$moneyFormat(scope.row,scope.column,scope.row.warehouseAmt)}}
               </div>
              </template>
          </el-table-column>
          <el-table-column prop="warehouseSecQty" show-overflow-tooltip label="第二数量">
            <template slot-scope="scope">
              <div class="content_right">
                  <span>{{$numberToFixed(scope.row.warehouseSecQty, 3)}}</span>
              </div>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="发票">
          <el-table-column prop="standardInvoiceQty" show-overflow-tooltip label="已开票数量">
            <template slot-scope="scope">
              <div class="content_right">
                  <span>{{$numberToFixed(scope.row.standardInvoiceQty, 3)}}</span>
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
import headSearch from "./headSearch";
import { selectedRow } from "@/mixins/selectedRow.js";
import { getOdPoForeignContractReportList,getOdPoForeignContractTotal ,exportOdPoContractExecutive} from "@/api/reportQuery/report";
import { poTypeObj, contractStatusObj } from "../../dictionary";
import { poContractTypeOptions } from "@/api/reportQuery/selectOptions";
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
      tableData: [],
      searchOptions: {},
      poTypeList:[]
    };
  },
  created(){
    this.getOptions();
  },
  methods: {
    getOptions() {
      let data={dictNo:1014,bizCategory:0};
      poContractTypeOptions(data).then(res => {
        if (res.code === "success") {
          this.poTypeList = res.data;
        }
      });
    },
    getData() {
      this.$refs.headSearch.postData();
      this.getTotal()
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
      getOdPoForeignContractReportList(this.$queryFilter(params)).then(res => {
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
      getOdPoForeignContractTotal(this.$queryFilter(params)).then(res => {
        if (res.code === "success") {
          this.total = res.data[0];
          this.loading = false;
        }
      });
    },
        //导出
    download(){
      this.$refs.headSearch.postData();
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
      exportOdPoContractExecutive(this.$queryFilter(data)).then(res=>{
        if(res.code=="fail"){
          this.$openWarning(res.message);
        }else{
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename ="进口采购执行报表.xls";
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
        if (
          [
            "sumQty",  
            "arrivedQty",
            "portQty",
            "clearanceQty",
            "warehouseQty",
            "unwvQty",
            "standardInvoiceQty",
            "returnInvoiceQty",
            "returnInvoiceQty",
            "portSecQty",
            "warehouseSecQty"
          ].findIndex(it => it == key) !== -1
        ) {
          sums[index] =this.total? this.$sumTolFormat(this.total[key]):"";
        }else if(["contractAmtVat",
            "overShortageAmt","warehouseAmt", "unwvAmt"].findIndex(it => it == key) !== -1){
              if(this.total[key]){
                let res=parseFloat(this.total[key]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                sums[index]= this.$sumTolFormat(res);
              }
          
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
