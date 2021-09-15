<template>
  <div class="fiSettleApplyList">
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="getData" icon="el-icon-search">查询</el-button>
      <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
    </div>
    <head-search @getSearchs="getSearchs" ref="headSearch" class="auto-sibling"></head-search>
    <!-- 表格 -->
    <div class="button-div auto-sibling">
      <el-button @click="addDemandPayment" v-if="$actionFlag('F001')" icon="el-icon-folder-add">新增</el-button>
      <el-button @click="delApply" v-if="$actionFlag('F004')" icon="el-icon-delete">删除</el-button>
      <el-button @click="setFiSettleApply(1)" v-if="$actionFlag('F002')" icon="el-icon-edit">修改</el-button>
      <el-button @click="setFiSettleApply(2)" v-if="$actionFlag('F003')" icon="el-icon-data-line">查看</el-button>
      <el-button @click="setFiSettleApply(3)" v-if="$actionFlag('F005')" icon="el-icon-bank-card">展期</el-button>
      <el-button @click="setFiSettleApply(4)" v-if="$actionFlag('F006')" icon="el-icon-bank-card">违约</el-button>
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
        class="el-table"
        :cell-class-name="cell"
        v-loading="loading"
      >
        <el-table-column type="selection" show-overflow-tooltip width="45" align="center"></el-table-column>
        <el-table-column type="index" width="50" show-overflow-tooltip label="序号"></el-table-column>
        <el-table-column prop="execNo" width="130" show-overflow-tooltip label="执行编号"></el-table-column>
        <el-table-column prop="settleApplyCode" width="130" show-overflow-tooltip label="申请单据编号"></el-table-column>
        <el-table-column prop="companyName" width="170" show-overflow-tooltip label="公司"></el-table-column>
        <el-table-column prop="orgName" width="170" show-overflow-tooltip label="部门"></el-table-column>
        <el-table-column prop="salesType" show-overflow-tooltip label="类型">
          <template slot-scope="scope">
            <span>{{ salesTypeObj[scope.row.salesType] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="executeType" show-overflow-tooltip label="执行类型">
          <template slot-scope="scope">
            <span>{{ executeTypeObj[scope.row.executeType] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="execStatus" show-overflow-tooltip label="状态">
          <template slot-scope="scope">
            <span>{{ salesStatusObj[scope.row.execStatus] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lockCurrencyCode" width="100" show-overflow-tooltip label="锁汇币别"></el-table-column>
        <el-table-column prop="lockAmt" :formatter="$moneyFormat" width="120" show-overflow-tooltip label="锁汇金额"></el-table-column>
        <el-table-column prop="leftAmt" :formatter="$moneyFormat" width="120" show-overflow-tooltip label="剩余金额"></el-table-column>
        <el-table-column prop="createdName" show-overflow-tooltip label="创建人"></el-table-column>
        <el-table-column prop="createdTime" width="140" show-overflow-tooltip label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedName" show-overflow-tooltip label="修改人"></el-table-column>
        <el-table-column prop="updatedTime" width="140" show-overflow-tooltip label="修改时间">
          <template slot-scope="scope">
            <span>{{ scope.row.updatedTime | time }}</span>
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
import { mapMutations } from "vuex";
import {
  getFiSettleExecuteList,
  delFiSettleExecute,
} from "@/api/fiSettleManage/fiSettleExecuteList";
import { salesTypeObj, salesStatusObj, executeTypeObj } from "../../dictionary";
import {selectedRow} from "@/mixins/selectedRow.js"
export default {
  name: "fiSettleApplyList",
  mixins:[selectedRow],
  components: {
    headSearch
  },
  data() {
    return {
      salesTypeObj,
      salesStatusObj,
      executeTypeObj,
      page: {
        pageSize: 100,
        pageNum: 1,
        total: 0
      },
      selectioned: "", //选中
      selectionedArray: [],
      loading: false,
      tableData: []
    };
  },
  methods: {
    cell({row, column, rowIndex, columnIndex}) {
    //第八列添加 red 类
        if(column.property=="lockAmt" || column.property=="leftAmt"){
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
        rows: this.page.pageSize,
        ...this.searchOptions
      };
      this.loading = true;
      getFiSettleExecuteList(params).then(res => {
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
    addDemandPayment() {
      this.$router.push({
        name: "fiSettleExecuteDetail",
        params: { editFlag: 1, id: 0 ,type: 0}
      });
    },
    setFiSettleApply(type) {
      //type 1 修改 2查看 3展期 4违约
      let forbirdTipsObj = {
        3: "违约单据不可进行展期",
        4: "展期单据不可进行违约"
      };
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择单据", type: "warning" });
        return;
      } else if (this.selectionedArray.length > 1) {
        this.$message({ message: "最多选择一条单据", type: "warning" });
        return;
      } else {
        this.selectioned = this.selectionedArray[0];
      }
      switch (type) {
        case 1:
          //任何状态都能修改
          this.$router.push({
            name: "fiSettleExecuteDetail",
            params: { editFlag: 1, id: this.selectioned.executeId,type: 1 }
          });
          break;
        case 2:
          //任何状态都能查询
          this.$router.push({
            name: "fiSettleExecuteDetail",
            params: { editFlag: 0, id: this.selectioned.executeId ,type: 2 }
          });
          break;
        case 3:
          //1、没有违约记录的执行单据，可进行展期操作，否则进行提示：违约单据不可进行展期；
          if (executeTypeObj[this.selectioned.executeType] === "违约") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "fiSettleExecuteDetail",
            params: { editFlag: 1, id: this.selectioned.executeId, type: 3 }
          });
          break;
        case 4:
          //1、没有展期记录的执行单据，可进行违约操作，否则进行提示：展期单据不可进行违约；
          if (executeTypeObj[this.selectioned.executeType] === "展期") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "fiSettleExecuteDetail",
            params: { editFlag: 1, id: this.selectioned.executeId, type: 4 }
          });
          break;
        default:
          break;
      }
    },
    delApply() {
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择申请单", type: "warning" });
        return;
      }
      this.$confirm("是否确定删除该执行单?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delFiSettleExecute(this.selectionedArray).then(res => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.queryData();
            }
          });
        })
        .catch(() => {});
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
<style lang="scss">
.fiSettleApplyList {
  .input-div .el-col .el-input__icon {
    line-height: 20px;
  }
  .input-div label {
    width: 30%;
    vertical-align: middle;
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
