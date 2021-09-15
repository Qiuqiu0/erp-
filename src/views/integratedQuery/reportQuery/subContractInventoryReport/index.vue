<template>
  <div class="subContractInventoryReport content-div" >
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
        <el-table-column>
          <el-table-column type="index" width="50" show-overflow-tooltip label="序号"></el-table-column>
        </el-table-column>
        <!-- <el-table-column label="用户">
          <el-table-column prop="createdName" width="120" show-overflow-tooltip ></el-table-column>
        </el-table-column> -->
        <el-table-column>
          <el-table-column prop="poType" show-overflow-tooltip label="合同类型">
            <template slot-scope="scope">
              <div v-for="item in poTypeList" :key="item">
                <span v-if="item.dict_code == scope.row.poType">
                {{ item.dict_value }}
              </span>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="仓库">
          <el-table-column prop="supplierName"  width="180" show-overflow-tooltip label="供应商"></el-table-column>
          <!-- <el-table-column prop="warehouseArea" width="120" show-overflow-tooltip label="区域"></el-table-column> -->
          <el-table-column prop="warehouseName" width="180" show-overflow-tooltip label="仓库"></el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column prop="extCode" width="120" show-overflow-tooltip label="合同号"></el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column prop="goodsName" width="120" show-overflow-tooltip label="品名"></el-table-column>
        </el-table-column>
        <el-table-column label="船名">
          <el-table-column prop="shipName" width="120" show-overflow-tooltip ></el-table-column>
        </el-table-column>
        <el-table-column label="入库时间">
          <el-table-column prop="batchInvTime" width="180" label="(分组，存在同批次多次入库)" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.batchInvTime | time2Date }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="库龄">
          <el-table-column prop="warehouseAge" show-overflow-tooltip label="天数"></el-table-column>
        </el-table-column>
        <el-table-column label="入库数">
          <el-table-column  show-overflow-tooltip label="第一单位">
             <template slot-scope="scope">
              <div class="content_right">
                  <span>{{$numberToFixed(scope.row.batchInvQtyS, 3)}}</span>
              </div>
              </template>
          </el-table-column>
          <el-table-column prop="batchInvQtySSec" show-overflow-tooltip label="第二数量">
            <template slot-scope="scope">
              <div class="content_right">
                  <span>{{$numberToFixed(scope.row.batchInvQtySSec, 3)}}</span>
              </div>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="累计提货数">
          <el-table-column  show-overflow-tooltip label="第一单位">
            <template slot-scope="scope">
              <div class="content_right">
                  <span>{{$numberToFixed(scope.row.outQty, 3)}}</span>
              </div>
              </template>
          </el-table-column>
          <el-table-column prop="outQtySec" show-overflow-tooltip label="第二数量">
            <template slot-scope="scope">
              <div class="content_right">
                  <span>{{$numberToFixed(scope.row.outQtySec, 3)}}</span>
              </div>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="库存数">
          <el-table-column prop="invQtyS" show-overflow-tooltip label="第一单位">
            <template slot-scope="scope">
              <div class="content_right">
                  <span>{{$numberToFixed(scope.row.invQtyS, 3)}}</span>
              </div>
              </template>
          </el-table-column>
          <el-table-column prop="secUnitQty" show-overflow-tooltip label="第二数量">
            <template slot-scope="scope">
              <div class="content_right">
                  <span>{{$numberToFixed(scope.row.secUnitQty, 3)}}</span>
              </div>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="库存金额">
          <el-table-column prop="invAmt" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="content_right">
                {{$moneyFormat(scope.row,scope.column,scope.row.invAmt)}}
              </div>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="暂不可提数">
          <el-table-column  show-overflow-tooltip label="第一单位">
            <template slot-scope="scope">
              <div class="content_right">
                {{$moneyFormat(scope.row,scope.column,scope.row.reservedQtyS)}}
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
import {
  getSubContractInventoryReport,
  getSubContractInventoryReportTotal,
  poType,
  exportContractInventoryList
} from "@/api/reportQuery/report";
import { poTypeObj } from "../../dictionary";
import {Loading } from "element-ui";
export default {
  name: "subContractInventoryReport",
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
      poTypeObj,
      poTypeList:[],//合同类型
      tableData: [],
      searchOptions: {}
    };
  },
  created(){
    this.getPoType();
  },
  methods: {
    getPoType(){
      let data={
        dictNo: 1014
      }
      poType(data).then(res=>{
        this.poTypeList=res.data;
      })
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
      getSubContractInventoryReport(this.$queryFilter(params)).then(res => {
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
      //this.loading = true;
      getSubContractInventoryReportTotal(this.$queryFilter(params)).then(res => {
        if (res.code === "success") {
          this.total = res.data;
          //this.loading = false;
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
      exportContractInventoryList(this.$queryFilter(data)).then(res=>{
        if(res.code=="fail"){
          this.$openWarning(res.message);
        }else{
          const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename ="分合同库存报表.xls";
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
            "invQtyS",
            "batchInvQtySSec",
            "outQtySec",
            "secUnitQty"
          ].findIndex(it => it == key) !== -1
        ) {
          sums[index] = this.total[key]?this.total[key]:'';
        }else if(["invAmt"].findIndex(it => it == key) !== -1){
          let res =this.total?parseFloat(this.total[key]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'):'';
          sums[index]=this.$sumTolFormat(res);
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
.subContractInventoryReport {
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
