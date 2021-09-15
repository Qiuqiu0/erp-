<template>
  <div class="creditNoteReclaims">
    <div class="button-div auto-sibling">
      <el-button class="query-button" icon="el-icon-search" @click="getData">查询</el-button>
      <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
      <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right">
        自定义
      </el-button>
    </div>
    <head-search :sort="sort" @getSearchs="getSearchs" ref="headSearch" class="auto-sibling" :searchList="searchList"></head-search>
    <!-- 表格 -->
    <div class="button-div auto-sibling">
      <el-button class="query-button" v-if="$actionFlag('F001')" @click="setReclaims(1)" icon="el-icon-attract">收款认领</el-button>
      <el-button @click="setReclaims(1)" v-if="$actionFlag('F002')" icon="el-icon-edit">修改</el-button>
      <el-button @click="setReclaims(2)" v-if="$actionFlag('F003')" icon="el-icon-finished">提交</el-button>
      <el-button @click="setReclaims(3)" v-if="$actionFlag('F004')" icon="el-icon-receiving">审核</el-button>
      <el-button @click="delReclaims" v-if="$actionFlag('F005')" icon="el-icon-data-line">删除</el-button>
      <el-button 
      icon="el-icon-thumb" 
      @click="goTree"
      v-if="$actionFlag('F006')"
      >生命树</el-button>
      <el-button @click="showEditPage('headerList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
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
        @sort-change="tableSortChange"
      >
        <el-table-column
            :key="item.key"
            :prop="item.key"
            :type="item.type"
            :label="item.label"
            :width="item.width"
            :show-overflow-tooltip="item.tooltip"
            v-for="item in fixHead"
            :sortable="item.sortable"

        >
        </el-table-column>

        <el-table-column
            :key="item.key"
            :prop="item.key"
            :type="item.type"
            :label="item.label"
            v-if="item.checked"
            :width="item.width"
            :show-overflow-tooltip="item.tooltip"
            v-for="item in headerList"
            :sortable="item.sortable"

        >
          <template scope="scope" v-if="item.temp">
            <span v-if="item.key==='sharedStatus'">{{sharedStatusObj[scope.row.sharedStatus]}}</span>
            <span v-if="item.key==='payeeDate'">{{ scope.row.payeeDate | time2Date }}</span>
            <span v-if="item.key==='payeeStatus'">{{ statusObj[scope.row.payeeStatus] }}</span>
            <span v-if="item.key==='payeeCategory'">{{ payeeCategoryObj[scope.row.payeeCategory] }}</span>
            <span v-if="item.key==='payeeType'">{{ typeObj[scope.row.payeeType]}}</span>
            <span v-if="item.key==='createdTime'">{{ scope.row.createdTime | time }}</span>
            <span v-if="item.key==='updatedTime'">{{ scope.row.updatedTime | time }}</span>
            <span v-if="item.key==='payeeAmtOrigin'">{{ scope.row.payeeAmtOrigin | $moneyFormat }}</span>
            <span v-if="item.key==='crashContent'">{{ crashContentObj[scope.row.crashContent] }}</span>
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
      <el-form label-width="50px" :model="checkDetail" ref="checkfForm">
        <el-form-item prop="status">
          <el-radio v-model="checkDetail.status" :label="10520015">审核通过</el-radio>
          <el-radio v-model="checkDetail.status" :label="10520020">审核驳回</el-radio>
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
    <!--   自定义搜索选项-->
    <edit-search-item
      v-if="editPage"
      :list="editList"
      :title="editKey==='searchList'?'自定义搜索条件':'自定义表格排序'"
        :editPage="editPage"
        @editCancel="editCancel"
        @editSure="editSure"
    ></edit-search-item>
  </div>
</template>
<script>
import {
  getFigatheringItems,
  delFigatheringDetail,
  checkFigatheringDetail,
  submitFigatheringDetail,
} from "@/api/creditManage/creditNoteReclaims";

