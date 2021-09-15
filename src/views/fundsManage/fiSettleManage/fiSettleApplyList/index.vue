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
      <el-button @click="setFiSettleApply(3)" v-if="$actionFlag('F005')" icon="el-icon-finished">提交</el-button>
      <el-button @click="setFiSettleApply(4)" v-if="$actionFlag('F006')" icon="el-icon-receiving">审批</el-button>
      <el-button
        @click="setFiSettleApply(5,'执行')"
        v-if="$actionFlag('F007')"
        icon="el-icon-bank-card"
      >执行</el-button>
      <el-button
        @click="setFiSettleApply(5,'展期')"
        v-if="$actionFlag('F008')"
        icon="el-icon-bank-card"
      >展期</el-button>
      <el-button
        @click="setFiSettleApply(5,'违约')"
        v-if="$actionFlag('F009')"
        icon="el-icon-bank-card"
      >违约</el-button>
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
        <el-table-column type="selection" show-overflow-tooltip width="45" align="center"></el-table-column>
        <el-table-column type="index" width="50" show-overflow-tooltip label="序号"></el-table-column>
        <el-table-column prop="settleApplyCode" width="130" show-overflow-tooltip label="申请单据编号"></el-table-column>
        <el-table-column prop="companyName" width="170" show-overflow-tooltip label="公司"></el-table-column>
        <el-table-column prop="orgName" width="170" show-overflow-tooltip label="部门"></el-table-column>
        <el-table-column prop="salesType" show-overflow-tooltip label="类型">
          <template slot-scope="scope">
            <span>{{ salesTypeObj[scope.row.salesType] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="salesStatus" show-overflow-tooltip label="状态">
          <template slot-scope="scope">
            <span>{{ salesStatusObj[scope.row.salesStatus] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lockCurrencyCode" show-overflow-tooltip label="锁汇币别"></el-table-column>
        <el-table-column prop="lockAmt" 
          :formatter="$moneyFormat" width="120" show-overflow-tooltip label="锁汇金额"></el-table-column>
        <el-table-column prop="leftAmt" :formatter="$moneyFormat" width="120" show-overflow-tooltip label="剩余金额"></el-table-column>
        <el-table-column prop="referCurrencyCode" width="100" show-overflow-tooltip label="参考币别"></el-table-column>
        <el-table-column prop="referAmtL" width="170" show-overflow-tooltip label="参考金额">
          <template slot-scope="scope">
            <span>{{ scope.row.referAmtL }}-{{ scope.row.referAmtH }}</span>
          </template>
        </el-table-column>
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
    <!--审核弹窗-->
    <el-dialog :visible.sync="checkShow" width="400px" :show-close="false">
      <div slot="title" class="el-dialog__title" style="text-align:left;font-size:18px;">审核提示</div>
      <el-form label-width="50px" :model="checkDetail" ref="checkfForm">
        <el-form-item prop="status">
          <el-radio v-model="checkDetail.status" :label="10730015">审核通过</el-radio>
          <el-radio v-model="checkDetail.status" :label="10730020">审核驳回</el-radio>
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
import headSearch from "./headSearch";
import { mapMutations } from "vuex";
import {
  getFiSettleApplyList,
  delFiSettleApply,
  checkFiSettleApply,
  submitFiSettleApply,
  fisettleapplyJudge
} from "@/api/fiSettleManage/fiSettleApplyList";
import { salesTypeObj, salesStatusObj } from "../../dictionary";
import { selectedRow } from "@/mixins/selectedRow.js";
export default {
  name: "fiSettleApplyList",
  mixins: [selectedRow],
  components: {
    headSearch
  },
  data() {
    return {
      salesTypeObj,
      salesStatusObj,
      page: {
        pageSize: 100,
        pageNum: 1,
        total: 0
      },
      selectioned: "", //选中
      selectionedArray: [],
      loading: false,
      checkShow: false, //审核窗口
      tableData: [],
      checkDetail: {
        status: 1
      }
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
      getFiSettleApplyList(params).then(res => {
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
        name: "fiSettleApplyDetail",
        params: { editFlag: 1, id: 0 }
      });
    },
    setFiSettleApply(type, name) {
      //type 1 修改 0 删除 2查看 3提交 4审核 5快捷付款
      let proFix = name ? name : "";
      let forbirdTipsObj = {
        1: "当前状态不允许修改",
        0: "当前状态不允许删除",
        3: "当前状态不允许提交",
        4: "当前状态不允许审核",
        5: `当前状态不允许${proFix}`
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
          //只有【保存】或【已驳回】状态下，可进行修改，否则进行提示：当前状态不允许修改
          if (
            salesStatusObj[this.selectioned.salesStatus] != "保存" &&
            salesStatusObj[this.selectioned.salesStatus] != "已驳回"
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "fiSettleApplyDetail",
            params: { editFlag: 1, id: this.selectioned.settleApplyId }
          });
          break;
        case 2:
          //任何状态都能查询
          this.$router.push({
            name: "fiSettleApplyDetail",
            params: { editFlag: 0, id: this.selectioned.settleApplyId }
          });
          break;
        case 3:
          //只有【保存】或【已驳回】状态下，可进行提交，否则进行提示：当前状态不允许提交
          if (
            salesStatusObj[this.selectioned.salesStatus] != "保存" &&
            salesStatusObj[this.selectioned.salesStatus] != "已驳回"
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.submitApply();
          break;
        case 4:
          //只有在【已提交】状态下，可进行【审核】；否则进行提示：当前状态不允许审核
          if (salesStatusObj[this.selectioned.salesStatus] != "已提交") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.checkShow = true;
          break;
        case 5:
          //1、只有【已审核】状态下可进行执行、展期、违约 操作，否则进行提示：当前状态不允许付款；
          if (
            salesStatusObj[this.selectioned.salesStatus] != "已审批" &&
            salesStatusObj[this.selectioned.salesStatus] != "已执行"
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          let obj = {
            url: "fiSettleExecuteDetail",
            baseUrl: "fiSettleExecuteList",
            label: "结售汇执行",
            moduleCode: "T0040102"
          };
          //type 0执行 3展期 4违约
          if (salesStatusObj[this.selectioned.salesStatus] === "已审批") {
            let typeObj = { 执行: 0, 展期: 3, 违约: 4 };
            if(proFix!=="执行"){
              this.$message({ message: forbirdTipsObj[type], type: "warning" });return;
            }
            this.$store.commit("tabsListAdd", obj);
            this.$router.push({
              name: "fiSettleExecuteDetail",
              params: {
                editFlag: 1,
                id: 0,
                type: typeObj[proFix],
                settleApply: this.selectioned
              }
            });
          } else {
            // tag 0执行 1 展期 2 违约
            let tageObj = { 执行: 1, 展期: 3, 违约: 4 };
            fisettleapplyJudge({
              ...this.selectioned,
              tag: tageObj[proFix]
            })
              .then(res => {
                if (res.code === "success") {
                  this.$store.commit("tabsListAdd", obj);
                  this.$router.push({
                    name: "fiSettleExecuteDetail",
                    params: {
                      editFlag: 1,
                      id: res.data.executeId,
                      type: tageObj[proFix]
                    }
                  });
                } else {
                  this.$message({
                    message: "当前状态不能" + proFix,
                    type: "warning"
                  });
                }
              })
              .catch(err => {
                this.$message({
                  message: "当前状态不能" + proFix,
                  type: "warning"
                });
              });
          }
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
      if (
        !this.selectionedArray.every(
          item =>
            this.salesStatusObj[item.salesStatus] === "保存" ||
            this.salesStatusObj[item.salesStatus] === "已驳回"
        )
      ) {
        this.$message({
          message: "只有保存和状态已驳回的单据可删除,请重新选择",
          type: "warning"
        });
        return;
      }
      this.$confirm("是否确定删除该申请单?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delFiSettleApply(this.selectionedArray).then(res => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.queryData();
            }
          });
        })
        .catch(() => {});
    },
    submitApply() {
      this.$confirm("是否确定提交该申请单", "提交提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        submitFiSettleApply([this.selectioned]).then(res => {
          if (res.code === "success") {
            this.$openSuccess(res.message);
            this.queryData();
          }
        });
      });
    },
    submitCheck(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          checkFiSettleApply([
            {
              settleApplyId: this.selectioned.settleApplyId,
              status: this.checkDetail.status,
              salesStatus: this.selectioned.salesStatus,
              version: this.selectioned.version
            }
          ]).then(res => {
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
