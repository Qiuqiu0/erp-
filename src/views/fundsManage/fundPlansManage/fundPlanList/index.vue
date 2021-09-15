<template>
  <div class="fundPlanList">
    <div class="button-div auto-sibling">
      <el-button class="query-button" icon="el-icon-search" @click="getData">查询</el-button>
      <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
    </div>
    <head-search @getSearchs="getSearchs" ref="headSearch" class="auto-sibling"></head-search>
    <!-- 表格 -->
    <div class="button-div auto-sibling">
      <el-button class="query-button" v-if="$actionFlag(`F001`)" @click="addPlan" icon="el-icon-folder-add">新增</el-button>
      <el-button @click="setPlan(1)" v-if="$actionFlag(`F002`)" icon="el-icon-edit">修改</el-button>
      <el-button @click="delPlan" v-if="$actionFlag(`F003`)" icon="el-icon-data-line">删除</el-button>
      <el-button @click="setPlan(2)" v-if="$actionFlag(`F004`)" icon="el-icon-finished">查看</el-button>
      <el-button @click="setPlan(3)" v-if="$actionFlag(`F005`)" icon="el-icon-receiving">提交</el-button>
      <el-button @click="setPlan(4)" v-if="$actionFlag(`F006`)" icon="el-icon-data-line">审核</el-button>
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
        v-loading="loading"
        :cell-class-name="cell"
      >
        <el-table-column type="selection" width="40" show-overflow-tooltip></el-table-column>
        <el-table-column type="index" width="50" show-overflow-tooltip label="序号"></el-table-column>
        <el-table-column prop="planCode" width="120" show-overflow-tooltip label="资金计划编号"></el-table-column>
        <el-table-column prop="companyCode" width="100" show-overflow-tooltip label="公司代码"></el-table-column>
        <el-table-column prop="companyName" width="170" show-overflow-tooltip label="公司名称"></el-table-column>
        <el-table-column prop="orgCode" width="100" show-overflow-tooltip label="部门代码"></el-table-column>
        <el-table-column prop="orgName" width="170" show-overflow-tooltip label="部门名称"></el-table-column>
        <el-table-column prop="accountYear" width="100" show-overflow-tooltip label="会计年度"></el-table-column>
        <el-table-column prop="accountMonth" width="100" show-overflow-tooltip label="月份">
          <template slot-scope="scope">
            <span>{{ scope.row.accountMonth?scope.row.accountMonth:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="accountWeek" width="100" show-overflow-tooltip label="周数">
          <template slot-scope="scope">
            <span>{{ scope.row.accountWeek?scope.row.accountWeek:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="planCirclePeriod" width="100" show-overflow-tooltip label="计划周期">
          <template slot-scope="scope">
            <span>{{ planTypeObj[scope.row.planCirclePeriod] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="planStatus" width="100" show-overflow-tooltip label="计划周期">
          <template slot-scope="scope">
            <span>{{ planStatusObj[scope.row.planStatus] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="planReceiveAmtBase"
          width="150"
          show-overflow-tooltip
          :formatter="$moneyFormat" 
          label="计划收款总额(本位币)"
        ></el-table-column>
        <el-table-column
          prop="planPaymentAmtBase"
          width="150"
          :formatter="$moneyFormat" 
          show-overflow-tooltip
          label="计划付款总额(本位币)"
        ></el-table-column>
        <el-table-column
          prop="planDifferenceAmtBase"
          width="150"
          :formatter="$moneyFormat" 
          show-overflow-tooltip
          label="计划收付差额(本位币)"
        ></el-table-column>
        <el-table-column prop="createdName" show-overflow-tooltip label="创建人"></el-table-column>
        <el-table-column prop="createdTime" width="140" show-overflow-tooltip label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedName" show-overflow-tooltip label="修改人"></el-table-column>
        <el-table-column prop="updatedTime" width="140" show-overflow-tooltip label="修改日期">
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
    <!--审核弹窗-->
    <el-dialog :visible.sync="checkShow" width="400px">
      <div slot="title" class="el-dialog__title" style="text-align:left;font-size:18px;">审核提示</div>
      <el-form label-width="70px" :model="checkDetail" ref="checkfForm">
        <el-form-item prop="status">
          <el-radio v-model="checkDetail.status" :label="1">审核通过</el-radio>
          <el-radio v-model="checkDetail.status" :label="0">审核驳回</el-radio>
        </el-form-item>
        <el-form-item prop="approvalOpinion" label="审批意见">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="checkDetail.approvalOpinion"
            class="el-inputs"
            placeholder="请输入"
            size="small"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="button-div2">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-check"
          @click="submitCheck('checkfForm')"
        >确定</el-button>
        <el-button size="small" icon="el-icon-close" @click="checkShow = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getFundPlanList,
  delFundPlan,
  submitFundPlan,
  checkFundPlan
} from "@/api/fundPlansManage/fundPlanList";
import { planTypeObj, planStatusObj } from "../../dictionary";
import headSearch from "./headSearch";
import { selectedRow } from "@/mixins/selectedRow.js";
export default {
  name: "fundPlanList",
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
      cell({row, column, rowIndex, columnIndex}) {
          if(column.property=="planReceiveAmtBase" || column.property=="planPaymentAmtBase"
          || column.property=="planDifferenceAmtBase"){
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
      getFundPlanList(this.$queryFilter(params)).then(res => {
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
    addPlan() {
      this.$router.push({
        name: "fundPlanDetail",
        params: { id: "0", editFlag: 1, type: 1 }
      });
    },
    setPlan(type) {
      //type 1 修改 2查看 3.提交 4.审核 0.删除
      let forbirdTipsObj = {
        1: "当前状态不允许修改",
        3: "当前状态不允许提交",
        4: "当前状态不允许审核",
        0: "当前状态不允许删除"
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
          //只有保存 已驳回 状态下，可进行修改，否则进行提示：当前状态不允许修改
          if (
            ["已保存", "已驳回"].findIndex(
              it => it === this.planStatusObj[this.selectioned.planStatus]
            ) === -1
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "fundPlanDetail",
            params: { id: this.selectioned.planId, editFlag: 1, type: 1 }
          });
          break;
        case 2: //planStatusObj //任何状态都能查看
          this.$router.push({
            name: "fundPlanDetail",
            params: { id: this.selectioned.planId, editFlag: 0, type: 1 }
          });
          break;
        case 3: //在已保存 已驳回状态下，可进行【提交】
          if (
            ["已保存", "已驳回"].findIndex(
              it => it === this.planStatusObj[this.selectioned.planStatus]
            ) === -1
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.submitPlan();
          break;
        case 4:
          //在审核中状态下，可进行【提交】
          if (this.planStatusObj[this.selectioned.planStatus] != "审核中") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.checkPlan();
          break;
      }
    },
    delPlan() {
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择单据", type: "warning" });
        return;
      }
      if (
        !this.selectionedArray.every(
          item =>
            this.planStatusObj[item.planStatus] === "已保存" ||
            this.planStatusObj[item.planStatus] === "已驳回"
        )
      ) {
        this.$message({
          message: "只有已驳回或已驳回状态的单据可删除,请重新选择",
          type: "warning"
        });
        return;
      }
      this.$confirm("是否确定删除该单据?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let template = JSON.parse(JSON.stringify(this.selectionedArray));
          let params = [];
          template.forEach(item => {
            let i = { planId: item.planId, version: item.version };
            params.push(i);
          });
          delFundPlan(params).then(res => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.queryData();
            }
          });
        })
        .catch(() => {});
    },
    submitPlan() {
      this.$confirm("是否确定提交该单据?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        submitFundPlan({
          planId: this.selectioned.planId,
          planStatus: this.selectioned.planStatus,
          version: this.selectioned.version
        }).then(res => {
          if (res.code === "success") {
            this.$openSuccess(res.message);
            this.queryData();
          }
        });
      });
    },
    checkPlan() {
      //审核通过 2 审核驳回 3
      this.checkShow = true;
    },
    submitCheck(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          checkFundPlan({
            planId: this.selectioned.planId,
            approveStatus: this.checkDetail.status,
            approvalOpinion: this.checkDetail.approvalOpinion,
            version: this.selectioned.version
          }).then(res => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              (this.checkShow = false), this.queryData();
            }
          });
        } else {
          return false;
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
.fundPlanList {
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