import {
  payeeCategoryObj,
  typeObj,
  statusObj,
  sharedStatusObj,
  claimStatusObj,
  payeeTypeObj,
  crashContentObj,
} from "../../dictionary";
import headSearch from "./headSearch";
import { selectedRow } from "@/mixins/selectedRow.js";
import editSearchItem from "@/components/editSearchItem";
import {getFilter, setFilter} from "@/mixins/editCondition";

const AllSearch = [
  { key: "company", label: "公司", checked: true },
  { key: "branch", label: "部门", checked: true },
  { key: "payCompany", label: "付款单位", checked: true },
  { key: "accountYear", label: "会计年度", checked: true },
  { key: "gatheringNo", label: "收款单号", checked: true },
  { key: "creditDate", label: "收款日期", checked: true },
  { key: "payeeCategory", label: "收款类别", checked: true },
  { key: "sharedStatus", label: "认领状态", checked: true },
  { key: "payeeType", label: "收款方式", checked: true },
  { key: "crashContent", label: "款项内容", checked: true },
  { key: "coin", label: "币种", checked: true },
  { key: "createdName", label: "创建人", checked: true },
  { key: "createDate", label: "创建日期", checked: true },
]; //全部选项标签
const ALLHeader = [
  { key: "gatheringNo",label: "收款单号",tooltip: true, checked: true,width:120 },
  { key: "no",label: "收款单行号",tooltip: true, checked: true,width:100,sortable:true },
  { key: "companyName",label: "公司",tooltip: true, checked: true,width:170 },
  { key: "orgName",label: "部门",tooltip: true, checked: true,width:170 },
  { key: "payeeDate",label: "收款日期",tooltip: true, checked: true,width:100,temp:true,sortable:true },
  { key: "payCompanyName",label: "付款单位",tooltip: true, checked: true,width:170 },
  { key: "payeeCategory",label: "收款类别",tooltip: true, checked: true,width:100 ,temp:true},
  { key: "crashContent",label: "款项内容",tooltip: true, checked: true,width:100 ,temp:true},
  { key: "sharedStatus",label: "认领状态",tooltip: true, checked: true,temp:true },
  { key: "currencyCode",label: "业务币",tooltip: true, checked: true},
  { key: "payeeAmtOrigin",label: "收款金额",tooltip: true, checked: true,width:120 ,sortable:true,temp:true},
  { key: "payeeType",label: "收款方式",tooltip: true, checked: true,width:120 ,temp:true},
  { key: "remark",label: "备注",tooltip: true, checked: true},
  { key: "createdName",label: "创建人",tooltip: true, checked: true},
  { key: "createdTime",label: "创建时间",tooltip: true, checked: true,width:140,temp:true},
  { key: "updatedName",label: "修改人",tooltip: true, checked: true},
  { key: "updatedTime",label: "修改日期",tooltip: true, checked: true,width:140,temp:true},
]; //所有表头
export default {
  name: "creditNoteReclaims",
  mixins: [selectedRow, getFilter, setFilter],
  components: {
    headSearch,
    editSearchItem,
  },
  created() {
    this.getFilter();
  },
  watch:{
    // '$route'(){
    //   this.getData();
    // },
  },
  data() {
    return {
      sort: "",
      fixHead: [
        { type: "selection", key: "selection", checked: true, width: 60 },
        {
          type: "index",
          key: "index",
          label: "序号",
          tooltip: true,
          checked: true,
          width: 50,
        },
      ],
      editPage: false,
      searchList: AllSearch,
      headerList: ALLHeader,
      editKey: "",
      editList: [],
      navColor: {
        button: {
          backgroundColor: "", //按钮颜色
        },
      },
      page: {
        pageSize: 100,
        pageNum: 1,
        total: 0,
      },
      selectioned: "", //选中
      selectionedArray: [],
      checkShow: false,
      loading: false,
      tableData: [],
      searchOptions: {},
      payeeCategoryObj,
      typeObj,
      statusObj,
      sharedStatusObj,
      claimStatusObj,
      payeeTypeObj,
      crashContentObj,
      checkDetail: {
        status: 10520015,
      },
    };
  },
  methods: {
    //查看生命树
    goTree() {
      if (this.selectionedArray.length === 1) {
        sessionStorage.setItem("bizCode", this.selectionedArray[0].gatheringNo);
        sessionStorage.setItem("bizType", "FI_GATHERING");
        this.$router.push({
          path: "/index/home/tree",
          query: {
            bizCode: this.selectionedArray[0].gatheringNo,
            bizType: "FI_GATHERING",
          },
        });
        let obj = {
        url: "treeModel",
        baseUrl: "",
        label: "生命树",
        moduleCode: "",
        params: {},
        query: {
          bizCode:this.selectionedArray[0].gatheringNo,
          bizType:"FI_GATHERING"
        },
      };
      this.$store.commit("tabsListAdd", obj);
      } else {
        this.$openWarning("请选择一条合同查看生命树");
      }
    },
    tableSortChange(column) {
      const { prop, order } = column;
      if (order === "descending") {
        this.sort = `${prop} desc`;
      } else {
        this.sort = `${prop} asc`;
      }
      this.getData();
    },
    editCancel(list) {
      this.editPage = false;
      this[this.editKey] = list;
    },
    editSure(list) {
      this.editPage = false;
      this[this.editKey] = []; //必须先清空 再更新 否则不触发
      this.$nextTick(() => {
        this[this.editKey] = list;
        this.setFilter({
          filterJson: JSON.stringify(this.headerList),
          listJson: JSON.stringify(this.searchList),
        });
      });
    },
    showEditPage(key) {
      this.editKey = key;
      this.editPage = true;
      this.editList = this[key];
    },

    cell({ row, column, rowIndex, columnIndex }) {
      if (column.property == "payeeAmtOrigin") {
        return "rightTd";
      } else {
        return "";
      }
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
        ...this.searchOptions,
      };
      this.loading = true;
      getFigatheringItems(params).then((res) => {
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
    addReclaim() {
      this.$router.push({
        name: "reclaimDetail",
        params: { id: "0" },
      });
    },
    setReclaims(type) {
      //type 1 修改 2.提交 3.审核 0.删除
      let forbirdTipsObj = {
        1: "当前状态不允许修改",
        2: "非保证金转货款无需提交",
        3: "当前状态不允许审核",
        0: "当前状态不允许删除",
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
          //只有保存状态下，可进行修改，否则进行提示：当前状态不允许修改
          this.$router.push({
            name: "reclaimDetail",
            params: { id: this.selectioned.gatheringItemsId },
          });
          break;
        case 2:
          if (this.payeeCategoryObj[this.selectioned.category] != "C:保证金") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          //保存状态下，点击提交，提交后，状态为【已提交】；
          this.submitReclaims();
          break;
        case 3:
          if (this.payeeCategoryObj[this.selectioned.category] != "C:保证金") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          //在【保存】状态下，可进行【审核】；审核通过，状态为【已审核】；审核驳回，状态为【已驳回】；
          this.checkReclaims();
      }
    },
    delReclaims() {
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择收款单", type: "warning" });
        return;
      }
      this.$confirm("是否确定删除该单据?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delFigatheringDetail(this.selectionedArray).then((res) => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.queryData();
            }
          });
        })
        .catch(() => {});
    },
    submitReclaims() {
      this.$confirm("是否确定提交该单据?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        submitFigatheringDetail([
          {
            gatheringItemsId: this.selectioned.gatheringItemsId,
            status: this.selectioned.status,
            version: this.selectioned.version,
          },
        ]).then((res) => {
          if (res.code === "success") {
            this.$openSuccess(res.message);
            this.queryData();
          }
        });
      });
    },
    checkReclaims() {
      //审核通过 2 审核驳回 3
      this.checkShow = true;
    },
    submitCheck(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          checkFigatheringDetail([
            {
              gatheringItemsId: this.selectioned.gatheringItemsId,
              status: this.checkDetail.status,
              version: this.selectioned.version,
            },
          ]).then((res) => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              (this.checkShow = false), this.queryData();
            }
          });
        } else {
          return false;
        }
      });
    },
    selectedRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
  },
  // mounted() {
  //   this.queryData();
  // },
  // activated() {
  //   this.queryData();
  // }
};
</script>
<style lang="scss" >
.creditNoteReclaims {
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
