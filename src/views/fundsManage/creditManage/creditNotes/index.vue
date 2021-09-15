<template>
  <div class="creditNotes">
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="getData" icon="el-icon-search">查询</el-button>
      <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
      <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right">
        自定义
      </el-button>
    </div>
    <head-search :sort="sort" @getSearchs="getSearchs" ref="headSearch" class="auto-sibling" :searchList="searchList"></head-search>
    <!-- 表格 -->
    <div class="button-div auto-sibling">
      <el-button
        class="query-button"
        v-if="$actionFlag('F001')"
        @click="addCredit"
        icon="el-icon-folder-add"
      >新增</el-button>
      <el-button @click="setCredit(1)" v-if="$actionFlag('F002')" icon="el-icon-edit">修改</el-button>
      <el-button @click="delCredit" v-if="$actionFlag('F003')" icon="el-icon-delete">删除</el-button>
      <el-button @click="setCredit(2)" v-if="$actionFlag('F004')" icon="el-icon-data-line">查看</el-button>
      <el-button @click="setCredit(3)" v-if="$actionFlag('F005')" icon="el-icon-money">过账</el-button>
      <el-button @click="batchPosting" v-if="$actionFlag('F009')"  icon="el-icon-money">批量过账</el-button>
      <el-button @click="setCredit(4)" v-if="$actionFlag('F006')" icon="el-icon-document-delete">冲销</el-button>
      <el-button @click="setCredit(5)" v-if="$actionFlag('F007')" icon="el-icon-mouse">部门认领</el-button>
      <el-button @click="exportTable" v-if="$actionFlag('F008')" icon="el-icon-download" >导出</el-button>
      <el-button @click="changeIsInterest"  icon="el-icon-download">计息调整</el-button>
      <el-button
      icon="el-icon-thumb"
      @click="goTree"
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
         show-summary
        :summary-method="getSummaries"
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
            <span v-if="item.key==='payeeDate'">{{ scope.row.payeeDate | time2Date }}</span>
            <span v-if="item.key==='payeeStatus'">{{ statusObj[scope.row.payeeStatus] }}</span>
            <span v-if="item.key==='isConfirmed'">{{ scope.row.isConfirmed == 1?'是':'否' }}</span>
            <span v-if="item.key==='isInterest'">{{ scope.row.isInterest == 1?'是':'否' }}</span>
            <span v-if="item.key==='payeeCategory'">{{ payeeCategoryObj[scope.row.payeeCategory] }}</span>
            <span v-if="item.key==='payeeType'">{{ typeObj[scope.row.payeeType]}}</span>
            <span v-if="item.key==='currencyRateRmb'">{{ $numberToFixed(scope.row.currencyRateRmb,4)}}</span>
            <span v-if="item.key==='postDate'">{{ scope.row.postDate | time2Date }}</span>
            <span v-if="item.key==='unDate'">{{ scope.row.unDate | time2Date }}</span>
            <span v-if="item.key==='createdTime'">{{ scope.row.createdTime | time2Date }}</span>
            <span v-if="item.key==='payeeAmtOrigin'">{{ scope.row.payeeAmtOrigin | $moneyFormat }}</span>
            <span v-if="item.key==='payeeAmtBase'">{{ scope.row.payeeAmtBase | $moneyFormat }}</span>
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
    <!--冲销弹窗-->
    <el-dialog
      v-if="writeOffShow"
      :visible.sync="writeOffShow"
      width="400px"
      append-to-body
      :show-close="false"
     :close-on-click-modal="false"
    >
      <span
        slot="title"
        class="el-dialog__title"
        v-if="selectioned"
      >{{ selectioned.gatheringNo }}</span>
      <el-form :model="writeOff" :rules="rules" label-width="100px" ref="writeOffForm">
        <el-form-item label="冲销原因" prop="region">
          <write-off-reason-select :writeOffReason.sync="writeOff.region"></write-off-reason-select>
        </el-form-item>
        <el-form-item label="冲销日期" prop="date">
          <accountingDate-select
            :companyId="selectioned.companyId"
            :accountingDate.sync="writeOff.date"
          ></accountingDate-select>
        </el-form-item>
      </el-form>
      <div class="button-div2">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-check"
          @click="submitWriteOff('writeOffForm')"
        >确定</el-button>
        <el-button size="small" icon="el-icon-close" @click="writeOffShow = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 过账弹窗 -->
    <post-popup
      v-if="postPopupShow"
      :tipShow="postPopupShow"
      @tipsCancle="postPopupCancel"
      @tipsSure="postPopupSure"
      :selectioned="this.selectioned"
    ></post-popup>
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
import headSearch from "./headSearch";
import writeOffReasonSelect from "@/views/fundsManage/conponents/writeOffReasonSelect";
import accountingDateSelect from "@/views/fundsManage/conponents/accountingDateSelect";
import postPopup from "@/views/fundsManage/conponents/postPopup";
import { selectedRow } from "@/mixins/selectedRow.js";
import {
  getCreditList,
  delCredit,
  postCredit,
  writeOffCredit,
  exportFiGatheringList,
  selectFiGatheringSum,
  postingFiGatheringBatch,
  turnFiGatheringInterest
} from "@/api/creditManage/creditNotes";
import {
  payeeCategoryObj,
  typeObj,
  statusObj,
  payeeTypeObj,
  crashContentObj,
} from "../../dictionary";
import editSearchItem from "@/components/editSearchItem";
import {getFilter, setFilter} from "@/mixins/editCondition";
import { exportData } from "@/mixins/export.js";
const AllSearch = [
  { key: "company", label: "公司", checked: true },
  { key: "branch", label: "部门", checked: true },
  { key: "customer", label: "客户", checked: true },
  { key: "supplier", label: "供应商", checked: true },
  { key: "gatheringNo", label: "收款单号", checked: true },
  { key: "creditDate", label: "收款日期", checked: true },
  { key: "accountYear", label: "会计年度", checked: true },
  { key: "payeeCategory", label: "收款类别", checked: true },
  { key: "payeeStatus", label: "收款单状态", checked: true },
  { key: "payeeType", label: "收款方式", checked: true },
  { key: "coin", label: "币种", checked: true },
  { key: "instrumentBillNo", label: "票据台账号", checked: true },
  { key: "createdName", label: "创建人", checked: true },
  { key: "createDate", label: "创建日期", checked: true },
  { key: "isConfirmed", label: "是否认领", checked: true },
  { key: "isInterest", label: "是否计息", checked: true },
  { key: "warrantCode", label: "凭证号", checked: true },
  { key: "warrantMonth", label: "期间", checked: true },
  { key: "writeoffWarrantCode", label: "冲销凭证号", checked: true },
  { key: "writeoffWarrantMonth", label: "冲销期间", checked: true },
  { key: "payAmtTotal", label: "收款区间", checked: true },

]; //全部选项标签
const ALLHeader = [
  { key: "companyName",label: "公司",tooltip: true, checked: true,width:170 },
  { key: "orgName",label: "部门",tooltip: true, checked: true,width:170 },
  { key: "accountYear",label: "会计年度",tooltip: true, checked: true},
  { key: "gatheringNo",label: "收款单号",tooltip: true, checked: true,width:120,sortable:true },
  { key: "payeeDate",label: "收款日期",tooltip: true, checked: true,width:100,temp:true,sortable:true  },
  { key: "payCompanyName",label: "付款单位",tooltip: true, checked: true,width:170 },
  { key: "payeeStatus",label: "状态",tooltip: true, checked: true,temp:true },
  { key: "isInterest",label: "是否计息",tooltip: true, checked: true,temp:true },
  { key: "isConfirmed",label: "是否认领",tooltip: true, checked: true,temp:true },
  { key: "currencyCode",label: "币别",tooltip: true, checked: true,width:90 },
  { key: "payeeAmtOrigin",label: "收款金额",tooltip: true, checked: true,width:120 ,sortable:true,temp:true },
  { key: "payeeAmtBase",label: "收款本位币",tooltip: true, checked: true,width:120 ,temp:true},
  { key: "payeeCategory",label: "收款类别",tooltip: true, checked: true,width:100 ,temp:true},
  { key: "payeeType",label: "收款方式",tooltip: true, checked: true,width:120 ,temp:true},
  { key: "payeeBankName",label: "收款银行",tooltip: true, checked: true},
  { key: "cashFlowCode",label: "现金流编码",tooltip: true, checked: true},
  { key: "currencyRateRmb",label: "汇率（人民币）",tooltip: true, checked: true,width:120,temp:true},
  { key: "bizPersonName",label: "业务员",tooltip: true, checked: true},
  { key: "postDate",label: "过账日期",tooltip: true, checked: true,temp:true},
  { key: "unDate",label: "冲销日期",tooltip: true, checked: true,temp:true},
  { key: "warrantCode",label: "凭证号",tooltip: true, checked: true},
  { key: "warrantMonth",label: "期间",tooltip: true, checked: true},
  { key: "writeoffWarrantCode",label: "冲销凭证号",tooltip: true, checked: true},
  { key: "writeoffWarrantMonth",label: "冲销期间",tooltip: true, checked: true},
  { key: "createdName",label: "创建人",tooltip: true, checked: true},
  { key: "createdTime",label: "创建时间",tooltip: true, checked: true,width:140,temp:true},
]; //所有表头
export default {
  name: "creditNotes",
  mixins: [selectedRow, getFilter, setFilter, exportData],
  components: {
    headSearch,
    writeOffReasonSelect,
    accountingDateSelect,
    editSearchItem,
    postPopup,
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
      loading: false,
      writeOffShow: false, //冲销窗口
      postPopupShow: false, //过账弹窗
      payeeCategoryObj,
      typeObj,
      statusObj,
      payeeTypeObj,
      crashContentObj,
      tableData: [],
      searchOptions: {},
      writeOff: {
        date: "",
        region: "",
      },
      rules: {
        date: [{ required: true, message: "时间不能为空" }],
        region: [{ required: true, message: "原因不能为空" }],
      },
      sumTol: {},
    };
  },
  created() {
    this.getFilter();
  },
  methods: {
    //计息调整
    changeIsInterest(){
      if (this.selectionedArray.length === 1) {
        let isInterest=this.selectionedArray[0].isInterest==1?"否":"是";//取相反的值
        this.$confirm("确认更新是否计息为："+isInterest+"?", "提示信息", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          turnFiGatheringInterest(this.selectionedArray[0]).then(res=>{
            if(res.code=="success"){
              this.$openSuccess(res.message);
              this.queryData();
            }else{
              this.$openWarning(res.message);
            }
          }).catch();
        }).catch();
      } else {
        this.$openWarning("请选择一条进行操作");
      }
    },
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
    exportTable() {
      let data = {
        pageNum: this.page.pageNum,
        rows: this.page.pageSize,
        ...this.searchOptions,
      };
      if (
        Number(data.payAmtTotalStart) >= Number(data.payAmtTotalEnd) &&
        data.payAmtTotalStart !== "" &&
        data.payAmtTotalEnd !== ""
      ) {
        this.$openWarning("请填写正确的起始金额");
        return;
      }
      const fixHead = JSON.parse(JSON.stringify(this.fixHead));
      fixHead.splice(0, 2);
      const exportFieldList = [];
      fixHead.concat(this.headerList).forEach((item) => {
        if (item.checked) {
          const { key, label, otherKey } = item;
          exportFieldList.push({ key: otherKey ? otherKey : key, label })

        }
      });
      this.exportData({ ...data, exportFieldList });
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
      if (
        column.property == "payeeAmtOrigin" ||
        column.property == "payeeAmtBase" ||
        column.property == "currencyRateRmb"
      ) {
        return "rightTd";
      } else {
        return "";
      }
    },
    //导出
    exportExcel() {
      this.$confirm(
        "为避免导出数据过多影响其它业务功能，请尽量利用查询条件筛选有效数据后再导出！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$refs.headSearch.postData();
          let data = {
            pageNum: this.page.pageNum,
            rows: this.page.pageSize,
            ...this.searchOptions,
          };
          exportFiGatheringList(data)
            .then((res) => {
              const blob = new Blob([res.data]);
              const a = document.createElement("a");
              const url = window.URL.createObjectURL(blob);
              const filename = "收款单.xls";
              a.href = url;
              a.download = filename;
              a.click();
              window.URL.revokeObjectURL(url);
            })
            .catch();
        })
        .catch();
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
      this.getSum();
    },
    queryData() {
      let params = {
        pageNum: this.page.pageNum,
        rows: this.page.pageSize,
        ...this.searchOptions,
      };
      this.loading = true;
      getCreditList(params).then((res) => {
        if (res.code === "success") {
          this.tableData = res.data;
          this.page.total = res.total;
          this.loading = false;
        }
      });
    },
    //获取总计
    getSum() {
      let params = {
        pageNum: this.page.pageNum,
        rows: this.page.pageSize,
        ...this.searchOptions,
      };
      selectFiGatheringSum(params)
        .then((res) => {
          this.sumTol = res.data;
        })
        .catch();
    },
    //总计
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
          ["payeeAmtOrigin", "payeeAmtBase"].findIndex((it) => it == key) !== -1
        ) {
          sums[index] =this.sumTol? this.$sumTolFormat(this.sumTol[key]):'';
        } else {
          sums[index] = "";
        }
      });
      this.$nextTick(() => {
        this.$refs.multipleTable.doLayout();
      });
      return sums;
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
    addCredit() {
      this.$router.push({
        name: "creditDetail",
        params: { id: "0", editFlag: 1, type: 1 },
      });
    },
    setCredit(type) {
      //type 1 修改 0 删除 2查看 3过账 4冲销 5部门认领
      let forbirdTipsObj = {
        1: "当前状态不允许修改",
        0: "当前状态不允许删除",
        3: "当前状态不允许过账",
        4: "当前状态不允许冲销",
        5: "当前状态不允许部门认领",
      };
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择收款单", type: "warning" });
        return;
      } else if (this.selectionedArray.length > 1) {
        this.$message({ message: "最多选择一条单据", type: "warning" });
        return;
      } else {
        this.selectioned = this.selectionedArray[0];
      }
      switch (type) {
        case 1:
          //针对“收款”状态的收款单可点击修改进行修改。
          if (this.statusObj[this.selectioned.payeeStatus] != "收款") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "creditDetail",
            params: {
              id: this.selectioned.gatheringId,
              editFlag: 1,
              type: 1,
            },
          });
          break;
        case 2:
          //任何状态都能查询
          this.$router.push({
            name: "creditDetail",
            params: {
              id: this.selectioned.gatheringId,
              editFlag: 0,
              type: 2,
            },
          });
          break;
        case 3:
          //完全认领的收款单可做过账，收款单状态更新为“收款过账”，推送凭证，并产生重认领的明细信息。
          if (
            this.statusObj[this.selectioned.payeeStatus] != "完全认领"
            // this.selectioned.isConfirmed != 0
          ) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.postPopupShow = true;
          break;
        case 4:
          //收款过账的收款单可进行冲销，更新收款单状态为“收款冲销”，并推送负向凭证。
          if (this.statusObj[this.selectioned.payeeStatus] != "收款过账") {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.writeOff.date = this.selectioned.postDate; //设置默认冲销日期
          this.writeOff.region = 10780005; //设置默认冲销原因
          this.writeOffShow = true;
          break;
        case 5:
          //针对“收款”，“部分认领”，“完全认领”状态下的收款单，业务人员可通过部门认领进行认领信息维护
          let flag =
            ["收款", "部分认领", "完全认领"].findIndex(
              (item) => item == statusObj[this.selectioned.payeeStatus]
            ) != -1
              ? false
              : true;
          if (flag) {
            this.$message({ message: forbirdTipsObj[type], type: "warning" });
            return;
          }
          this.$router.push({
            name: "creditDetail",
            params: {
              id: this.selectioned.gatheringId,
              editFlag: 0,
              type: 5,
            },
          });
          break;
        default:
          break;
      }
    },
    submitWriteOff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //api post
          writeOffCredit([
            {
              gatheringId: this.selectioned.gatheringId,
              payeeStatus: this.selectioned.payeeStatus,
              version: this.selectioned.version,
              unReason: this.writeOff.region,
              unDate: this.writeOff.date,
            },
          ]).then((res) => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.writeOffShow = false;
              this.queryData();
              this.getSum();
            }
          });
        } else {
          return false;
        }
      });
    },
    postPopupCancel() {
      this.postPopupShow = false;
    },
    postPopupSure(e) {
      this.postPopupShow = false;
      postCredit([
        {
          gatheringId: this.selectioned.gatheringId,
          payeeStatus: this.selectioned.payeeStatus,
          postDate: e.date,
          version: this.selectioned.version,
        },
      ]).then((res) => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.queryData();
          this.getSum();
        }
      });
    },
    //批量过账
    batchPosting() {
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择收款单", type: "warning" });
        return;
      }
      if (
        !this.selectionedArray.every(
          (item) => this.statusObj[item.payeeStatus] === "完全认领"
        )
      ) {
        this.$message({
          message: "只有完全认领状态的单据可过账,请重新选择",
          type: "warning",
        });
        return;
      }
      this.$confirm(
        "批量过账时过账时间以收款单中收款日期为准，请事先确认，谨慎操作！",
        "过账提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          postingFiGatheringBatch(this.selectionedArray).then((res) => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.queryData();
              this.getSum();
            }
          });
        })
        .catch(() => {});
    },
    delCredit() {
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择收款单", type: "warning" });
        return;
      }
      if (
        !this.selectionedArray.every(
          (item) => this.statusObj[item.payeeStatus] === "收款"
        )
      ) {
        this.$message({
          message: "只有收款状态的单据可删除,请重新选择",
          type: "warning",
        });
        return;
      }
      this.$confirm("是否确定删除该收款?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delCredit(this.selectionedArray).then((res) => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.queryData();
              this.getSum();
            }
          });
        })
        .catch(() => {});
    },
    selectedRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
  },
  watch: {
    writeOffShow: {
      handler(val) {
        if (val === false) {
          this.$refs["writeOffForm"].resetFields();
        }
      },
    },
    // '$route'(){
    //   this.getData();
    // },
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
.creditNotes {
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
